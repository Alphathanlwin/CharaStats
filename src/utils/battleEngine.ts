import { Character, StatComparison, BattleRound, BattleResult, StatKey } from '../types';
import { STAT_METADATA } from '../data/characters';

export function computeBattleResult(p1: Character, p2: Character): BattleResult {
  const comparisons: StatComparison[] = [];
  const rounds: BattleRound[] = [];

  let p1RoundsWon = 0;
  let p2RoundsWon = 0;
  let ties = 0;

  let p1TotalScore = 0;
  let p2TotalScore = 0;

  STAT_METADATA.forEach((meta, index) => {
    const key = meta.key;
    const p1Val = p1.stats[key];
    const p2Val = p2.stats[key];

    p1TotalScore += p1Val;
    p2TotalScore += p2Val;

    const diff = p1Val - p2Val;
    let roundWinner: 'p1' | 'p2' | 'tie' = 'tie';

    if (diff > 0) {
      roundWinner = 'p1';
      p1RoundsWon++;
    } else if (diff < 0) {
      roundWinner = 'p2';
      p2RoundsWon++;
    } else {
      ties++;
    }

    // Generate tailored round narratives
    const { p1Action, p2Action, narration, commentary } = generateStatNarration(
      key,
      meta.label,
      p1,
      p2,
      p1Val,
      p2Val,
      diff
    );

    comparisons.push({
      key,
      label: meta.label,
      iconName: meta.icon,
      description: meta.shortDesc,
      p1Value: p1Val,
      p2Value: p2Val,
      winner: roundWinner,
      diff: Math.abs(diff),
      commentary,
    });

    rounds.push({
      roundNumber: index + 1,
      statKey: key,
      statName: meta.label,
      p1Value: p1Val,
      p2Value: p2Val,
      winner: roundWinner,
      p1Action,
      p2Action,
      narration,
    });
  });

  // Overall winner resolution
  let overallWinner: 'p1' | 'p2' | 'tie';
  if (p1RoundsWon > p2RoundsWon) {
    overallWinner = 'p1';
  } else if (p2RoundsWon > p1RoundsWon) {
    overallWinner = 'p2';
  } else {
    // Tied on rounds won, decide by total cumulative stats score
    if (p1TotalScore > p2TotalScore) {
      overallWinner = 'p1';
    } else if (p2TotalScore > p1TotalScore) {
      overallWinner = 'p2';
    } else {
      overallWinner = 'tie';
    }
  }

  const victor = overallWinner === 'p1' ? p1 : overallWinner === 'p2' ? p2 : null;
  const loser = overallWinner === 'p1' ? p2 : overallWinner === 'p2' ? p1 : null;

  let verdictTitle = '';
  let verdictSummary = '';
  let decisiveFactor = '';

  if (victor && loser) {
    // Find victor's biggest stat advantages
    const advantages = comparisons
      .filter((c) => (overallWinner === 'p1' ? c.winner === 'p1' : c.winner === 'p2'))
      .sort((a, b) => b.diff - a.diff);

    const mainAdvantage = advantages[0];
    const secondAdvantage = advantages[1];

    verdictTitle = `${victor.name} Emerges Victorious!`;

    const advText = mainAdvantage
      ? `${mainAdvantage.label} (+${mainAdvantage.diff})`
      : 'Overall combat consistency';
    const secText = secondAdvantage
      ? ` and superior ${secondAdvantage.label} (+${secondAdvantage.diff})`
      : '';

    decisiveFactor = `${advText}${secText}`;

    verdictSummary = `${victor.name} (${victor.anime}) takes down ${loser.name} (${loser.anime}) with a final round score of ${
      overallWinner === 'p1' ? `${p1RoundsWon}-${p2RoundsWon}` : `${p2RoundsWon}-${p1RoundsWon}`
    } (Total Stat Power: ${overallWinner === 'p1' ? p1TotalScore : p2TotalScore} vs ${
      overallWinner === 'p1' ? p2TotalScore : p1TotalScore
    }). ${victor.name}'s decisive edge in ${mainAdvantage?.label || 'combat attributes'} proved insurmountable against ${loser.name}'s ${loser.signatureMove}.`;
  } else {
    verdictTitle = 'Legendary Stalemate!';
    decisiveFactor = 'Perfect stat equilibrium';
    verdictSummary = `Both ${p1.name} and ${p2.name} countered each other blow for blow with an identical round split (${p1RoundsWon}-${p2RoundsWon}) and equal cumulative combat energy (${p1TotalScore} pts). A true clash of titans with no definitive victor.`;
  }

  return {
    p1,
    p2,
    comparisons,
    rounds,
    p1RoundsWon,
    p2RoundsWon,
    ties,
    p1TotalScore,
    p2TotalScore,
    overallWinner,
    verdictTitle,
    verdictSummary,
    decisiveFactor,
  };
}

function generateStatNarration(
  key: StatKey,
  label: string,
  p1: Character,
  p2: Character,
  p1Val: number,
  p2Val: number,
  diff: number
): { p1Action: string; p2Action: string; narration: string; commentary: string } {
  let p1Action = '';
  let p2Action = '';
  let narration = '';
  let commentary = '';

  switch (key) {
    case 'power':
      p1Action = `${p1.name} unleashes full destructive power via ${p1.signatureMove}.`;
      p2Action = `${p2.name} counters with maximum kinetic force from ${p2.signatureMove}.`;
      if (diff > 0) {
        narration = `${p1.name}'s overwhelming kinetic output (${p1Val}) overpowers ${p2.name}'s strike (${p2Val}), sending shockwaves ripping across the arena!`;
        commentary = `${p1.name} exerts greater raw destructive force by +${diff} points.`;
      } else if (diff < 0) {
        narration = `${p2.name}'s sheer offensive force (${p2Val}) blasts through ${p1.name}'s guard (${p1Val}), shattering the ground beneath!`;
        commentary = `${p2.name} overpowers ${p1.name} with +${Math.abs(diff)} higher damage output.`;
      } else {
        narration = `Both powerhouses unleash equal destructive shockwaves (${p1Val} vs ${p2Val}), causing an atmospheric rupture!`;
        commentary = 'Perfect physical clash deadlock; equal destructive capabilities.';
      }
      break;

    case 'agility':
      p1Action = `${p1.name} accelerates into high-speed evasion and rapid blitz footwork.`;
      p2Action = `${p2.name} pushes reflexes to the limit, tracking sonic trajectories.`;
      if (diff > 0) {
        narration = `${p1.name}'s blinding speed (${p1Val}) flash-steps right past ${p2.name}'s reaction cone (${p2Val}), flanking from the blindspot!`;
        commentary = `${p1.name} dominates movement speed and reaction window by +${diff} points.`;
      } else if (diff < 0) {
        narration = `${p2.name} out-speeds ${p1.name} with instantaneous acceleration (${p2Val} vs ${p1Val}), weaving through incoming strikes effortlessly!`;
        commentary = `${p2.name} maintains a superior agility and evasion edge (+${Math.abs(diff)}).`;
      } else {
        narration = `Both fighters match each other step for step at maximum velocity (${p1Val} vs ${p2Val})!`;
        commentary = 'Identical combat velocity; neither can flank the other.';
      }
      break;

    case 'battleIq':
      p1Action = `${p1.name} analyzes the opponent's stance and predicts attack patterns.`;
      p2Action = `${p2.name} sets tactical traps and adapts timing on the fly.`;
      if (diff > 0) {
        narration = `${p1.name}'s superior tactical mind (${p1Val}) anticipates ${p2.name}'s routine (${p2Val}), baiting a lethal counter-strike!`;
        commentary = `${p1.name} out-thinks ${p2.name} tactically by +${diff} points.`;
      } else if (diff < 0) {
        narration = `${p2.name}'s deep strategic insight (${p2Val}) dissects ${p1.name}'s battle rhythm (${p1Val}), exploiting a subtle opening!`;
        commentary = `${p2.name} claims strategic superiority by +${Math.abs(diff)} points.`;
      } else {
        narration = `Both master tacticians read each other's feints simultaneously (${p1Val} vs ${p2Val})!`;
        commentary = 'Mental deadlock; both possess identical tactical foresight.';
      }
      break;

    case 'durability':
      p1Action = `${p1.name} braces for heavy impact, hardening body and defense barriers.`;
      p2Action = `${p2.name} absorbs blunt force trauma through hardened defense.`;
      if (diff > 0) {
        narration = `${p1.name}'s fortified defense (${p1Val}) tanks direct hits that would crush ${p2.name} (${p2Val}), standing virtually unmoved!`;
        commentary = `${p1.name} exhibits superior armor and physical resistance by +${diff} points.`;
      } else if (diff < 0) {
        narration = `${p2.name}'s absurd physical resistance (${p2Val}) shrugs off ${p1.name}'s heavy onslaught (${p1Val}) without flinching!`;
        commentary = `${p2.name} absorbs heavier punishment thanks to +${Math.abs(diff)} durability.`;
      } else {
        narration = `Both combatants trade heavy blows with impenetrable resilience (${p1Val} vs ${p2Val})!`;
        commentary = 'Equal damage mitigation; neither defense yields easily.';
      }
      break;

    case 'endurance':
      p1Action = `${p1.name} draws upon boundless inner stamina to fuel continuous combat.`;
      p2Action = `${p2.name} ignores pain and pushes through physical exhaustion.`;
      if (diff > 0) {
        narration = `As the battle drags on, ${p1.name}'s relentless stamina (${p1Val}) outlasts ${p2.name} (${p2Val}), who begins to pant from fatigue!`;
        commentary = `${p1.name} possesses higher long-term stamina and pain tolerance (+${diff}).`;
      } else if (diff < 0) {
        narration = `${p2.name}'s bottomless gas tank (${p2Val}) keeps pressure unrelenting while ${p1.name} (${p1Val}) burns through reserves!`;
        commentary = `${p2.name} holds the stamina longevity advantage by +${Math.abs(diff)} points.`;
      } else {
        narration = `Neither warrior gives a single inch in this test of sheer iron willpower (${p1Val} vs ${p2Val})!`;
        commentary = 'Identical stamina reservoirs; an endless war of attrition.';
      }
      break;

    case 'specialAbility':
      p1Action = `${p1.name} channels their ultimate esoteric technique: ${p1.signatureMove}!`;
      p2Action = `${p2.name} triggers their universe-bending power: ${p2.signatureMove}!`;
      if (diff > 0) {
        narration = `${p1.name}'s specialized technique (${p1Val}) overrides and bends ${p2.name}'s abilities (${p2Val}), creating a decisive breakthrough!`;
        commentary = `${p1.name}'s hax and special abilities triumph by +${diff} points.`;
      } else if (diff < 0) {
        narration = `${p2.name}'s reality-bending technique (${p2Val}) completely negates ${p1.name}'s arsenal (${p1Val}) in an awe-inspiring spectacle!`;
        commentary = `${p2.name} wields superior supernatural abilities and hax (+${Math.abs(diff)}).`;
      } else {
        narration = `Their ultimate techniques collide in a cataclysmic singularity with equal potency (${p1Val} vs ${p2Val})!`;
        commentary = 'Deadlocked special abilities; both techniques match each other.';
      }
      break;
  }

  return { p1Action, p2Action, narration, commentary };
}
