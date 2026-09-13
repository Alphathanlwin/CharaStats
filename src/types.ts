export type StatKey =
  | 'power'
  | 'agility'
  | 'battleIq'
  | 'durability'
  | 'endurance'
  | 'specialAbility';

export interface CharacterStats {
  power: number;          // Destructive capability & physical/energy force
  agility: number;        // Speed, reaction time & combat reflexes
  battleIq: number;       // Tactical insight, strategy & combat adaptability
  durability: number;     // Physical resilience, shielding & damage mitigation
  endurance: number;      // Stamina, pain tolerance & battle longevity
  specialAbility: number; // Hax, unique powers (Domain Expansion, Ultra Instinct, Gear 5, etc.)
}

export interface Character {
  id: string;
  name: string;
  anime: string;
  avatar: string;
  themeColor: string;
  accentColor: string;
  quote: string;
  signatureMove: string;
  tier: 'Cosmic' | 'God' | 'Supreme' | 'Elite' | 'Special Grade' | 'Superhuman';
  stats: CharacterStats;
  bio: string;
  tags: string[];
}

export interface StatComparison {
  key: StatKey;
  label: string;
  iconName: string;
  description: string;
  p1Value: number;
  p2Value: number;
  winner: 'p1' | 'p2' | 'tie';
  diff: number;
  commentary: string;
}

export interface BattleRound {
  roundNumber: number;
  statKey: StatKey;
  statName: string;
  p1Value: number;
  p2Value: number;
  winner: 'p1' | 'p2' | 'tie';
  p1Action: string;
  p2Action: string;
  narration: string;
}

export interface BattleResult {
  p1: Character;
  p2: Character;
  comparisons: StatComparison[];
  rounds: BattleRound[];
  p1RoundsWon: number;
  p2RoundsWon: number;
  ties: number;
  p1TotalScore: number;
  p2TotalScore: number;
  overallWinner: 'p1' | 'p2' | 'tie';
  verdictTitle: string;
  verdictSummary: string;
  decisiveFactor: string;
}
