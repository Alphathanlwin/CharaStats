import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Swords,
  Flame,
  Zap,
  Shield,
  Brain,
  HeartPulse
} from 'lucide-react';
import { Character, BattleResult, BattleRound } from '../types';
import { PixelFighter, FighterAnimState } from './PixelFighter';
import { PIXEL_SPRITES } from '../data/pixelSprites';
import { soundManager } from '../utils/soundEffects';

interface FightAnimationStageProps {
  p1: Character;
  p2: Character;
  result: BattleResult;
  activeRoundIndex: number;
  isSimulating: boolean;
  onRoundChange?: (roundIdx: number) => void;
  onBattleFinish?: () => void;
}

export function FightAnimationStage({
  p1,
  p2,
  result,
  activeRoundIndex,
  isSimulating,
  onRoundChange,
  onBattleFinish,
}: FightAnimationStageProps) {
  // Arena stage theme
  const [stageTheme, setStageTheme] = useState<'tenkaichi' | 'cosmic' | 'shinjuku' | 'volcano'>('tenkaichi');
  
  // Animation states for both fighters
  const [p1State, setP1State] = useState<FighterAnimState>('idle');
  const [p2State, setP2State] = useState<FighterAnimState>('idle');
  
  // Visual effects states
  const [clashEffect, setClashEffect] = useState<{
    active: boolean;
    type: string;
    winner: 'p1' | 'p2' | 'tie';
    label: string;
  } | null>(null);

  const [screenShake, setScreenShake] = useState(false);
  const [showKO, setShowKO] = useState(false);
  const [damagePopup, setDamagePopup] = useState<{
    target: 'p1' | 'p2';
    text: string;
    color: string;
  } | null>(null);

  // Playback control
  const [internalRound, setInternalRound] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animSpeed, setAnimSpeed] = useState<number>(1);
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentRound: BattleRound | undefined = result.rounds[internalRound] || result.rounds[0];
  const p1Sprite = PIXEL_SPRITES[p1.id];
  const p2Sprite = PIXEL_SPRITES[p2.id];

  // Calculate Health percentage based on rounds won
  const maxRounds = result.rounds.length;
  // Calculate rounds lost up to current step
  const getFighterHealth = (player: 'p1' | 'p2') => {
    let damage = 0;
    const limit = Math.min(internalRound, maxRounds);
    for (let i = 0; i < limit; i++) {
      const r = result.rounds[i];
      if (player === 'p1' && r.winner === 'p2') damage += 18;
      if (player === 'p2' && r.winner === 'p1') damage += 18;
    }
    // If overall battle is finished, make the loser drop low
    if (internalRound >= maxRounds) {
      if (result.overallWinner === 'p1' && player === 'p2') return 0;
      if (result.overallWinner === 'p2' && player === 'p1') return 0;
    }
    return Math.max(10, 100 - damage);
  };

  const p1Health = getFighterHealth('p1');
  const p2Health = getFighterHealth('p2');

  // Synchronize when parent triggers simulation
  useEffect(() => {
    if (activeRoundIndex >= 0 && activeRoundIndex < maxRounds) {
      setInternalRound(activeRoundIndex);
      executeRoundAnimation(activeRoundIndex);
    } else if (activeRoundIndex >= maxRounds) {
      setInternalRound(maxRounds);
      executeKOAnimation();
    }
  }, [activeRoundIndex]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  // Choreograph the fight sequence for a round
  const executeRoundAnimation = (roundIdx: number) => {
    const round = result.rounds[roundIdx];
    if (!round) return;

    // Reset effects
    setClashEffect(null);
    setScreenShake(false);
    setShowKO(false);
    setDamagePopup(null);

    const stepTime = 300 / animSpeed;

    // Phase 1: Charge & Gather Energy (0ms)
    setP1State('charge');
    setP2State('charge');
    soundManager.playEnergy();

    // Phase 2: Dash towards center (300ms)
    setTimeout(() => {
      setP1State('dash');
      setP2State('dash');
      soundManager.playDash();
    }, stepTime);

    // Phase 3: Clash & Signature Attack Unleash (600ms)
    setTimeout(() => {
      setP1State(round.statKey === 'specialAbility' ? 'special' : 'attack');
      setP2State(round.statKey === 'specialAbility' ? 'special' : 'attack');

      if (round.statKey === 'specialAbility' || round.statKey === 'power') {
        soundManager.playBeam();
      } else {
        soundManager.playHit();
      }

      setScreenShake(true);

      // Trigger Clash Visuals
      setClashEffect({
        active: true,
        type: round.winner === 'p1' ? p1Sprite?.specialFxType || 'kamehameha' : p2Sprite?.specialFxType || 'serious_punch',
        winner: round.winner,
        label: `${round.statName.toUpperCase()} CLASH!`,
      });
    }, stepTime * 2);

    // Phase 4: Impact resolution (1100ms)
    setTimeout(() => {
      setScreenShake(false);
      const diff = Math.abs(round.p1Value - round.p2Value);

      if (round.winner === 'p1') {
        setP1State('victory');
        setP2State('hit');
        soundManager.playHit();
        setDamagePopup({
          target: 'p2',
          text: `-${diff} PTS!`,
          color: 'text-red-400',
        });
      } else if (round.winner === 'p2') {
        setP1State('hit');
        setP2State('victory');
        soundManager.playHit();
        setDamagePopup({
          target: 'p1',
          text: `-${diff} PTS!`,
          color: 'text-red-400',
        });
      } else {
        setP1State('block');
        setP2State('block');
        soundManager.playClash();
        setDamagePopup({
          target: 'p1',
          text: 'EVEN CLASH!',
          color: 'text-amber-400',
        });
      }
    }, stepTime * 3.5);

    // Phase 5: Return to combat stance (1800ms)
    setTimeout(() => {
      setP1State('idle');
      setP2State('idle');
      setClashEffect(null);
      setDamagePopup(null);
    }, stepTime * 5.5);
  };

  // Execute the final K.O. animation
  const executeKOAnimation = () => {
    setShowKO(true);
    setScreenShake(true);
    soundManager.playKO();

    if (result.overallWinner === 'p1') {
      setP1State('victory');
      setP2State('ko');
    } else if (result.overallWinner === 'p2') {
      setP1State('ko');
      setP2State('victory');
    } else {
      setP1State('victory');
      setP2State('victory');
    }

    setTimeout(() => {
      setScreenShake(false);
    }, 600);
  };

  // Manual Animation controls
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    } else {
      setIsPlaying(true);
      runAutoSequence(internalRound);
    }
  };

  const runAutoSequence = (startRound: number) => {
    if (startRound >= maxRounds) {
      executeKOAnimation();
      setIsPlaying(false);
      if (onBattleFinish) onBattleFinish();
      return;
    }

    executeRoundAnimation(startRound);
    if (onRoundChange) onRoundChange(startRound);

    const roundDuration = 2000 / animSpeed;

    animTimeoutRef.current = setTimeout(() => {
      const nextRound = startRound + 1;
      setInternalRound(nextRound);
      runAutoSequence(nextRound);
    }, roundDuration);
  };

  const handleRestart = () => {
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    setIsPlaying(false);
    setShowKO(false);
    setClashEffect(null);
    setDamagePopup(null);
    setP1State('idle');
    setP2State('idle');
    setInternalRound(0);
    executeRoundAnimation(0);
  };

  // Stage Background CSS
  const getStageBg = () => {
    switch (stageTheme) {
      case 'tenkaichi':
        return 'from-amber-950 via-slate-900 to-slate-950 border-amber-600/40';
      case 'cosmic':
        return 'from-purple-950 via-indigo-950 to-slate-950 border-purple-500/40';
      case 'shinjuku':
        return 'from-blue-950 via-slate-900 to-slate-950 border-blue-500/40';
      case 'volcano':
        return 'from-red-950 via-orange-950 to-slate-950 border-red-600/40';
    }
  };

  const statIcons = {
    power: Swords,
    agility: Zap,
    battleIq: Brain,
    durability: Shield,
    endurance: HeartPulse,
    specialAbility: Flame,
  };

  const RoundIcon = currentRound ? statIcons[currentRound.statKey] || Swords : Swords;

  return (
    <div
      id="fight-animation-stage"
      className={`relative rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 ${
        screenShake ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : ''
      } ${getStageBg()}`}
    >
      {/* ARCADE HUD (Top Header with Health Bars & Win Lamps) */}
      <div className="relative z-20 bg-slate-950/80 backdrop-blur-md px-4 py-3 border-b border-slate-800">
        <div className="grid grid-cols-12 items-center gap-2 sm:gap-4">
          {/* Player 1 Health Bar */}
          <div className="col-span-5 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-combat font-bold text-white tracking-wide truncate max-w-[120px] sm:max-w-none">
                {p1.name}
              </span>
              <span className="font-mono text-[10px] text-amber-400 font-bold">
                {p1Health}% HP
              </span>
            </div>
            <div className="h-3 sm:h-4 w-full bg-slate-900 rounded-sm overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 transition-all duration-500 rounded-xs"
                style={{ width: `${p1Health}%` }}
              />
            </div>
            {/* Win Marks */}
            <div className="flex items-center gap-1">
              {result.rounds.slice(0, 6).map((r, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border text-[8px] flex items-center justify-center font-bold ${
                    i < internalRound && r.winner === 'p1'
                      ? 'bg-amber-400 border-amber-300 text-slate-950'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                  title={`Round ${i + 1}: ${r.statName}`}
                >
                  {i < internalRound && r.winner === 'p1' ? 'V' : ''}
                </div>
              ))}
            </div>
          </div>

          {/* Center Timer & Round Banner */}
          <div className="col-span-2 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 border-2 border-slate-950 font-combat text-xl sm:text-2xl font-black text-slate-950">
              {Math.max(1, 99 - internalRound * 15)}
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-300 tracking-wider mt-1 uppercase">
              R{Math.min(internalRound + 1, 6)}/6
            </span>
          </div>

          {/* Player 2 Health Bar */}
          <div className="col-span-5 space-y-1">
            <div className="flex items-center justify-between text-xs flex-row-reverse">
              <span className="font-combat font-bold text-white tracking-wide truncate max-w-[120px] sm:max-w-none">
                {p2.name}
              </span>
              <span className="font-mono text-[10px] text-amber-400 font-bold">
                {p2Health}% HP
              </span>
            </div>
            <div className="h-3 sm:h-4 w-full bg-slate-900 rounded-sm overflow-hidden p-0.5 border border-slate-700 flex justify-end">
              <div
                className="h-full bg-gradient-to-l from-emerald-500 via-amber-400 to-rose-500 transition-all duration-500 rounded-xs"
                style={{ width: `${p2Health}%` }}
              />
            </div>
            {/* Win Marks */}
            <div className="flex items-center justify-end gap-1">
              {result.rounds.slice(0, 6).map((r, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border text-[8px] flex items-center justify-center font-bold ${
                    i < internalRound && r.winner === 'p2'
                      ? 'bg-amber-400 border-amber-300 text-slate-950'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                  title={`Round ${i + 1}: ${r.statName}`}
                >
                  {i < internalRound && r.winner === 'p2' ? 'V' : ''}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Round Attribute Banner */}
        <div className="mt-2.5 flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold">
            <RoundIcon className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Round {internalRound + 1}:</span>
            <span className="text-amber-400 font-combat text-sm tracking-wider uppercase">
              {currentRound ? currentRound.statName : 'CLASH'}
            </span>
          </div>
        </div>
      </div>

      {/* THE ARENA STAGE SCENE */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden flex items-end justify-between px-6 sm:px-16 pb-6 bg-radial from-transparent via-black/40 to-black/80">
        {/* Parallax Stage Horizon & Scenery */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Stars / Energy Particles */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] animate-[pulse_4s_infinite]" />

          {/* Arena Stone Pillars / Architecture */}
          <div className="absolute bottom-12 left-4 w-12 h-44 bg-slate-800/40 border-r border-slate-700/50 transform -skew-y-6" />
          <div className="absolute bottom-12 right-4 w-12 h-44 bg-slate-800/40 border-l border-slate-700/50 transform skew-y-6" />

          {/* Arena Floating Ring Stage Floor */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800/70 border-t-2 border-amber-500/50 shadow-[0_-10px_30px_rgba(245,158,11,0.15)]">
            <div className="h-full w-full bg-[linear-gradient(90deg,transparent_49%,rgba(245,158,11,0.2)_50%,transparent_51%)] [background-size:40px_100%]" />
          </div>
        </div>

        {/* CLASH IMPACT / SPECIAL MOVE BEAM FX */}
        {clashEffect?.active && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            {/* Massive Energy Beam Across Stage */}
            <div
              className="w-full h-16 sm:h-24 opacity-90 blur-xs animate-pulse relative flex items-center justify-center"
              style={{
                background:
                  clashEffect.winner === 'p1'
                    ? `linear-gradient(90deg, ${p1.themeColor}, #ffffff, ${p2.themeColor}55)`
                    : clashEffect.winner === 'p2'
                    ? `linear-gradient(270deg, ${p2.themeColor}, #ffffff, ${p1.themeColor}55)`
                    : 'linear-gradient(90deg, #f59e0b, #ffffff, #f59e0b)',
              }}
            >
              <div className="w-20 h-20 bg-white rounded-full animate-ping opacity-75" />
              <span className="font-combat text-2xl sm:text-4xl font-black text-white drop-shadow-[0_0_15px_#000000] tracking-widest uppercase">
                {clashEffect.label}
              </span>
            </div>
          </div>
        )}

        {/* FLOATING DAMAGE POPUP */}
        {damagePopup && (
          <div
            className={`absolute z-30 font-combat text-2xl sm:text-3xl font-black drop-shadow-[0_0_8px_#000000] animate-bounce ${
              damagePopup.color
            } ${damagePopup.target === 'p1' ? 'left-16 sm:left-28 top-28' : 'right-16 sm:right-28 top-28'}`}
          >
            {damagePopup.text}
          </div>
        )}

        {/* DRAMATIC K.O. OVERLAY */}
        {showKO && (
          <div className="absolute inset-0 z-40 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <span className="font-combat text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-rose-600 drop-shadow-[0_10px_25px_rgba(244,63,94,0.6)] tracking-widest">
                K.O.!
              </span>
            </div>
            <div className="mt-4 px-6 py-2 rounded-full bg-slate-900/90 border border-amber-400/60 shadow-xl flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="font-combat text-xl text-white tracking-wider">
                {result.overallWinner === 'tie'
                  ? 'DRAW MATCH!'
                  : `${result.overallWinner === 'p1' ? p1.name : p2.name} WINS!`}
              </span>
            </div>
          </div>
        )}

        {/* PLAYER 1 PIXEL FIGHTER (Left, Facing Right) */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Floating Character Quote / Move Name Banner */}
          <div className="mb-2 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-700 text-[10px] font-mono text-slate-300 whitespace-nowrap shadow-md">
            {p1State === 'attack' || p1State === 'special'
              ? p1Sprite?.specialMoveName || p1.signatureMove
              : p1.name}
          </div>

          <PixelFighter
            character={p1}
            state={p1State}
            facing="right"
            size="lg"
            showAura={p1State === 'charge' || p1State === 'special'}
          />
        </div>

        {/* CENTER VERSUS / ATTRIBUTE CLASH INDICATOR */}
        <div className="relative z-10 mb-8 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-slate-900/90 border border-slate-700 flex items-center justify-center text-amber-400 shadow-xl">
            <Swords className="w-6 h-6 animate-pulse" />
          </div>
          {currentRound && (
            <span className="mt-2 font-mono text-[11px] font-bold text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
              {currentRound.p1Value} vs {currentRound.p2Value}
            </span>
          )}
        </div>

        {/* PLAYER 2 PIXEL FIGHTER (Right, Facing Left) */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Floating Character Quote / Move Name Banner */}
          <div className="mb-2 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-700 text-[10px] font-mono text-slate-300 whitespace-nowrap shadow-md">
            {p2State === 'attack' || p2State === 'special'
              ? p2Sprite?.specialMoveName || p2.signatureMove
              : p2.name}
          </div>

          <PixelFighter
            character={p2}
            state={p2State}
            facing="left"
            size="lg"
            showAura={p2State === 'charge' || p2State === 'special'}
          />
        </div>
      </div>

      {/* ROUND COMMENTARY & NARRATIVE TICKER */}
      {currentRound && (
        <div className="bg-slate-950/90 border-t border-slate-800/80 px-4 py-2.5 text-xs text-slate-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold text-[10px] shrink-0 uppercase">
              Round {internalRound + 1} Action
            </span>
            <p className="truncate text-slate-300 font-sans">
              {currentRound.narration}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 font-mono text-[11px] text-amber-400 font-bold">
            <span>Winner:</span>
            <span className="uppercase text-white">
              {currentRound.winner === 'tie'
                ? 'TIE'
                : currentRound.winner === 'p1'
                ? p1.name
                : p2.name}
            </span>
          </div>
        </div>
      )}

      {/* RETRO ARCADE CONTROLS BAR */}
      <div className="bg-slate-950 border-t border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            id="arcade-play-pause-btn"
            onClick={handlePlayPause}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white text-xs font-combat tracking-wider font-bold shadow-md shadow-rose-600/20"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{internalRound >= maxRounds ? 'REPLAY FIGHT' : 'PLAY ANIMATION'}</span>
              </>
            )}
          </button>

          <button
            id="arcade-restart-btn"
            onClick={handleRestart}
            title="Restart Animation from Round 1"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed selector */}
          <div className="flex items-center bg-slate-900 rounded-lg border border-slate-800 p-0.5 text-[11px] font-mono">
            <button
              onClick={() => setAnimSpeed(1)}
              className={`px-2 py-1 rounded ${
                animSpeed === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              1x
            </button>
            <button
              onClick={() => setAnimSpeed(1.5)}
              className={`px-2 py-1 rounded ${
                animSpeed === 1.5 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              1.5x
            </button>
            <button
              onClick={() => setAnimSpeed(2)}
              className={`px-2 py-1 rounded ${
                animSpeed === 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              2x
            </button>
          </div>
        </div>

        {/* Arena Backdrop Switcher */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="hidden sm:inline text-[11px] font-mono">STAGE:</span>
          <select
            value={stageTheme}
            onChange={(e) => setStageTheme(e.target.value as unknown as typeof stageTheme)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
          >
            <option value="tenkaichi">Tenkaichi Budokai</option>
            <option value="cosmic">Cosmic Void</option>
            <option value="shinjuku">Shinjuku Rooftop</option>
            <option value="volcano">Volcano Crater</option>
          </select>
        </div>
      </div>
    </div>
  );
}
