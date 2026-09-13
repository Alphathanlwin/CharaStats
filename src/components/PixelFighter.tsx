import React from 'react';
import { Character } from '../types';
import { PIXEL_SPRITES, PixelSpriteConfig } from '../data/pixelSprites';

export type FighterAnimState =
  | 'idle'
  | 'charge'
  | 'dash'
  | 'attack'
  | 'special'
  | 'hit'
  | 'block'
  | 'victory'
  | 'ko';

interface PixelFighterProps {
  character: Character;
  state?: FighterAnimState;
  facing?: 'right' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showAura?: boolean;
  className?: string;
}

export function PixelFighter({
  character,
  state = 'idle',
  facing = 'right',
  size = 'md',
  showAura = false,
  className = '',
}: PixelFighterProps) {
  const config: PixelSpriteConfig = PIXEL_SPRITES[character.id] || {
    hairColor: '#1e293b',
    hairStyle: 'spiky',
    skinTone: '#fed7aa',
    outfitColor: character.themeColor || '#ef4444',
    outfitAccent: character.accentColor || '#38bdf8',
    pantsColor: '#0f172a',
    weapon: 'fists',
    auraColor: character.themeColor || '#f59e0b',
    specialMoveName: character.signatureMove,
    specialFxType: 'generic_blast',
  };

  const scaleMap = {
    sm: 'w-16 h-20',
    md: 'w-24 h-28',
    lg: 'w-36 h-44',
    xl: 'w-48 h-56',
  };

  const isFlipped = facing === 'left';

  // Animation CSS classes
  const getAnimationClass = () => {
    switch (state) {
      case 'idle':
        return 'animate-[bounce_1.4s_infinite_ease-in-out]';
      case 'charge':
        return 'animate-pulse scale-95 origin-bottom';
      case 'dash':
        return isFlipped ? '-translate-x-3 duration-200' : 'translate-x-3 duration-200';
      case 'attack':
        return isFlipped ? '-translate-x-6 duration-150' : 'translate-x-6 duration-150';
      case 'special':
        return 'scale-110 duration-200';
      case 'hit':
        return isFlipped ? 'translate-x-4 rotate-6' : '-translate-x-4 -rotate-6';
      case 'block':
        return 'scale-95';
      case 'victory':
        return 'animate-[bounce_0.8s_infinite]';
      case 'ko':
        return isFlipped ? 'rotate-90 translate-y-6 opacity-80' : '-rotate-90 translate-y-6 opacity-80';
      default:
        return '';
    }
  };

  return (
    <div
      className={`relative select-none flex items-center justify-center transition-transform ${
        scaleMap[size]
      } ${getAnimationClass()} ${className}`}
      style={{
        transform: `${isFlipped ? 'scaleX(-1)' : 'scaleX(1)'} ${
          state === 'hit' ? (isFlipped ? 'translateX(12px) rotate(6deg)' : 'translateX(-12px) rotate(-6deg)') : ''
        } ${state === 'ko' ? (isFlipped ? 'rotate(90deg) translateY(14px)' : 'rotate(-90deg) translateY(14px)') : ''}`,
      }}
    >
      {/* Energy Aura Background */}
      {(showAura || state === 'charge' || state === 'special' || state === 'attack') && (
        <div
          className="absolute inset-0 -m-4 rounded-full pointer-events-none blur-md opacity-75 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${config.auraColor} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Block Barrier Effect */}
      {state === 'block' && (
        <div
          className="absolute -right-2 top-2 bottom-2 w-4 rounded-full border-2 border-cyan-400 bg-cyan-400/30 animate-pulse pointer-events-none shadow-[0_0_12px_#38bdf8]"
        />
      )}

      {/* Hit Spark Effect */}
      {state === 'hit' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="w-12 h-12 bg-white rounded-full animate-ping opacity-90 blur-sm" />
          <div className="absolute text-yellow-300 font-combat text-xl font-black drop-shadow-[0_0_8px_#ef4444]">
            💥
          </div>
        </div>
      )}

      {/* Retro Pixel Art Fighter SVG (32x36 Virtual Canvas with Crisp Pixel Edges) */}
      <svg
        viewBox="0 0 32 36"
        className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
        shapeRendering="crispEdges"
      >
        {/* Cape Layer (Behind character) */}
        {config.capeColor && (
          <g fill={config.capeColor}>
            <rect x="7" y="16" width="3" height="12" />
            <rect x="6" y="18" width="4" height="11" />
            <rect x="5" y="22" width="4" height="8" />
          </g>
        )}

        {/* Shadow Beneath Fighter */}
        <ellipse cx="16" cy="34" rx="10" ry="2" fill="#020617" opacity="0.6" />

        {/* Legs / Pants */}
        <g fill={config.pantsColor}>
          {/* Left Leg */}
          <rect x="11" y="24" width="4" height="8" />
          {/* Right Leg */}
          <rect x="17" y="24" width="4" height="8" />
        </g>

        {/* Shoes / Boots */}
        <g fill={config.outfitAccent || '#0f172a'}>
          <rect x="10" y="32" width="5" height="2" />
          <rect x="17" y="32" width="5" height="2" />
        </g>

        {/* Torso / Clothes */}
        <g fill={config.outfitColor}>
          <rect x="10" y="15" width="12" height="9" />
        </g>

        {/* Outfit Trim / Belts / Details */}
        <g fill={config.outfitAccent}>
          <rect x="10" y="22" width="12" height="2" />
          {/* Chest detail / tie / collar */}
          <rect x="15" y="15" width="2" height="5" />
        </g>

        {/* Arms and Hands */}
        {state === 'attack' || state === 'special' ? (
          // Extended Attack Arm Forward
          <g>
            {/* Back Arm */}
            <rect x="7" y="16" width="3" height="6" fill={config.outfitColor} />
            <rect x="7" y="22" width="3" height="3" fill={config.skinTone} />

            {/* Front Thrust Arm */}
            <rect x="18" y="16" width="9" height="4" fill={config.outfitColor} />
            <rect x="27" y="15" width="4" height="6" fill={config.skinTone} />
          </g>
        ) : state === 'victory' ? (
          // Victory Raised Fist
          <g>
            <rect x="7" y="16" width="3" height="6" fill={config.outfitColor} />
            <rect x="7" y="22" width="3" height="3" fill={config.skinTone} />

            {/* Raised right arm */}
            <rect x="20" y="10" width="4" height="8" fill={config.outfitColor} />
            <rect x="20" y="6" width="4" height="4" fill={config.skinTone} />
          </g>
        ) : (
          // Normal Stance Arms
          <g>
            <rect x="7" y="16" width="3" height="6" fill={config.outfitColor} />
            <rect x="7" y="22" width="3" height="3" fill={config.skinTone} />

            <rect x="22" y="16" width="3" height="6" fill={config.outfitColor} />
            <rect x="22" y="22" width="3" height="3" fill={config.skinTone} />
          </g>
        )}

        {/* Head / Face */}
        <g fill={config.skinTone}>
          <rect x="11" y="8" width="10" height="8" />
          <rect x="12" y="6" width="8" height="2" />
        </g>

        {/* Eyes & Expression */}
        {state === 'hit' || state === 'ko' ? (
          // KO / Hurt X Eyes
          <g stroke="#0f172a" strokeWidth="1">
            <line x1="14" y1="10" x2="16" y2="12" />
            <line x1="16" y1="10" x2="14" y2="12" />
            <line x1="18" y1="10" x2="20" y2="12" />
            <line x1="20" y1="10" x2="18" y2="12" />
          </g>
        ) : (
          // Combat Eyes
          <g>
            <rect
              x="15"
              y="10"
              width="2"
              height="2"
              fill={config.eyeGlow || '#09090b'}
            />
            <rect
              x="19"
              y="10"
              width="2"
              height="2"
              fill={config.eyeGlow || '#09090b'}
            />
          </g>
        )}

        {/* Eyebrows / Combat frown */}
        <rect x="14" y="9" width="3" height="1" fill="#09090b" />
        <rect x="19" y="9" width="3" height="1" fill="#09090b" />

        {/* Mouth */}
        {state === 'attack' || state === 'special' ? (
          <rect x="17" y="14" width="3" height="2" fill="#7f1d1d" />
        ) : state === 'victory' ? (
          <rect x="17" y="14" width="3" height="1" fill="#09090b" />
        ) : (
          <rect x="18" y="14" width="2" height="1" fill="#09090b" />
        )}

        {/* Hair Styles */}
        {config.hairStyle !== 'bald' && (
          <g fill={config.hairColor}>
            {/* Top & base hair */}
            <rect x="10" y="5" width="12" height="4" />
            <rect x="9" y="7" width="2" height="4" />
            <rect x="21" y="7" width="2" height="3" />

            {/* Specific Spikes */}
            {config.hairStyle === 'spiky' && (
              <>
                <rect x="8" y="3" width="3" height="3" />
                <rect x="12" y="1" width="4" height="4" />
                <rect x="17" y="2" width="4" height="3" />
                <rect x="22" y="4" width="3" height="3" />
              </>
            )}

            {config.hairStyle === 'wild_tall' && (
              <>
                <rect x="10" y="0" width="12" height="5" />
                <rect x="12" y="-2" width="8" height="3" />
                <rect x="14" y="-4" width="4" height="3" />
              </>
            )}

            {config.hairStyle === 'bowl' && (
              <>
                <rect x="10" y="6" width="12" height="4" />
                <rect x="9" y="8" width="2" height="4" />
                <rect x="21" y="8" width="2" height="4" />
              </>
            )}

            {config.hairStyle === 'ponytail' && (
              <>
                <rect x="6" y="8" width="4" height="10" />
                <rect x="5" y="10" width="2" height="8" />
              </>
            )}

            {config.hairStyle === 'bun' && (
              <>
                <rect x="14" y="2" width="4" height="4" />
                <rect x="15" y="1" width="2" height="2" />
              </>
            )}
          </g>
        )}

        {/* Headgear Accents */}
        {config.headgear === 'straw_hat' && (
          <g>
            <rect x="7" y="5" width="18" height="2" fill="#eab308" />
            <rect x="11" y="2" width="10" height="3" fill="#eab308" />
            <rect x="11" y="5" width="10" height="1" fill="#dc2626" />
          </g>
        )}

        {config.headgear === 'headband' && (
          <g>
            <rect x="11" y="7" width="10" height="2" fill="#1e293b" />
            <rect x="14" y="7" width="4" height="2" fill="#e2e8f0" />
          </g>
        )}

        {config.headgear === 'blindfold' && (
          <rect x="13" y="9" width="9" height="4" fill="#09090b" />
        )}

        {config.headgear === 'cap' && (
          <g>
            <rect x="11" y="4" width="11" height="4" fill="#09090b" />
            <rect x="18" y="7" width="6" height="2" fill="#09090b" />
            <rect x="15" y="5" width="2" height="2" fill="#fbbf24" />
          </g>
        )}

        {config.headgear === 'fedora' && (
          <g>
            <rect x="8" y="5" width="16" height="2" fill="#991b1b" />
            <rect x="11" y="2" width="10" height="3" fill="#991b1b" />
            <rect x="11" y="4" width="10" height="1" fill="#09090b" />
          </g>
        )}

        {config.headgear === 'dog_ears' && (
          <g fill="#f8fafc">
            <polygon points="12,5 10,2 14,2" />
            <polygon points="18,5 20,2 16,2" />
          </g>
        )}

        {config.headgear === 'chainsaw' && (
          <g>
            <rect x="16" y="8" width="14" height="4" fill="#94a3b8" />
            <rect x="16" y="7" width="14" height="1" fill="#f97316" />
            <rect x="16" y="12" width="14" height="1" fill="#f97316" />
          </g>
        )}

        {/* Weapons */}
        {config.weapon === 'katana' && (
          <g>
            {state === 'attack' || state === 'special' ? (
              // Slashing Katana Forward
              <>
                <rect x="29" y="17" width="14" height="2" fill="#e2e8f0" />
                <rect x="27" y="16" width="2" height="4" fill="#eab308" />
                <rect x="25" y="17" width="2" height="2" fill="#18181b" />
              </>
            ) : (
              // Sheathed / Side Katana
              <>
                <rect x="7" y="18" width="2" height="12" fill="#e2e8f0" />
                <rect x="6" y="18" width="4" height="2" fill="#eab308" />
              </>
            )}
          </g>
        )}

        {config.weapon === 'giant_sword' && (
          <g>
            {state === 'attack' || state === 'special' ? (
              // Massive Blade Swing
              <>
                <rect x="28" y="13" width="16" height="8" fill="#475569" />
                <rect x="29" y="14" width="14" height="6" fill="#94a3b8" />
                <rect x="26" y="16" width="3" height="2" fill="#1e293b" />
              </>
            ) : (
              // Huge Sword on Back
              <>
                <rect x="5" y="6" width="5" height="24" fill="#334155" />
                <rect x="6" y="8" width="3" height="20" fill="#94a3b8" />
                <rect x="6" y="4" width="3" height="3" fill="#1e293b" />
              </>
            )}
          </g>
        )}

        {config.weapon === 'daggers' && (
          <g fill="#c084fc">
            <rect x="28" y="17" width="6" height="2" />
            <rect x="6" y="24" width="6" height="2" />
          </g>
        )}

        {config.weapon === 'gun' && (
          <g fill="#334155">
            <rect x="28" y="17" width="6" height="3" />
            <rect x="27" y="19" width="2" height="3" />
          </g>
        )}

        {config.weapon === 'drill' && (
          <g fill="#22c55e">
            <polygon points="28,15 38,18 28,21" />
            <line x1="28" y1="16" x2="34" y2="18" stroke="#ffffff" strokeWidth="1" />
          </g>
        )}

        {config.weapon === 'death_note' && (
          <g fill="#09090b">
            <rect x="24" y="18" width="6" height="8" />
            <rect x="26" y="20" width="3" height="1" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
}
