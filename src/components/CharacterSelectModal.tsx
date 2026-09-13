import { useState, useMemo } from 'react';
import { Search, X, Flame, Swords, Zap, Brain, Shield, HeartPulse, Sparkles, Filter } from 'lucide-react';
import { Character, StatKey } from '../types';
import { ANIME_CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager } from '../utils/soundEffects';

interface CharacterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (character: Character) => void;
  title: string;
  selectedCharacterId: string;
  opponentCharacterId: string;
  pixelMode?: boolean;
}

export function CharacterSelectModal({
  isOpen,
  onClose,
  onSelect,
  title,
  selectedCharacterId,
  opponentCharacterId,
  pixelMode = false,
}: CharacterSelectModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'overall' | StatKey>('overall');

  const tiers = ['All', 'God', 'Cosmic', 'Supreme', 'Special Grade', 'Elite', 'Superhuman'];

  const filteredCharacters = useMemo(() => {
    return ANIME_CHARACTERS.filter((char) => {
      const matchesSearch =
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.anime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.signatureMove.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTier = selectedTier === 'All' || char.tier === selectedTier;

      return matchesSearch && matchesTier;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'overall') {
        const totalA = (Object.values(a.stats) as number[]).reduce((acc, val) => acc + val, 0);
        const totalB = (Object.values(b.stats) as number[]).reduce((acc, val) => acc + val, 0);
        return totalB - totalA;
      }
      return b.stats[sortBy] - a.stats[sortBy];
    });
  }, [searchQuery, selectedTier, sortBy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-rose-950/20 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-combat text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-rose-500" />
              {title}
            </h3>
            <p className="text-xs text-slate-400">
              Select an anime protagonist from {ANIME_CHARACTERS.length} available legends
            </p>
          </div>
          <button
            id="modal-close-button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-950/40 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="character-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by hero name, anime series, or move..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-slate-500" /> Sort:
              </span>
              <select
                id="character-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="overall">Highest Overall Power</option>
                <option value="power">Highest Raw Power</option>
                <option value="agility">Highest Agility / Speed</option>
                <option value="battleIq">Highest Battle IQ</option>
                <option value="durability">Highest Durability</option>
                <option value="endurance">Highest Endurance</option>
                <option value="specialAbility">Highest Special Ability</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Tier Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mr-1 shrink-0">
              Tier:
            </span>
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
                  selectedTier === tier
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/40'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Character Grid */}
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCharacters.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              <p className="text-base font-semibold">No fighters found</p>
              <p className="text-xs mt-1">Try a different search query or tier filter</p>
            </div>
          ) : (
            filteredCharacters.map((char) => {
              const isCurrent = char.id === selectedCharacterId;
              const isOpponent = char.id === opponentCharacterId;
              const totalStat = (Object.values(char.stats) as number[]).reduce((acc, val) => acc + val, 0);

              return (
                <div
                  key={char.id}
                  id={`select-card-${char.id}`}
                  onClick={() => {
                    soundManager.playSelect();
                    onSelect(char);
                    onClose();
                  }}
                  className={`group relative p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-rose-500/15 border-rose-500 shadow-md shadow-rose-500/10'
                      : isOpponent
                      ? 'bg-amber-500/10 border-amber-500/60 opacity-90'
                      : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CharacterAvatar character={char} size="md" pixelMode={pixelMode} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-white truncate group-hover:text-rose-400 transition-colors">
                          {char.name}
                        </h4>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 shrink-0 border border-slate-700">
                          {char.tier}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 truncate mt-0.5">{char.anime}</p>

                      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-300">
                        <span className="text-rose-400 font-semibold flex items-center gap-0.5">
                          <Swords className="w-3 h-3" /> {char.stats.power}
                        </span>
                        <span className="text-cyan-400 font-semibold flex items-center gap-0.5">
                          <Zap className="w-3 h-3" /> {char.stats.agility}
                        </span>
                        <span className="text-purple-400 font-semibold flex items-center gap-0.5">
                          <Sparkles className="w-3 h-3" /> {char.stats.specialAbility}
                        </span>
                        <span className="ml-auto text-slate-400 font-mono text-[10px]">
                          Tot: <strong className="text-amber-400">{totalStat}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate max-w-[170px] italic">
                      {char.signatureMove}
                    </span>
                    {isCurrent ? (
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                        Selected
                      </span>
                    ) : isOpponent ? (
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        Opponent
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 group-hover:text-rose-300 transition-colors">
                        Select →
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredCharacters.length} fighters</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
