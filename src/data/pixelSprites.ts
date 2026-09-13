export interface PixelSpriteConfig {
  hairColor: string;
  hairStyle: 'spiky' | 'wild_tall' | 'bald' | 'ponytail' | 'messy' | 'straight' | 'bowl' | 'shaggy' | 'bun';
  skinTone: string;
  outfitColor: string;
  outfitAccent: string;
  pantsColor: string;
  capeColor?: string;
  eyeGlow?: string;
  headgear?: 'straw_hat' | 'headband' | 'blindfold' | 'cap' | 'fedora' | 'dog_ears' | 'chainsaw' | 'none';
  weapon?: 'katana' | 'giant_sword' | 'daggers' | 'fists' | 'gun' | 'chainsaw' | 'drill' | 'death_note';
  auraColor: string;
  specialMoveName: string;
  specialFxType:
    | 'kamehameha'
    | 'serious_punch'
    | 'rasengan'
    | 'gear5_stretch'
    | 'getsuga'
    | 'hollow_purple'
    | 'shadow_army'
    | 'hinokami_dragon'
    | 'titan_lightning'
    | 'chainsaw_slash'
    | 'stand_rush'
    | 'flame_kick'
    | 'spirit_gun'
    | 'excalibur'
    | 'psychic_blast'
    | 'geass_eye'
    | 'blood_spear'
    | 'giga_drill'
    | 'berserk_slash'
    | 'generic_blast';
}

export const PIXEL_SPRITES: Record<string, PixelSpriteConfig> = {
  goku: {
    hairColor: '#171717',
    hairStyle: 'spiky',
    skinTone: '#fde047',
    outfitColor: '#ea580c', // Orange Dogi
    outfitAccent: '#0284c7', // Blue Belt/Undershirt
    pantsColor: '#ea580c',
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#38bdf8', // Super Saiyan Blue / Ultra Instinct aura
    specialMoveName: 'KAMEHAMEHA',
    specialFxType: 'kamehameha',
  },
  saitama: {
    hairColor: 'transparent',
    hairStyle: 'bald',
    skinTone: '#fed7aa',
    outfitColor: '#eab308', // Yellow Suit
    outfitAccent: '#dc2626', // Red Gloves & Boots
    pantsColor: '#eab308',
    capeColor: '#f8fafc', // White Cape
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#ef4444',
    specialMoveName: 'SERIOUS PUNCH',
    specialFxType: 'serious_punch',
  },
  naruto: {
    hairColor: '#facc15', // Spiky Blonde
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#f97316', // Orange
    outfitAccent: '#1e293b', // Black shoulders
    pantsColor: '#f97316',
    headgear: 'headband',
    weapon: 'fists',
    auraColor: '#eab308', // Nine Tails / Kurama Gold
    specialMoveName: 'RASENSHURIKEN',
    specialFxType: 'rasengan',
  },
  luffy: {
    hairColor: '#18181b',
    hairStyle: 'messy',
    skinTone: '#fed7aa',
    outfitColor: '#dc2626', // Red Open Vest
    outfitAccent: '#eab308', // Yellow Sash
    pantsColor: '#2563eb', // Blue denim shorts
    headgear: 'straw_hat',
    weapon: 'fists',
    auraColor: '#f59e0b', // Gear 5 Nika White/Gold
    specialMoveName: 'BAJRANG GUN',
    specialFxType: 'gear5_stretch',
  },
  ichigo: {
    hairColor: '#f97316', // Bright Orange
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#09090b', // Black Shihakusho
    outfitAccent: '#fafafa', // White trim
    pantsColor: '#09090b',
    headgear: 'none',
    weapon: 'giant_sword',
    auraColor: '#3b82f6', // Spiritual Blue / Red
    specialMoveName: 'GETSUGA TENSHO',
    specialFxType: 'getsuga',
  },
  gojo: {
    hairColor: '#ffffff', // Spiky Snow White
    hairStyle: 'spiky',
    skinTone: '#ffedd5',
    outfitColor: '#1e1b4b', // Deep Navy Sorcerer Uniform
    outfitAccent: '#6366f1',
    pantsColor: '#1e1b4b',
    headgear: 'blindfold',
    weapon: 'fists',
    eyeGlow: '#38bdf8', // Six Eyes Cyan
    auraColor: '#818cf8', // Limitless / Hollow Purple
    specialMoveName: 'HOLLOW PURPLE',
    specialFxType: 'hollow_purple',
  },
  eren: {
    hairColor: '#451a03',
    hairStyle: 'shaggy',
    skinTone: '#fed7aa',
    outfitColor: '#15803d', // Survey Corps Cloak
    outfitAccent: '#78350f',
    pantsColor: '#f1f5f9',
    capeColor: '#166534',
    eyeGlow: '#22c55e', // Titan Green Eyes
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#dc2626', // Titan Steam / Lightning
    specialMoveName: 'TITAN RUMBLE',
    specialFxType: 'titan_lightning',
  },
  jinwoo: {
    hairColor: '#0f172a',
    hairStyle: 'messy',
    skinTone: '#fed7aa',
    outfitColor: '#020617', // Dark Assassin Coat
    outfitAccent: '#8b5cf6', // Violet Runes
    pantsColor: '#0f172a',
    eyeGlow: '#a855f7', // Glowing Shadow Violet Eyes
    headgear: 'none',
    weapon: 'daggers',
    auraColor: '#9333ea', // Shadow Monarch Aura
    specialMoveName: 'DOMAIN: ARISE',
    specialFxType: 'shadow_army',
  },
  rimuru: {
    hairColor: '#38bdf8', // Slime Blue/Silver
    hairStyle: 'straight',
    skinTone: '#f1f5f9',
    outfitColor: '#0f172a', // Demon Lord Black Coat
    outfitAccent: '#fbbf24', // Gold trim
    pantsColor: '#0f172a',
    headgear: 'none',
    weapon: 'katana',
    auraColor: '#06b6d4',
    specialMoveName: 'BEELZEBUTH',
    specialFxType: 'hollow_purple',
  },
  deku: {
    hairColor: '#065f46', // Dark Green
    hairStyle: 'messy',
    skinTone: '#fed7aa',
    outfitColor: '#047857', // Emerald Hero Suit
    outfitAccent: '#ef4444', // Red Gauntlets & Boots
    pantsColor: '#047857',
    headgear: 'none',
    weapon: 'fists',
    eyeGlow: '#34d399', // Full Cowl Sparks
    auraColor: '#10b981',
    specialMoveName: 'DETROIT SMASH',
    specialFxType: 'serious_punch',
  },
  tanjiro: {
    hairColor: '#881337', // Burgundy
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#065f46', // Checkered Green/Black Haori
    outfitAccent: '#171717',
    pantsColor: '#18181b',
    headgear: 'none',
    weapon: 'katana',
    auraColor: '#f97316', // Sun Breathing Hinokami
    specialMoveName: 'HINOKAMI KAGURA',
    specialFxType: 'hinokami_dragon',
  },
  gon: {
    hairColor: '#14532d', // Wild Tall Spiky Green/Black
    hairStyle: 'wild_tall',
    skinTone: '#fed7aa',
    outfitColor: '#16a34a', // Green Jacket
    outfitAccent: '#ca8a04',
    pantsColor: '#16a34a',
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#eab308', // Jajanken Gold Aura
    specialMoveName: 'JAJANKEN: ROCK',
    specialFxType: 'serious_punch',
  },
  edward: {
    hairColor: '#eab308', // Golden Braid
    hairStyle: 'ponytail',
    skinTone: '#fed7aa',
    outfitColor: '#dc2626', // Red Alchemist Coat
    outfitAccent: '#0f172a', // Black shirt
    pantsColor: '#0f172a',
    headgear: 'none',
    weapon: 'katana', // Transmuted automail blade
    auraColor: '#38bdf8', // Alchemy transmutation sparks
    specialMoveName: 'ALCHEMIC BURST',
    specialFxType: 'generic_blast',
  },
  jotaro: {
    hairColor: '#18181b',
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#09090b', // Black Uniform Coat
    outfitAccent: '#eab308', // Gold Chain
    pantsColor: '#09090b',
    headgear: 'cap',
    weapon: 'fists',
    auraColor: '#a855f7', // Star Platinum Purple Aura
    specialMoveName: 'ORA ORA RUSH',
    specialFxType: 'stand_rush',
  },
  mob: {
    hairColor: '#18181b', // Bowl Cut
    hairStyle: 'bowl',
    skinTone: '#fed7aa',
    outfitColor: '#18181b', // Gakuran Black
    outfitAccent: '#ffffff',
    pantsColor: '#18181b',
    eyeGlow: '#e11d48', // 100% Explosion Eyes
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#f43f5e', // Psychic Rainbow Distortion
    specialMoveName: 'PSYCHIC 100%',
    specialFxType: 'psychic_blast',
  },
  asta: {
    hairColor: '#94a3b8', // Ash Blonde
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#0f172a', // Black Bull Uniform
    outfitAccent: '#eab308',
    pantsColor: '#0f172a',
    headgear: 'headband',
    weapon: 'giant_sword', // Demon Slayer Black Blade
    auraColor: '#dc2626', // Anti-Magic Black/Red
    specialMoveName: 'BLACK METEORITE',
    specialFxType: 'getsuga',
  },
  alucard: {
    hairColor: '#18181b',
    hairStyle: 'messy',
    skinTone: '#f8fafc',
    outfitColor: '#b91c1c', // Red Duster Coat
    outfitAccent: '#09090b',
    pantsColor: '#09090b',
    capeColor: '#991b1b',
    eyeGlow: '#ef4444',
    headgear: 'fedora',
    weapon: 'gun',
    auraColor: '#7f1d1d',
    specialMoveName: 'RESTRICTION LEVEL 0',
    specialFxType: 'blood_spear',
  },
  simon: {
    hairColor: '#1e3a8a',
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#1e40af', // Blue Jacket with Red Flames
    outfitAccent: '#ef4444',
    pantsColor: '#0f172a',
    headgear: 'none',
    weapon: 'drill',
    auraColor: '#22c55e', // Spiral Power Emerald
    specialMoveName: 'GIGA DRILL BREAK',
    specialFxType: 'giga_drill',
  },
  guts: {
    hairColor: '#18181b',
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#1c1917', // Berserker Armor
    outfitAccent: '#78716c',
    pantsColor: '#1c1917',
    capeColor: '#292524',
    headgear: 'none',
    weapon: 'giant_sword', // Dragon Slayer
    auraColor: '#b91c1c', // Berserk Blood Lust
    specialMoveName: 'DRAGON SLAYER',
    specialFxType: 'berserk_slash',
  },
  denji: {
    hairColor: '#facc15', // Messy Blonde
    hairStyle: 'messy',
    skinTone: '#fed7aa',
    outfitColor: '#fafafa', // White Shirt with Black Tie
    outfitAccent: '#18181b',
    pantsColor: '#18181b',
    headgear: 'chainsaw',
    weapon: 'chainsaw',
    auraColor: '#ea580c',
    specialMoveName: 'CHAINSAW RUSH',
    specialFxType: 'chainsaw_slash',
  },
  kaneki: {
    hairColor: '#f8fafc', // White Hair
    hairStyle: 'messy',
    skinTone: '#ffedd5',
    outfitColor: '#09090b', // Leather Battle Suit
    outfitAccent: '#7f1d1d',
    pantsColor: '#09090b',
    eyeGlow: '#dc2626', // Kakugan Red Eye
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#e11d48', // Rinkaku Tentacles
    specialMoveName: 'CENTIPEDE KAGUNE',
    specialFxType: 'blood_spear',
  },
  shinra: {
    hairColor: '#18181b',
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#1e293b', // Fire Force Bunker Coat
    outfitAccent: '#38bdf8', // Neon Blue stripes
    pantsColor: '#1e293b',
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#f97316', // Devil's Footprints Fire
    specialMoveName: 'RAPID CORNA KICK',
    specialFxType: 'flame_kick',
  },
  meliodas: {
    hairColor: '#facc15', // Blonde
    hairStyle: 'messy',
    skinTone: '#fed7aa',
    outfitColor: '#fafafa', // White Vest
    outfitAccent: '#16a34a',
    pantsColor: '#fafafa',
    eyeGlow: '#4c1d95', // Demon Clan Mark
    headgear: 'none',
    weapon: 'katana',
    auraColor: '#6d28d9',
    specialMoveName: 'FULL COUNTER',
    specialFxType: 'generic_blast',
  },
  spike: {
    hairColor: '#14532d', // Fluffy Greenish-Black
    hairStyle: 'messy',
    skinTone: '#fed7aa',
    outfitColor: '#1e3a8a', // Blue Leisure Suit
    outfitAccent: '#facc15', // Yellow shirt
    pantsColor: '#1e3a8a',
    headgear: 'none',
    weapon: 'gun',
    auraColor: '#0284c7',
    specialMoveName: 'JEET KUNE DO',
    specialFxType: 'serious_punch',
  },
  thorfinn: {
    hairColor: '#eab308', // Shaggy Blonde
    hairStyle: 'shaggy',
    skinTone: '#fed7aa',
    outfitColor: '#78350f', // Norse Fur Tunic
    outfitAccent: '#b45309',
    pantsColor: '#451a03',
    headgear: 'none',
    weapon: 'daggers',
    auraColor: '#eab308',
    specialMoveName: 'DUAL DAGGERS',
    specialFxType: 'chainsaw_slash',
  },
  yusuke: {
    hairColor: '#064e3b', // Slicked Green-Black
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#15803d', // Green School Uniform
    outfitAccent: '#eab308',
    pantsColor: '#15803d',
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#38bdf8', // Spirit Gun Blue
    specialMoveName: 'SPIRIT GUN',
    specialFxType: 'spirit_gun',
  },
  inuyasha: {
    hairColor: '#f1f5f9', // Long Silver
    hairStyle: 'wild_tall',
    skinTone: '#fed7aa',
    outfitColor: '#dc2626', // Fire Rat Red Robe
    outfitAccent: '#fafafa',
    pantsColor: '#dc2626',
    headgear: 'dog_ears',
    weapon: 'giant_sword', // Tessaiga
    auraColor: '#f59e0b',
    specialMoveName: 'WIND SCAR',
    specialFxType: 'getsuga',
  },
  kenshin: {
    hairColor: '#b91c1c', // Crimson Red Ponytail
    hairStyle: 'ponytail',
    skinTone: '#fed7aa',
    outfitColor: '#be123c', // Red Kimono
    outfitAccent: '#f8fafc', // White Hakama
    pantsColor: '#f8fafc',
    headgear: 'none',
    weapon: 'katana', // Reverse-Blade Sakabato
    auraColor: '#f43f5e',
    specialMoveName: 'AMAKAKERU RYU NO HIRAMEKI',
    specialFxType: 'hinokami_dragon',
  },
  shinichi: {
    hairColor: '#451a03',
    hairStyle: 'straight',
    skinTone: '#fed7aa',
    outfitColor: '#334155', // Casual Blue Jacket
    outfitAccent: '#f8fafc',
    pantsColor: '#1e293b',
    headgear: 'none',
    weapon: 'katana', // Migi's morphed scythe blade
    auraColor: '#10b981',
    specialMoveName: 'MIGI SCYTHE SLASH',
    specialFxType: 'chainsaw_slash',
  },
  natsu: {
    hairColor: '#ec4899', // Salmon Pink Spiky
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: '#18181b', // Open Black Vest
    outfitAccent: '#fafafa', // Scaly Scarf
    pantsColor: '#f8fafc',
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#f97316', // Fire Dragon Slayer Flames
    specialMoveName: 'FIRE DRAGON ROAR',
    specialFxType: 'hinokami_dragon',
  },
  kirito: {
    hairColor: '#0f172a', // Black Straight
    hairStyle: 'straight',
    skinTone: '#fed7aa',
    outfitColor: '#020617', // Black Coat of Midnight
    outfitAccent: '#94a3b8', // Silver trim
    pantsColor: '#020617',
    headgear: 'none',
    weapon: 'katana', // Dual Blades (Elucidator & Dark Repulser)
    auraColor: '#06b6d4',
    specialMoveName: 'STARBURST STREAM',
    specialFxType: 'stand_rush',
  },
  lelouch: {
    hairColor: '#18181b',
    hairStyle: 'straight',
    skinTone: '#ffedd5',
    outfitColor: '#312e81', // Zero Purple/Gold Cape
    outfitAccent: '#facc15',
    pantsColor: '#0f172a',
    capeColor: '#4338ca',
    eyeGlow: '#e11d48', // Crimson Geass Bird
    headgear: 'none',
    weapon: 'gun',
    auraColor: '#e11d48',
    specialMoveName: 'GEASS COMMAND',
    specialFxType: 'geass_eye',
  },
  saber: {
    hairColor: '#facc15', // Blonde in Bun
    hairStyle: 'bun',
    skinTone: '#ffedd5',
    outfitColor: '#1d4ed8', // Royal Blue Gown
    outfitAccent: '#e2e8f0', // Silver Plate Armor
    pantsColor: '#1d4ed8',
    headgear: 'none',
    weapon: 'katana', // Excalibur
    auraColor: '#fbbf24', // Golden Holy Light
    specialMoveName: 'EXCALIBUR',
    specialFxType: 'excalibur',
  },
  light: {
    hairColor: '#78350f', // Neat Brown
    hairStyle: 'straight',
    skinTone: '#fed7aa',
    outfitColor: '#b45309', // Tan School Uniform Blazer
    outfitAccent: '#dc2626', // Red Tie
    pantsColor: '#1e293b',
    eyeGlow: '#dc2626', // Kira Shinigami Gaze
    headgear: 'none',
    weapon: 'death_note',
    auraColor: '#475569',
    specialMoveName: 'DEATH NOTE STRIKE',
    specialFxType: 'geass_eye',
  },
  shinji: {
    hairColor: '#451a03',
    hairStyle: 'straight',
    skinTone: '#fed7aa',
    outfitColor: '#f8fafc', // EVA Plugsuit White
    outfitAccent: '#2563eb', // Plugsuit Blue
    pantsColor: '#1e293b',
    headgear: 'none',
    weapon: 'fists',
    auraColor: '#84cc16', // EVA-01 Lime / Purple A.T. Field
    specialMoveName: 'A.T. FIELD BURST',
    specialFxType: 'hollow_purple',
  },
};
