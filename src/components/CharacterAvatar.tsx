import { useState, useEffect } from 'react';
import { Character } from '../types';
import { PixelFighter } from './PixelFighter';

interface CharacterAvatarProps {
  character: Character;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  pixelMode?: boolean;
  className?: string;
}

export function CharacterAvatar({
  character,
  size = 'md',
  showGlow = false,
  pixelMode = false,
  className = '',
}: CharacterAvatarProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [character.id, character.avatar]);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 text-2xl',
    xl: 'w-36 h-36 md:w-44 md:h-44 text-4xl',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden shrink-0 border-2 transition-transform duration-300 ${
        sizeClasses[size]
      } ${className}`}
      style={{
        borderColor: character.themeColor,
        boxShadow: showGlow
          ? `0 0 25px ${character.themeColor}55, inset 0 0 15px ${character.themeColor}33`
          : undefined,
      }}
    >
      {pixelMode ? (
        <div className="w-full h-full flex items-center justify-center bg-slate-900/95 p-1">
          <PixelFighter
            character={character}
            size={size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm'}
            showAura={showGlow}
          />
        </div>
      ) : !imageError && character.avatar ? (
        <img
          src={character.avatar}
          alt={character.name}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center font-bold tracking-wider"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${character.themeColor}, #090d16)`,
            color: '#ffffff',
          }}
        >
          <span>{getInitials(character.name)}</span>
          {size === 'xl' && (
            <span className="text-[10px] tracking-widest uppercase opacity-75 font-mono mt-1">
              {character.anime.split(':')[0].slice(0, 10)}
            </span>
          )}
        </div>
      )}

      {/* Decorative corner anime border marker */}
      <div
        className="absolute top-0 right-0 w-2.5 h-2.5"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${character.themeColor} 50%)`,
        }}
      />
    </div>
  );
}

