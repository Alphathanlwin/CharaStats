import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Swords,
  Play,
  RotateCcw,
  Trophy,
  Zap,
  Shield,
  Brain,
  HeartPulse,
  Flame,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { Character, BattleResult } from '../types';
import { FighterCard } from './FighterCard';
import { soundManager } from '../utils/soundEffects';

interface BattleArenaProps {
  p1: Character;
  p2: Character;
  result: BattleResult;
  onChangeP1: () => void;
  onChangeP2: () => void;
  onRandomP1: () => void;
  onRandomP2: () => void;
  onSwapFighters: () => void;
}

export function BattleArena({
  p1,
  p2,
  result,
  onChangeP1,
  onChangeP2,
  onRandomP1,
  onRandomP2,
  onSwapFighters,
}: BattleArenaProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeRoundIndex, setActiveRoundIndex] = useState<number>(-1); // -1: not started, 0-5: rounds, 6: finished
  const [simulationSpeed, setSimulationSpeed] = useState<'normal' | 'fast'>('normal');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // When p1 or p2 changes, reset simulation state to ready
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSimulating(false);
    setActiveRoundIndex(-1);
  }, [p1.id, p2.id]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb923c', '#fbbf24', '#38bdf8', '#a855f7'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const startSimulation = () => {
    soundManager.playEnergy();
    setIsSimulating(true);
    setActiveRoundIndex(0);

    const delay = simulationSpeed === 'normal' ? 2200 : 1200;

    let current = 0;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      current++;
      if (current < result.rounds.length) {
        soundManager.playClash();
        setActiveRoundIndex(current);
      } else {
        // Battle finished!
        if (timerRef.current) clearInterval(timerRef.current);
        setActiveRoundIndex(result.rounds.length);
        setIsSimulating(false);
        soundManager.playVictory();
        triggerConfetti();
      }
    }, delay);
  };

  const instantResolve = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSimulating(false);
    setActiveRoundIndex(result.rounds.length);
    soundManager.playVictory();
    triggerConfetti();
  };

  const resetBattle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSimulating(false);
    setActiveRoundIndex(-1);
    soundManager.playSelect();
  };

  const statIcons: Record<string, typeof Swords> = {
    power: Swords,
    agility: Zap,
    battleIq: Brain,
    durability: Shield,
    endurance: HeartPulse,
    specialAbility: Flame,
  };

  const isBattleFinished = activeRoundIndex >= result.rounds.length;

  return (
    <div className="space-y-6">
      {/* Fighters Versus Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        {/* Player 1 Card */}
        <div className="lg:col-span-5">
          <FighterCard
            player="p1"
            character={p1}
            onChangeClick={onChangeP1}
            onRandomClick={onRandomP1}
            isWinner={isBattleFinished && result.overallWinner === 'p1'}
          />
        </div>

        {/* Versus Hub & Controls */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 px-2 space-y-4">
          <button
            id="swap-fighters-btn"
            onClick={() => {
              soundManager.playSelect();
              onSwapFighters();
            }}
            title="Swap Player 1 & Player 2"
            className="p-2.5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500 transition-all hover:scale-110 shadow-lg"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-xl shadow-rose-600/30 border-2 border-slate-900 animate-pulse">
              <span className="font-combat text-3xl font-black tracking-widest text-slate-950">
                VS
              </span>
            </div>
          </div>

          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
              Round Format
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block">
              Best of 6 Stats
            </span>
          </div>

          {/* Action Trigger Buttons */}
          <div className="w-full space-y-2 pt-2">
            {!isSimulating && !isBattleFinished && (
              <>
                <button
                  id="start-simulation-btn"
                  onClick={startSimulation}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500 hover:from-rose-500 hover:via-orange-500 hover:to-amber-400 text-white font-combat text-2xl tracking-wider font-bold shadow-lg shadow-rose-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>SIMULATE!</span>
                </button>

                <button
                  id="instant-result-btn"
                  onClick={instantResolve}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors"
                >
                  Instant Result
                </button>
              </>
            )}

            {isSimulating && (
              <div className="space-y-2 text-center">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono animate-pulse">
                  Clashing Round {activeRoundIndex + 1} of 6...
                </div>
                <button
                  onClick={instantResolve}
                  className="text-xs text-slate-400 hover:text-slate-200 underline"
                >
                  Skip Animation
                </button>
              </div>
            )}

            {isBattleFinished && (
              <button
                id="reset-battle-btn"
                onClick={resetBattle}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Simulate Again</span>
              </button>
            )}
          </div>
        </div>

        {/* Player 2 Card */}
        <div className="lg:col-span-5">
          <FighterCard
            player="p2"
            character={p2}
            onChangeClick={onChangeP2}
            onRandomClick={onRandomP2}
            isWinner={isBattleFinished && result.overallWinner === 'p2'}
          />
        </div>
      </div>

      {/* VICTORY BANNER (When Battle Concludes) */}
      {isBattleFinished && (
        <div
          id="battle-verdict-banner"
          className="relative rounded-2xl overflow-hidden border p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border-amber-400/60 shadow-2xl shadow-amber-500/10"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Trophy className="w-48 h-48 text-amber-400" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/40">
                    <Trophy className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                    Battle Determination
                  </span>
                </div>

                <h2 className="font-combat text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 tracking-wide">
                  {result.verdictTitle}
                </h2>
              </div>

              {/* Score Box */}
              <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 shrink-0">
                <div className="text-center px-2">
                  <span className="text-[10px] font-mono text-slate-400 block truncate max-w-[80px]">
                    {p1.name.split(' ')[0]}
                  </span>
                  <span className="text-2xl font-combat font-bold text-rose-400">
                    {result.p1RoundsWon}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    ({result.p1TotalScore} pts)
                  </span>
                </div>

                <span className="text-xl font-bold text-slate-600">:</span>

                <div className="text-center px-2">
                  <span className="text-[10px] font-mono text-slate-400 block truncate max-w-[80px]">
                    {p2.name.split(' ')[0]}
                  </span>
                  <span className="text-2xl font-combat font-bold text-amber-400">
                    {result.p2RoundsWon}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    ({result.p2TotalScore} pts)
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
              <div className="md:col-span-2 space-y-2">
                <p className="text-slate-300 leading-relaxed text-sm">
                  {result.verdictSummary}
                </p>
                <div className="flex items-center gap-2 text-amber-300 pt-1">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Decisive Factor:</strong> {result.decisiveFactor}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 flex flex-col justify-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Post-Match Stats
                </span>
                <div className="flex justify-between text-slate-300">
                  <span>Rounds Won by P1:</span>
                  <strong className="text-rose-400">{result.p1RoundsWon} / 6</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Rounds Won by P2:</span>
                  <strong className="text-amber-400">{result.p2RoundsWon} / 6</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Draws / Ties:</span>
                  <strong className="text-slate-400">{result.ties}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROUND-BY-ROUND CLASH LOG (Interactive Simulation Sequence) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold font-combat text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              Round-by-Round Combat Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Direct head-to-head comparison of all 6 hardcoded character attributes
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Speed:</span>
            <button
              onClick={() => setSimulationSpeed('normal')}
              className={`px-2 py-0.5 text-xs rounded ${
                simulationSpeed === 'normal'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 bg-slate-800'
              }`}
            >
              1x
            </button>
            <button
              onClick={() => setSimulationSpeed('fast')}
              className={`px-2 py-0.5 text-xs rounded ${
                simulationSpeed === 'fast'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 bg-slate-800'
              }`}
            >
              2x
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {result.rounds.map((round, idx) => {
            const Icon = statIcons[round.statKey] || Swords;
            const isRevealed = activeRoundIndex >= idx || activeRoundIndex === -1;
            const isCurrentlyClashing = isSimulating && activeRoundIndex === idx;

            const p1Won = round.winner === 'p1';
            const p2Won = round.winner === 'p2';
            const isTie = round.winner === 'tie';

            return (
              <div
                key={round.statKey}
                id={`round-row-${round.statKey}`}
                className={`rounded-xl border p-3.5 transition-all duration-300 ${
                  isCurrentlyClashing
                    ? 'bg-rose-500/15 border-rose-500 shadow-lg shadow-rose-500/10 scale-[1.01]'
                    : isRevealed
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-slate-950/40 border-slate-800/40 opacity-40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Round info */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-700">
                      R{round.roundNumber}
                    </span>
                    <div className="flex items-center gap-1.5 font-semibold text-sm text-white">
                      <Icon className="w-4 h-4 text-rose-400" />
                      <span>{round.statName}</span>
                    </div>
                  </div>

                  {/* Stat score comparison numbers */}
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className={`flex items-center gap-1.5 ${p1Won ? 'font-bold text-rose-400' : 'text-slate-400'}`}>
                      <span>{p1.name.split(' ')[0]}:</span>
                      <span className="text-sm">{round.p1Value}</span>
                      {p1Won && <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />}
                    </div>

                    <span className="text-slate-600">vs</span>

                    <div className={`flex items-center gap-1.5 ${p2Won ? 'font-bold text-amber-400' : 'text-slate-400'}`}>
                      <span>{p2.name.split(' ')[0]}:</span>
                      <span className="text-sm">{round.p2Value}</span>
                      {p2Won && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </div>

                    {/* Result pill */}
                    <div className="ml-2">
                      {isTie ? (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-semibold border border-slate-700">
                          TIE
                        </span>
                      ) : p1Won ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/40">
                          +{(round.p1Value - round.p2Value)} P1 WIN
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                          +{(round.p2Value - round.p1Value)} P2 WIN
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Clash Narrative Log */}
                {isRevealed && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-xs text-slate-300 leading-relaxed">
                    <p className="font-medium text-slate-200">{round.narration}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-[11px] text-slate-400">
                      <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/40">
                        <strong className="text-rose-400">{p1.name}:</strong> {round.p1Action}
                      </div>
                      <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/40">
                        <strong className="text-amber-400">{p2.name}:</strong> {round.p2Action}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
