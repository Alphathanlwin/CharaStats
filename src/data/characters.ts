import { Character } from '../types';

export const ANIME_CHARACTERS: Character[] = [
  {
    id: 'goku',
    name: 'Son Goku',
    anime: 'Dragon Ball Super',
    avatar:'/avatars/goku.png',
    themeColor: '#f97316', // Orange
    accentColor: '#0284c7', // Blue
    quote: "I am the hope of the universe. I am the answer to all living things that cry out for peace.",
    signatureMove: 'Kamehameha / Ultra Instinct',
    tier: 'God',
    stats: {
      power: 99,
      agility: 98,
      battleIq: 95,
      durability: 97,
      endurance: 99,
      specialAbility: 98,
    },
    bio: 'Saiyan raised on Earth who reaches divine states of Ultra Instinct, capable of shattering dimensions through raw Ki manipulation.',
    tags: ['Saiyan', 'Martial Artist', 'God Ki', 'Shonen Legend']
  },
  {
    id: 'saitama',
    name: 'Saitama',
    anime: 'One Punch Man',
    avatar:'/avatars/saitama.jpg',
    themeColor: '#eab308', // Yellow
    accentColor: '#dc2626', // Red
    quote: "I'm just a guy who's a hero for fun.",
    signatureMove: 'Serious Punch: Omni-Directional',
    tier: 'God',
    stats: {
      power: 100,
      agility: 99,
      battleIq: 72,
      durability: 100,
      endurance: 100,
      specialAbility: 92,
    },
    bio: 'A hero who broke his physical limiter through sheer training. Has never taken permanent damage or faced a physical challenge.',
    tags: ['Hero', 'Limiter Broken', 'Gag/Satire Powerhouse']
  },
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    anime: 'Naruto Shippuden',
    avatar:'/avatars/naruto.png',
    themeColor: '#f59e0b', // Amber
    accentColor: '#3b82f6', // Rasengan Blue
    quote: "I won't run away, I never go back on my word! That is my ninja way!",
    signatureMove: 'Six Paths Sage Rasenshuriken / Baryon Mode',
    tier: 'Supreme',
    stats: {
      power: 92,
      agility: 93,
      battleIq: 91,
      durability: 90,
      endurance: 98,
      specialAbility: 95,
    },
    bio: 'The Seventh Hokage and Nine-Tails Jinchuriki. Legendary chakra reservoir with Six Paths power and unmatched guts to never give up.',
    tags: ['Ninja', 'Hokage', 'Kurama', 'Sage Mode']
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    anime: 'One Piece',
    avatar:'/avatars/luffy.png',
    themeColor: '#ef4444', // Red
    accentColor: '#facc15', // Gold Straw Hat
    quote: "If you don't take risks, you can't create a future! I will be King of the Pirates!",
    signatureMove: 'Bajrang Gun (Gear 5: Sun God Nika)',
    tier: 'Supreme',
    stats: {
      power: 91,
      agility: 91,
      battleIq: 93,
      durability: 94,
      endurance: 99,
      specialAbility: 96,
    },
    bio: 'Captain of the Straw Hat Pirates. Awakened the mythical Zoan Hito Hito no Mi Model: Nika, possessing ridiculous rubber reality-warping physics and Advanced Conqueror Haki.',
    tags: ['Pirate', 'Nika Sun God', 'Conqueror Haki', 'Rubber Body']
  },
  {
    id: 'ichigo',
    name: 'Ichigo Kurosaki',
    anime: 'Bleach',
    avatar:'/avatars/ichigo.png',
    themeColor: '#3b82f6', // Spiritual Blue
    accentColor: '#000000', // Bankai Black
    quote: "If fate is a millstone, then we are the grist. There is nothing we can do. So I wish for strength.",
    signatureMove: 'Mugetsu / Gran Rey Cero Getsuga Tensho',
    tier: 'Supreme',
    stats: {
      power: 94,
      agility: 96,
      battleIq: 84,
      durability: 89,
      endurance: 94,
      specialAbility: 92,
    },
    bio: 'Substitute Soul Reaper bearing the combined powers of Soul Reaper, Hollow, and Quincy. Can cut through dimensions and sky-splitting spiritual pressure.',
    tags: ['Soul Reaper', 'Hollow', 'Bankai', 'True Shikai']
  },
  {
    id: 'gojo',
    name: 'Satoru Gojo',
    anime: 'Jujutsu Kaisen',
    avatar:'/avatars/gojo.png',
    themeColor: '#06b6d4', // Cyan Infinity
    accentColor: '#a855f7', // Hollow Purple
    quote: "Throughout heaven and earth, I alone am the honored one.",
    signatureMove: 'Hollow Purple / Unlimited Void',
    tier: 'Supreme',
    stats: {
      power: 93,
      agility: 94,
      battleIq: 97,
      durability: 98,
      endurance: 95,
      specialAbility: 100,
    },
    bio: 'The strongest modern Jujutsu Sorcerer. Possesses the Six Eyes and Limitless technique, rendering him virtually untouchable through infinite space manipulation.',
    tags: ['Sorcerer', 'Limitless', 'Six Eyes', 'Domain Expansion']
  },
  {
    id: 'eren',
    name: 'Eren Yeager',
    anime: 'Attack on Titan',
    avatar:'/avatars/eren.jpg',
    themeColor: '#15803d', // Survey Corps Green
    accentColor: '#7f1d1d', // Rumbling Blood Red
    quote: "If we kill all our enemies over there... will we finally be free?",
    signatureMove: 'The Rumbling / Founding Titan Command',
    tier: 'Special Grade',
    stats: {
      power: 92,
      agility: 75,
      battleIq: 89,
      durability: 93,
      endurance: 96,
      specialAbility: 95,
    },
    bio: 'Wielder of the Attack, War Hammer, and Founding Titans. Can summon millions of Colossal Titans and alter Eldian biology across time paths.',
    tags: ['Founding Titan', 'Freedom', 'War Hammer', 'The Rumbling']
  },
  {
    id: 'jinwoo',
    name: 'Sung Jin-woo',
    anime: 'Solo Leveling',
    avatar:'/avatars/jinwoo.png',
    themeColor: '#8b5cf6', // Shadow Purple
    accentColor: '#1e1b4b', // Deep Void
    quote: "Arise.",
    signatureMove: 'Shadow Monarch Domain: Arise',
    tier: 'God',
    stats: {
      power: 98,
      agility: 97,
      battleIq: 94,
      durability: 95,
      endurance: 98,
      specialAbility: 99,
    },
    bio: 'The Shadow Monarch who commands an infinite, immortal legion of shadow warriors extracted from fallen foes, transcending human hunter limits.',
    tags: ['Shadow Monarch', 'Necromancy', 'S-Rank Hunter', 'Monarch']
  },
  {
    id: 'rimuru',
    name: 'Rimuru Tempest',
    anime: 'That Time I Got Reincarnated as a Slime',
    avatar:'/avatars/rimuru.png',
    themeColor: '#38bdf8', // Slime Sky
    accentColor: '#6366f1', // Ultimate Skill Indigo
    quote: "I'm not a bad slime, you know!",
    signatureMove: 'Beelzebuth (Lord of Gluttony) / Void Collapse',
    tier: 'God',
    stats: {
      power: 98,
      agility: 96,
      battleIq: 99,
      durability: 98,
      endurance: 99,
      specialAbility: 100,
    },
    bio: 'True Demon Lord slime supported by the Ultimate Skill Raphael/Ciel. Can devour infinite energy, analyze any technique, and nullify all physical damage.',
    tags: ['Demon Lord', 'Predator', 'Wisdom Lord Raphael', 'Slime']
  },
  {
    id: 'deku',
    name: 'Izuku Midoriya (Deku)',
    anime: 'My Hero Academia',
    avatar:'/avatars/deku.png',
    themeColor: '#10b981', // Hero Emerald
    accentColor: '#dc2626', // Red Gauntlets
    quote: "A smiling, dependable, cool hero... That's what I wanna be! That's why I'm giving it everything!",
    signatureMove: 'Detroit Smash 100% / Gearshift Overdrive',
    tier: 'Special Grade',
    stats: {
      power: 90,
      agility: 92,
      battleIq: 97,
      durability: 85,
      endurance: 95,
      specialAbility: 91,
    },
    bio: 'Ninth inheritor of One For All, mastering the quirks of previous users including Blackwhip, Danger Sense, Fa Jin, and Gearshift.',
    tags: ['Hero', 'One For All', 'Blackwhip', 'Gearshift']
  },
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    anime: 'Demon Slayer: Kimetsu no Yaiba',
    avatar:'/avatars/tanjiro.png',
    themeColor: '#059669', // Checkered Green
    accentColor: '#ea580c', // Hinokami Fire
    quote: "No matter how many people you may lose, you have no choice but to go on living.",
    signatureMove: 'Hinokami Kagura (Sun Breathing: Thirteenth Form)',
    tier: 'Superhuman',
    stats: {
      power: 82,
      agility: 88,
      battleIq: 91,
      durability: 84,
      endurance: 96,
      specialAbility: 86,
    },
    bio: 'Demon slayer possessing the Transparent World, Demon Slayer Mark, and Sun Breathing, known for an indomitable will and supreme olfactory sense.',
    tags: ['Demon Slayer', 'Sun Breathing', 'Transparent World', 'Grit']
  },
  {
    id: 'gon',
    name: 'Gon Freecss',
    anime: 'Hunter x Hunter',
    avatar:'/avatars/gon.jpg',
    themeColor: '#22c55e', // Grass Green
    accentColor: '#eab308', // Jajanken Gold
    quote: "I don't care if this is the end... So I'll use everything.",
    signatureMove: 'Jajanken: Rock (Adult Transformation)',
    tier: 'Special Grade',
    stats: {
      power: 92,
      agility: 89,
      battleIq: 86,
      durability: 87,
      endurance: 97,
      specialAbility: 90,
    },
    bio: 'Prodigious Enhancer Hunter. In his vow-contract adult form, his Nen output equaled the Chimera Ant King Mereum, delivering catastrophic concussive blows.',
    tags: ['Hunter', 'Enhancer', 'Nen Vow', 'Jajanken']
  },
  {
    id: 'edward',
    name: 'Edward Elric',
    anime: 'Fullmetal Alchemist: Brotherhood',
    avatar:'/avatars/edward.jpg',
    themeColor: '#dc2626', // Crimson Coat
    accentColor: '#ca8a04', // Automail Brass
    quote: "A lesson without pain is meaningless. For that is how mankind progresses.",
    signatureMove: 'Hand-Clap Transmutation & Automail Blade',
    tier: 'Superhuman',
    stats: {
      power: 78,
      agility: 84,
      battleIq: 98,
      durability: 79,
      endurance: 89,
      specialAbility: 88,
    },
    bio: 'Youngest State Alchemist in Amestris history. Can perform circle-less alchemy instantly by clapping hands, reshaping terrain, weaponry, and matter.',
    tags: ['Fullmetal Alchemist', 'Circle-less Alchemy', 'Automail', 'Genius']
  },
  {
    id: 'jotaro',
    name: 'Jotaro Kujo',
    anime: "JoJo's Bizarre Adventure",
    avatar:'/avatars/jotaro.png',
    themeColor: '#4338ca', // Indigo Stand
    accentColor: '#e11d48', // Star Platinum Magenta
    quote: "Yare yare daze. (Good grief.)",
    signatureMove: 'Star Platinum: The World (Time Stop & Ora Ora Rush)',
    tier: 'Supreme',
    stats: {
      power: 90,
      agility: 94,
      battleIq: 96,
      durability: 88,
      endurance: 91,
      specialAbility: 97,
    },
    bio: 'Stand user of Star Platinum, possessing light-speed precision, immense destructive power, and the ability to freeze time completely for up to 5 seconds.',
    tags: ['Stand User', 'Time Stop', 'Ora Ora', 'Star Platinum']
  },
  {
    id: 'mob',
    name: 'Shigeo Kageyama (Mob)',
    anime: 'Mob Psycho 100',
    avatar:'/avatars/mob.png',
    themeColor: '#a855f7', // Psychic Violet
    accentColor: '#1e293b', // Black Uniform
    quote: "If everyone is not special, maybe you can be what you want to be.",
    signatureMove: '???% Unleashed / 100% Psychokinetic Burst',
    tier: 'Supreme',
    stats: {
      power: 96,
      agility: 90,
      battleIq: 78,
      durability: 96,
      endurance: 94,
      specialAbility: 98,
    },
    bio: 'An unassuming middle-school esper whose suppressed subconscious stores apocalyptic psychic telekinesis, barrier generation, and matter reconstruction.',
    tags: ['Esper', 'Psychic ???%', 'Telekinesis', 'Barrier']
  },
  {
    id: 'asta',
    name: 'Asta',
    anime: 'Black Clover',
    avatar:'/avatars/asta.png',
    themeColor: '#0f172a', // Anti-Magic Slate
    accentColor: '#dc2626', // Demon Red
    quote: "My magic is never giving up!",
    signatureMove: 'Demon-Slasher Infinite Slash: Equinox (Devil Union)',
    tier: 'Supreme',
    stats: {
      power: 92,
      agility: 93,
      battleIq: 85,
      durability: 91,
      endurance: 99,
      specialAbility: 96,
    },
    bio: 'Born magicless in a world of magic, wielding a 5-leaf grimoire with Liebe to nullify, absorb, and slice through all spells, dimensions, and curses.',
    tags: ['Anti-Magic', 'Devil Union', 'Black Bull', 'Indomitable']
  },
  {
    id: 'alucard',
    name: 'Alucard',
    anime: 'Hellsing Ultimate',
    avatar:'/avatars/alucard.jpg',
    themeColor: '#991b1b', // Crimson Vampire
    accentColor: '#000000', // Coffin Black
    quote: "A bird of Hermes is my name, eating my feathers to make me tame.",
    signatureMove: 'Control Art Restriction Level Zero / Schrödinger Omnipresence',
    tier: 'God',
    stats: {
      power: 93,
      agility: 91,
      battleIq: 93,
      durability: 99,
      endurance: 100,
      specialAbility: 99,
    },
    bio: 'The immortal progenitor vampire of the Hellsing Organization. Commands millions of consumed souls, regenerative immortality, and quantum omnipresence.',
    tags: ['Vampire Lord', 'Immortality', 'Level Zero', 'Schrödinger']
  },
  {
    id: 'simon',
    name: 'Simon the Digger',
    anime: 'Tengen Toppa Gurren Lagann',
    avatar:'/avatars/simon.jpg',
    themeColor: '#0284c7', // Spiral Blue
    accentColor: '#e11d48', // Core Drill Crimson
    quote: "Mark my words! This drill will open a hole in the universe! And that hole will be a path for those behind us!",
    signatureMove: 'Super Tengen Toppa Giga Drill Break',
    tier: 'Cosmic',
    stats: {
      power: 100,
      agility: 96,
      battleIq: 89,
      durability: 98,
      endurance: 100,
      specialAbility: 100,
    },
    bio: 'Leader of Team Dai-Gurren powered by infinite Spiral Energy. Throws galaxies like shurikens and pierces through multi-dimensional probability barriers.',
    tags: ['Spiral King', 'Galactic Scale', 'Giga Drill', 'Infinite Will']
  },
  {
    id: 'guts',
    name: 'Guts (The Black Swordsman)',
    anime: 'Berserk',
    avatar:'/avatars/guts.png',
    themeColor: '#334155', // Iron Slate
    accentColor: '#b91c1c', // Berserker Blood
    quote: "You're going to be alright. You just stumbled over a stone in the road. It means nothing. Your goal is far beyond this.",
    signatureMove: 'Dragonslayer Frenzy (Berserker Armor)',
    tier: 'Elite',
    stats: {
      power: 87,
      agility: 85,
      battleIq: 95,
      durability: 94,
      endurance: 100,
      specialAbility: 74,
    },
    bio: 'The struggler who defies destiny itself. Wields the massive slab Dragonslayer and the Berserker Armor, fighting past fractured bones and lethal blood loss.',
    tags: ['Struggler', 'Dragonslayer', 'Berserker Armor', 'Apostle Slayer']
  },
  {
    id: 'denji',
    name: 'Denji (Chainsaw Man)',
    anime: 'Chainsaw Man',
    avatar:'/avatars/denji.png',
    themeColor: '#ea580c', // Chainsaw Orange
    accentColor: '#7f1d1d', // Devil Crimson
    quote: "If there's anyone who gets in the way of my simple dreams, they can go to hell!",
    signatureMove: 'Hero of Hell Chainsaw Rev & Erasure',
    tier: 'Special Grade',
    stats: {
      power: 89,
      agility: 88,
      battleIq: 83,
      durability: 93,
      endurance: 99,
      specialAbility: 94,
    },
    bio: 'Hybrid devil fused with Pochita, the Chainsaw Devil. In True Devil form, devils he consumes are completely erased from reality and collective memory.',
    tags: ['Chainsaw Devil', 'Hero of Hell', 'Immortality', 'Blood Regeneration']
  },
  {
    id: 'kaneki',
    name: 'Ken Kaneki',
    anime: 'Tokyo Ghoul',
    avatar:'/avatars/kaneki.png',
    themeColor: '#64748b', // Centipede Silver
    accentColor: '#e11d48', // Rinkaku Red
    quote: "I am a ghoul. I'm not the protagonist of a novel... If you were to write a story with me in the lead, it would certainly be a tragedy.",
    signatureMove: 'One-Eyed King Kakuja & Dragon Kagune',
    tier: 'Special Grade',
    stats: {
      power: 88,
      agility: 92,
      battleIq: 90,
      durability: 89,
      endurance: 96,
      specialAbility: 89,
    },
    bio: 'The One-Eyed King with supreme regenerative biology and adaptive Rinkaku tentacles capable of piercing steel and reforming severed limbs in milliseconds.',
    tags: ['One-Eyed King', 'Ghoul', 'Kakuja', 'Regeneration']
  },
  {
    id: 'shinra',
    name: 'Shinra Kusakabe',
    anime: 'Fire Force',
    avatar:'/avatars/shinra.png',
    themeColor: '#f97316', // Ignition Orange
    accentColor: '#38bdf8', // Adolla Blue
    quote: "I promised my mom and my brother... that I would become a hero!",
    signatureMove: 'Corna / Shinrabanshō-Man (Reality Recreation)',
    tier: 'God',
    stats: {
      power: 96,
      agility: 100,
      battleIq: 87,
      durability: 91,
      endurance: 93,
      specialAbility: 99,
    },
    bio: 'Third generation pyrokinetic with the Devil\'s Footprints. Capable of exceeding light speed, moving backwards through time, and recreating Earth as Shinrabanshō-Man.',
    tags: ['Hero', 'Devils Footprints', 'FTL Speed', 'Shinrabanshō']
  },
  {
    id: 'meliodas',
    name: 'Meliodas',
    anime: 'The Seven Deadly Sins',
    avatar:'/avatars/meliodas.png',
    themeColor: '#eab308', // Sin of Wrath Gold
    accentColor: '#475569', // Demon Mark Slate
    quote: "No matter what lies you tell, you can't fool your own heart.",
    signatureMove: 'Full Counter / True Magic Demon King Mode',
    tier: 'Supreme',
    stats: {
      power: 94,
      agility: 93,
      battleIq: 95,
      durability: 93,
      endurance: 97,
      specialAbility: 96,
    },
    bio: 'Dragon Sin of Wrath and former leader of the Ten Commandments. Full Counter reflects any magical strike with double the destructive force.',
    tags: ['Dragon Sin', 'Full Counter', 'Demon King', 'Hellfire']
  },
  {
    id: 'spike',
    name: 'Spike Spiegel',
    anime: 'Cowboy Bebop',
    avatar:'/avatars/spike.png',
    themeColor: '#1e3a8a', // Midnight Blue Suit
    accentColor: '#d97706', // Jazz Amber
    quote: "Whatever happens, happens. Bang.",
    signatureMove: 'Jeet Kune Do Flow & Jericho 941 Quickdraw',
    tier: 'Elite',
    stats: {
      power: 65,
      agility: 88,
      battleIq: 97,
      durability: 74,
      endurance: 88,
      specialAbility: 60,
    },
    bio: 'Former Red Dragon Syndicate enforcer turned bounty hunter. Master of Bruce Lee\'s Jeet Kune Do martial arts with unrivaled fluid dodging and marksmanship.',
    tags: ['Bounty Hunter', 'Jeet Kune Do', 'Syndicate', 'Space Cowboy']
  },
  {
    id: 'thorfinn',
    name: 'Thorfinn Karlsefni',
    anime: 'Vinland Saga',
    avatar:'/avatars/thorfinn.png',
    themeColor: '#ca8a04', // Nordic Bronze
    accentColor: '#166534', // Vinland Forest
    quote: "I have no enemies. No one in this world is someone I should hurt.",
    signatureMove: 'Dual Dagger Acrobatic Blitz & Pacifist Defense',
    tier: 'Elite',
    stats: {
      power: 74,
      agility: 92,
      battleIq: 93,
      durability: 78,
      endurance: 95,
      specialAbility: 55,
    },
    bio: 'Son of Thors the Troll. Survived lethal duels across Viking wars using lethal acrobatic speed, pinpoint anatomical strikes, and unmatched stamina.',
    tags: ['Viking', 'True Warrior', 'Dual Daggers', 'No Enemies']
  },
  {
    id: 'yusuke',
    name: 'Yusuke Urameshi',
    anime: 'Yu Yu Hakusho',
    avatar:'/avatars/yusuke.png',
    themeColor: '#10b981', // Spirit Gun Green
    accentColor: '#f97316', // Mazoku Fire
    quote: "I don't care if she's a girl or a demon! If she hits me, I'm hitting back!",
    signatureMove: 'Spirit Gun Mega / Sacred Energy Mazoku Form',
    tier: 'Supreme',
    stats: {
      power: 93,
      agility: 92,
      battleIq: 92,
      durability: 91,
      endurance: 97,
      specialAbility: 92,
    },
    bio: 'Spirit Detective bearing the ancient bloodline of the Mazoku demon king Raizen. Channels concentrated spiritual and demon energy through his fingertips.',
    tags: ['Spirit Detective', 'Spirit Gun', 'Mazoku', 'Dark Tournament']
  },
  {
    id: 'inuyasha',
    name: 'Inuyasha',
    anime: 'Inuyasha',
    avatar:'/avatars/inuyasha.png',
    themeColor: '#ef4444', // Robe of the Fire-Rat
    accentColor: '#94a3b8', // Tessaiga Silver
    quote: "I'll never forgive anyone who hurts my friends! Wind Scar!",
    signatureMove: 'Backlash Wave (Bakuryūha) & Meidō Zangetsuha',
    tier: 'Special Grade',
    stats: {
      power: 88,
      agility: 89,
      battleIq: 84,
      durability: 89,
      endurance: 94,
      specialAbility: 90,
    },
    bio: 'Half-demon warrior wielding the legendary sword Tessaiga. Can cut through demonic barriers and banish opponents directly to the Netherworld with Meidō Zangetsuha.',
    tags: ['Half-Demon', 'Tessaiga', 'Wind Scar', 'Feudal Fairy Tale']
  },
  {
    id: 'kenshin',
    name: 'Himura Kenshin',
    anime: 'Rurouni Kenshin',
    avatar:'/avatars/kenshin.png',
    themeColor: '#dc2626', // Crimson Kimono
    accentColor: '#f8fafc', // Reverse Blade Steel
    quote: "A sword is a weapon. The art of swordsmanship is learning how to kill. That is the truth.",
    signatureMove: 'Hiten Mitsurugi-ryū: Amakakeru Ryū no Hirameki',
    tier: 'Superhuman',
    stats: {
      power: 79,
      agility: 97,
      battleIq: 95,
      durability: 77,
      endurance: 90,
      specialAbility: 70,
    },
    bio: 'The legendary Hitokiri Battōsai master of the godspeed Hiten Mitsurugi-ryū swordsmanship, delivering vacuum-pressure sonic slashes with a reverse-blade sword.',
    tags: ['Battosai', 'Hiten Mitsurugi', 'Godspeed', 'Wandering Samurai']
  },
  {
    id: 'shinichi',
    name: 'Shinichi Izumi (with Migi)',
    anime: 'Parasyte: The Maxim',
    avatar:'/avatars/shinichi.png',
    themeColor: '#0ea5e9', // Symbiotic Teal
    accentColor: '#78716c', // Blade Flesh
    quote: "Migi, handle the defense.",
    signatureMove: 'Supersonic Parasyte Morph Blades & Enhanced Reflex Blitz',
    tier: 'Superhuman',
    stats: {
      power: 81,
      agility: 89,
      battleIq: 94,
      durability: 82,
      endurance: 88,
      specialAbility: 85,
    },
    bio: 'High-schooler bonded with alien parasite Migi. Combines superhuman physiological enhancements with Migi\'s instantaneous algorithmic blade calculations.',
    tags: ['Symbiote', 'Parasyte', 'Tactical Duo', 'Supersonic Blades']
  },
  {
    id: 'natsu',
    name: 'Natsu Dragneel',
    anime: 'Fairy Tail',
    avatar:'/avatars/natsu.png',
    themeColor: '#f97316', // Fire Dragon Orange
    accentColor: '#ec4899', // Dragon Force Pink
    quote: "I'm all fired up! If you touch my guild, I'll burn you to ashes!",
    signatureMove: 'Crimson Lotus: Exploding Lightning Blade / Dragon Force',
    tier: 'Supreme',
    stats: {
      power: 93,
      agility: 88,
      battleIq: 87,
      durability: 91,
      endurance: 98,
      specialAbility: 93,
    },
    bio: 'Fire Dragon Slayer raised by Igneel, secretly E.N.D. (Etherious Natsu Dragneel). Consumes external flames to replenish magic power and unlock Dragon Force.',
    tags: ['Dragon Slayer', 'Dragon Force', 'E.N.D.', 'Fairy Tail Guild']
  },
  {
    id: 'kirito',
    name: 'Kirito (Kazuto Kirigaya)',
    anime: 'Sword Art Online',
    avatar:'/avatars/kirito.png',
    themeColor: '#0f172a', // The Black Swordsman
    accentColor: '#06b6d4', // Elucidator & Dark Repulser
    quote: "Whether this world is real or virtual, the feelings we have are real!",
    signatureMove: 'Dual Blades 16-Hit: Starburst Stream',
    tier: 'Special Grade',
    stats: {
      power: 87,
      agility: 95,
      battleIq: 94,
      durability: 83,
      endurance: 91,
      specialAbility: 88,
    },
    bio: 'The Black Swordsman of Aincrad. Master of the Dual Blades skill and Incarnation reality manipulation inside Underworld, commanding Starburst Stream.',
    tags: ['Black Swordsman', 'Dual Blades', 'Incarnation', 'Starburst Stream']
  },
  {
    id: 'lelouch',
    name: 'Lelouch vi Britannia',
    anime: 'Code Geass: Lelouch of the Rebellion',
    avatar:'/avatars/lelouch.png',
    themeColor: '#6366f1', // Zero Purple
    accentColor: '#e11d48', // Geass Sigil Crimson
    quote: "The only ones who should kill are those who are prepared to be killed.",
    signatureMove: 'Absolute Obedience Geass Command / Shinkiro Rail Cannon',
    tier: 'Special Grade',
    stats: {
      power: 76,
      agility: 72,
      battleIq: 100,
      durability: 70,
      endurance: 80,
      specialAbility: 98,
    },
    bio: 'Grand strategist Zero. Possesses the Power of Kings (Geass), which forces any target into absolute, unbreakable psychological obedience with direct eye contact.',
    tags: ['Zero', 'Geass', 'Master Strategist', 'Absolute Obedience']
  },
  {
    id: 'saber',
    name: 'Saber (Artoria Pendragon)',
    anime: 'Fate/stay night',
    avatar:'/avatars/saber.png',
    themeColor: '#2563eb', // Royal Blue
    accentColor: '#eab308', // Excalibur Gold
    quote: "There are no regrets. If one can be proud of one's life, one should not wish for another chance.",
    signatureMove: 'Excalibur: Sword of Promised Victory / Avalon',
    tier: 'Supreme',
    stats: {
      power: 93,
      agility: 91,
      battleIq: 93,
      durability: 92,
      endurance: 95,
      specialAbility: 97,
    },
    bio: 'King of Knights summoned as a Servant. Wields the holy sword of light Excalibur and the invincible conceptual barrier sheath Avalon, granting true invulnerability.',
    tags: ['Heroic Spirit', 'Excalibur', 'Avalon', 'King of Knights']
  },
  {
    id: 'light',
    name: 'Light Yagami (Kira)',
    anime: 'Death Note',
    avatar:'/avatars/light.png',
    themeColor: '#475569', // Dark Judiciary Slate
    accentColor: '#dc2626', // Shinigami Red
    quote: "I am the God of the new world!",
    signatureMove: 'Death Note Name Execution (Shinigami Eyes Curse)',
    tier: 'Special Grade',
    stats: {
      power: 60,
      agility: 68,
      battleIq: 100,
      durability: 65,
      endurance: 78,
      specialAbility: 99,
    },
    bio: 'High-IQ genius who acquired Ryuk\'s Death Note. Can end any opponent simply by writing their name while visualizing their face, controlling circumstances of death.',
    tags: ['Kira', 'Death Note', 'Shinigami', 'Psychological Warfare']
  },
  {
    id: 'shinji',
    name: 'Shinji Ikari (Evangelion Unit-01)',
    anime: 'Neon Genesis Evangelion',
    avatar:'/avatars/shinji.png',
    themeColor: '#84cc16', // EVA-01 Lime
    accentColor: '#7c3aed', // EVA Purple
    quote: "I mustn't run away. I mustn't run away. I mustn't run away!",
    signatureMove: 'Absolute Terror (A.T.) Field & Awakening Berserk',
    tier: 'Supreme',
    stats: {
      power: 94,
      agility: 86,
      battleIq: 82,
      durability: 96,
      endurance: 90,
      specialAbility: 97,
    },
    bio: 'Third Children pilot of synthetic humanoid biomechanical EVA Unit-01. Generates an impenetrable Absolute Terror (A.T.) Field that rejects all external reality and weapons.',
    tags: ['EVA-01', 'A.T. Field', 'Berserk', 'Third Impact']
  }
];

export const STAT_METADATA = [
  {
    key: 'power' as const,
    label: 'Power',
    shortDesc: 'Physical force, energy output & destructive scale',
    icon: 'Swords'
  },
  {
    key: 'agility' as const,
    label: 'Agility',
    shortDesc: 'Movement speed, reaction time & evasion reflexes',
    icon: 'Zap'
  },
  {
    key: 'battleIq' as const,
    label: 'Battle IQ',
    shortDesc: 'Combat strategy, analytical mind & tactics',
    icon: 'Brain'
  },
  {
    key: 'durability' as const,
    label: 'Durability',
    shortDesc: 'Armor, physical resilience & defense shielding',
    icon: 'Shield'
  },
  {
    key: 'endurance' as const,
    label: 'Endurance',
    shortDesc: 'Stamina pool, pain threshold & grit over time',
    icon: 'HeartPulse'
  },
  {
    key: 'specialAbility' as const,
    label: 'Special Ability',
    shortDesc: 'Hax, domain/divine techniques & signature powers',
    icon: 'Flame'
  }
];
