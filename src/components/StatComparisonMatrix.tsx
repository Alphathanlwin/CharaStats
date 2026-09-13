import { Swords, Zap, Brain, Shield, HeartPulse, Flame, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { BattleResult, Character } from '../types';
import { CharacterAvatar } from './CharacterAvatar';

interface StatComparisonMatrixProps {
  p1: Character;
  p2: Character;
  result: BattleResult;
}

export function StatComparisonMatrix({ p1, p2, result }: StatComparisonMatrixProps) {
  const statIcons: Record<string, typeof Swords> = {
    power: Swords,
    agility: Zap,
    battleIq: Brain,
    durability: Shield,
    endurance: HeartPulse,
    specialAbility: Flame,
  };

  return (
    <div className="space-y-6">
      {/* Head to Head Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CharacterAvatar character={p1} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Player 1</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">{p1.anime}</span>
            </div>
            <h3 className="text-xl font-bold font-combat text-white">{p1.name}</h3>
            <span className="text-xs font-mono text-slate-400">
              Total Score: <strong className="text-rose-400">{result.p1TotalScore}</strong>
            </span>
          </div>
        </div>

        <div className="text-center px-4 py-2 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Stat Differential
          </span>
          <span className="text-xl font-combat font-bold text-amber-300">
            {result.overallWinner === 'p1'
              ? `${p1.name.split(' ')[0]} +${result.p1TotalScore - result.p2TotalScore} pts`
              : result.overallWinner === 'p2'
              ? `${p2.name.split(' ')[0]} +${result.p2TotalScore - result.p1TotalScore} pts`
              : 'Deadlock 0 pts'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-slate-400">{p2.anime}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Player 2</span>
            </div>
            <h3 className="text-xl font-bold font-combat text-white">{p2.name}</h3>
            <span className="text-xs font-mono text-slate-400">
              Total Score: <strong className="text-amber-400">{result.p2TotalScore}</strong>
            </span>
          </div>
          <CharacterAvatar character={p2} size="md" />
        </div>
      </div>

      {/* Visual Stat Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.comparisons.map((item) => {
          const Icon = statIcons[item.key] || Swords;
          const p1Pct = item.p1Value;
          const p2Pct = item.p2Value;

          return (
            <div
              key={item.key}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-rose-400 border border-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.label}</h4>
                    <p className="text-[11px] text-slate-400">{item.description}</p>
                  </div>
                </div>

                {/* Winner Pill */}
                <div>
                  {item.winner === 'p1' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      <ArrowUpRight className="w-3 h-3" /> P1 (+{item.diff})
                    </span>
                  )}
                  {item.winner === 'p2' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <ArrowDownRight className="w-3 h-3" /> P2 (+{item.diff})
                    </span>
                  )}
                  {item.winner === 'tie' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      <Minus className="w-3 h-3" /> Even
                    </span>
                  )}
                </div>
              </div>

              {/* Head-to-Head Comparative Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-semibold">
                  <span className="text-rose-400">
                    {p1.name.split(' ')[0]}: {item.p1Value}
                  </span>
                  <span className="text-amber-400">
                    {p2.name.split(' ')[0]}: {item.p2Value}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1 h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  {/* P1 bar (fills from right to left) */}
                  <div className="w-full bg-slate-900 rounded-l-full overflow-hidden flex justify-end">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-l-full"
                      style={{ width: `${p1Pct}%` }}
                    />
                  </div>
                  {/* P2 bar (fills from left to right) */}
                  <div className="w-full bg-slate-900 rounded-r-full overflow-hidden flex justify-start">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-r-full"
                      style={{ width: `${p2Pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Commentary */}
              <p className="text-xs text-slate-300 italic bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                "{item.commentary}"
              </p>
            </div>
          );
        })}
      </div>

      {/* Analytical Combat Style Comparison */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
        <h4 className="font-combat text-xl font-bold text-white flex items-center gap-2">
          <Swords className="w-4 h-4 text-amber-400" />
          Tactical Archetype Analysis
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 text-sm">{p1.name} Combat Archetype</span>
              <span className="font-mono text-[11px] text-slate-400">{p1.tier}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{p1.bio}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {p1.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 text-[10px] border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">{p2.name} Combat Archetype</span>
              <span className="font-mono text-[11px] text-slate-400">{p2.tier}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{p2.bio}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {p2.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 text-[10px] border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
