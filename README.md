# CharaStat — Anime Universe Battle Simulator

Cross-universe battle simulator pitting main characters from 35 iconic anime series against each other using hardcoded combat stats, round-by-round narration, and a retro fighting-game UI.

## Features

- **35 fighters** (`src/data/characters.ts`, avatars in `public/avatars/`): Goku, Saitama, Naruto, Luffy, Ichigo, Gojo, Eren, Jinwoo, Rimuru, Deku, Tanjiro, and 24 more.
- **3 views** (`src/App.tsx`):
  - `BattleArena` — default fighting-game view with fighter cards + animated fight stage.
  - `StatComparisonMatrix` — per-stat breakdown with commentary.
  - `CharacterRoster` — full searchable roster, assign to P1/P2.
- **Deterministic battle engine** (`src/utils/battleEngine.ts` → `computeBattleResult(p1, p2)`):
  - 6 rounds, one per stat: Power, Agility, Battle IQ, Durability, Endurance, Special Ability.
  - Round winner = higher stat. Overall winner = most rounds won, tiebreak = total stat sum.
  - Generates verdict title/summary, decisive factor, and per-round narration.
- **Iconic Duels presets**: Goku vs Saitama, Naruto vs Luffy, Gojo vs Rimuru, etc., plus random matchup / swap fighters.
- **Pixel mode (default on)**: procedural retro sprites + special-move FX (`src/data/pixelSprites.ts`, `PixelFighter.tsx`).
- **Zero-asset retro sound**: Web Audio API synth for select/clash/hit/beam/KO/victory (`src/utils/soundEffects.ts`), toggleable in header.
- **Flair**: `canvas-confetti` KO celebration, `motion` animations, `lucide-react` icons.

## Tech Stack

React 19 + TypeScript + Vite 6 + Tailwind CSS 4 (`@tailwindcss/vite`), `motion`, `lucide-react`, `canvas-confetti`. Fonts: Teko / Plus Jakarta Sans via Google Fonts (`index.html`).

## Getting Started

```bash
npm install   # or: bun install
npm run dev   # vite --port=3000 --host=0.0.0.0
npm run build
npm run preview
npm run lint  # tsc --noEmit
```

No API keys required — all stats and avatars are local/hardcoded. `.env.example` (`GEMINI_API_KEY`, `APP_URL`) is legacy AI Studio scaffolding and unused by the app.

## Project Structure

```
index.html                  # title/meta/fonts, #root mount
public/avatars/             # 35 local fighter images
avatars.json                # Kitsu source URLs for avatars (reference only)
src/main.tsx                # React root
src/App.tsx                 # P1/P2 state, tabs, random/swap/preset logic
src/types.ts                # Character, CharacterStats, BattleResult, etc.
src/data/characters.ts      # ANIME_CHARACTERS + STAT_METADATA
src/data/pixelSprites.ts    # PIXEL_SPRITES pixel-art configs
src/utils/battleEngine.ts   # computeBattleResult + narration
src/utils/soundEffects.ts   # SoundManager (Web Audio synth)
src/components/             # Header, BattleArena, FighterCard, FightAnimationStage,
                            # PixelFighter, StatComparisonMatrix, CharacterRoster,
                            # CharacterSelectModal, CharacterAvatar
```

## Data Model

```ts
// 6 stats, 0–100 scale
stats: { power, agility, battleIq, durability, endurance, specialAbility }
tier: 'Cosmic' | 'God' | 'Supreme' | 'Elite' | 'Special Grade' | 'Superhuman'
```

To add a fighter: append to `ANIME_CHARACTERS` in `src/data/characters.ts`, drop the image in `public/avatars/`, add a `PIXEL_SPRITES` entry in `src/data/pixelSprites.ts`.

## Notes

- Stat values are opinionated/hardcoded for fun — tune them in `characters.ts`.
- Battle logic has no RNG; same matchup always yields the same result.
