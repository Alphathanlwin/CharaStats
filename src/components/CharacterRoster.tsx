import { useState, useMemo } from 'react';
import { Search, Filter, Swords, Zap, Brain, Shield, HeartPulse, Flame, UserCheck, Check, Sparkles } from 'lucide-react';
import { Character, StatKey } from '../types';
import { ANIME_CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager } from '../utils/soundEffects';

interface CharacterRosterProps {
  currentP1: Character;
  currentP2: Character;
  onSelectP1: (char: Character) => void;
  onSelectP2: (char: Character) => void;
  pixelMode?: boolean;
}

export function CharacterRoster({
  currentP1,
  currentP2,
  onSelectP1,
  onSelectP2,
  pixelMode = false,
}: CharacterRosterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'overall' | 'name' | StatKey>('overall');

  const tiers = ['All', 'God', 'Cosmic', 'Supreme', 'Special Grade', 'Elite', 'Superhuman'];

  const filteredCharacters = useMemo(() => {
    return ANIME_CHARACTERS.filter((char) => {
      const matchSearch =
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.anime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.signatureMove.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTier = tierFilter === 'All' || char.tier === tierFilter;
      return matchSearch && matchTier;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'overall') {
        const sumA = (Object.values(a.stats) as number[]).reduce((x, y) => x + y, 0);
        const sumB = (Object.values(b.stats) as number[]).reduce((x, y) => x + y, 0);
        return sumB - sumA;
      }
      return b.stats[sortBy] - a.stats[sortBy];
    });
  }, [searchQuery, tierFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Roster Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-combat text-3xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            Anime Combatant Roster ({ANIME_CHARACTERS.length} Legendary Heroes)
          </h3>
          <p className="text-xs text-slate-400">
            Browse main protagonists across 35 anime universes with verified hardcoded combat attributes.
          </p>
        </div>

        {/* Current Selections preview */}
        <div className="flex items-center gap-3 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">P1:</span>
            <span className="font-semibold text-white truncate max-w-[90px]">{currentP1.name}</span>
          </div>
          <span className="text-slate-600">vs</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">P2:</span>
            <span className="font-semibold text-white truncate max-w-[90px]">{currentP2.name}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 35 anime series and characters..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-500" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value="overall">Combat Power Index (Highest Total)</option>
              <option value="power">Highest Power</option>
              <option value="agility">Highest Agility</option>
              <option value="battleIq">Highest Battle IQ</option>
              <option value="durability">Highest Durability</option>
              <option value="endurance">Highest Endurance</option>
              <option value="specialAbility">Highest Special Ability</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Tier filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] text-slate-500 uppercase font-semibold mr-1 shrink-0">
            Tier:
          </span>
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
                tierFilter === tier
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/40'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((char) => {
          const isP1 = char.id === currentP1.id;
          const isP2 = char.id === currentP2.id;
          const totalPower = (Object.values(char.stats) as number[]).reduce((a, b) => a + b, 0);

          return (
            <div
              key={char.id}
              className={`rounded-2xl border p-4 transition-all duration-300 flex flex-col justify-between ${
                isP1
                  ? 'bg-rose-950/20 border-rose-500/70 shadow-lg shadow-rose-950/20'
                  : isP2
                  ? 'bg-amber-950/20 border-amber-500/70 shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start gap-3">
                  <CharacterAvatar character={char} size="lg" pixelMode={pixelMode} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-white text-base truncate">{char.name}</h4>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 shrink-0">
                        {char.tier}
                      </span>
                    </div>

                    <p className="text-xs text-rose-400 font-medium truncate mt-0.5">
                      {char.anime}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span>Index:</span>
                      <span className="font-bold text-amber-300">{totalPower} pts</span>
                    </div>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed bg-slate-950/40 p-2 rounded-xl border border-slate-800/60">
                  {char.bio}
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="bg-slate-950/60 p-1.5 rounded-lg text-center border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Power</span>
                    <strong className="text-red-400 font-mono">{char.stats.power}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded-lg text-center border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Agility</span>
                    <strong className="text-amber-400 font-mono">{char.stats.agility}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded-lg text-center border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Battle IQ</span>
                    <strong className="text-emerald-400 font-mono">{char.stats.battleIq}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded-lg text-center border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Durability</span>
                    <strong className="text-blue-400 font-mono">{char.stats.durability}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded-lg text-center border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Endurance</span>
                    <strong className="text-rose-400 font-mono">{char.stats.endurance}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded-lg text-center border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Special</span>
                    <strong className="text-purple-400 font-mono">{char.stats.specialAbility}</strong>
                  </div>
                </div>
              </div>

              {/* Selection Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => {
                    soundManager.playSelect();
                    onSelectP1(char);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    isP1
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {isP1 ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{isP1 ? 'P1 Active' : 'Set as P1'}</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playSelect();
                    onSelectP2(char);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    isP2
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {isP2 ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{isP2 ? 'P2 Active' : 'Set as Opponent'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
