import { Swords, Shuffle, Zap, Brain, Shield, HeartPulse, Sparkles, RefreshCw, Quote } from 'lucide-react';
import { Character } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager } from '../utils/soundEffects';

interface FighterCardProps {
  player: 'p1' | 'p2';
  character: Character;
  onChangeClick: () => void;
  onRandomClick: () => void;
  isWinner?: boolean;
}

export function FighterCard({
  player,
  character,
  onChangeClick,
  onRandomClick,
  isWinner,
}: FighterCardProps) {
  const isP1 = player === 'p1';
  const label = isP1 ? 'PLAYER 1 (YOU)' : 'PLAYER 2 (OPPONENT)';
  const labelColor = isP1 ? 'text-rose-400 bg-rose-500/10 border-rose-500/30' : 'text-amber-400 bg-amber-500/10 border-amber-500/30';

  const statsList = [
    { label: 'Power', value: character.stats.power, icon: Swords, color: 'text-red-400', barBg: 'bg-red-500' },
    { label: 'Agility', value: character.stats.agility, icon: Zap, color: 'text-amber-400', barBg: 'bg-amber-500' },
    { label: 'Battle IQ', value: character.stats.battleIq, icon: Brain, color: 'text-emerald-400', barBg: 'bg-emerald-500' },
    { label: 'Durability', value: character.stats.durability, icon: Shield, color: 'text-blue-400', barBg: 'bg-blue-500' },
    { label: 'Endurance', value: character.stats.endurance, icon: HeartPulse, color: 'text-rose-400', barBg: 'bg-rose-500' },
    { label: 'Special Ability', value: character.stats.specialAbility, icon: Sparkles, color: 'text-purple-400', barBg: 'bg-purple-500' },
  ];

  const totalScore = Object.values(character.stats).reduce((a, b) => a + b, 0);

  return (
    <div
      id={`fighter-card-${player}`}
      className={`relative rounded-2xl border p-4 sm:p-5 transition-all flex flex-col justify-between ${
        isWinner
          ? 'bg-slate-900/95 border-amber-400/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700/80'
      }`}
    >
      {/* Top Banner */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${labelColor}`}>
            {label}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              id={`randomize-btn-${player}`}
              onClick={() => {
                soundManager.playSelect();
                onRandomClick();
              }}
              title="Pick random fighter"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
            <button
              id={`change-fighter-btn-${player}`}
              onClick={() => {
                soundManager.playSelect();
                onChangeClick();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1 border border-slate-700"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Change</span>
            </button>
          </div>
        </div>

        {/* Character Visual Profile */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <CharacterAvatar character={character} size="xl" showGlow={isWinner} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-mono">
                {character.tier} Tier
              </span>
              <span className="text-xs font-mono text-slate-400">
                Combat Index: <strong className="text-white">{totalScore}</strong>
              </span>
            </div>

            <h3 className="font-combat text-3xl sm:text-4xl font-bold text-white tracking-wide mt-1 leading-none">
              {character.name}
            </h3>

            <p className="text-sm font-medium text-rose-400/90 mt-0.5">{character.anime}</p>

            {/* Signature Move */}
            <div className="mt-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-mono tracking-wider">
                Signature Technique
              </span>
              <span className="font-semibold text-amber-200 truncate block">
                {character.signatureMove}
              </span>
            </div>
          </div>
        </div>

        {/* Character Quote */}
        <div className="mt-3 text-xs italic text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50 flex items-start gap-2">
          <Quote className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
          <p className="line-clamp-2">"{character.quote}"</p>
        </div>
      </div>

      {/* 6 Hardcoded Stats Progress Bars */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
          <span>Combat Attributes</span>
          <span className="text-[10px] font-mono text-slate-500">Max 100</span>
        </div>

        {statsList.map((st) => {
          const Icon = st.icon;
          return (
            <div key={st.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Icon className={`w-3.5 h-3.5 ${st.color}`} />
                  {st.label}
                </span>
                <span className="font-mono font-bold text-white">{st.value}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                <div
                  className={`h-full ${st.barBg} transition-all duration-700 rounded-full`}
                  style={{ width: `${st.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
