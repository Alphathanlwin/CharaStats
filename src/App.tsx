/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { BattleArena } from './components/BattleArena';
import { StatComparisonMatrix } from './components/StatComparisonMatrix';
import { CharacterRoster } from './components/CharacterRoster';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { ANIME_CHARACTERS } from './data/characters';
import { Character } from './types';
import { computeBattleResult } from './utils/battleEngine';
import { soundManager } from './utils/soundEffects';
import { Sparkles, Swords } from 'lucide-react';

export default function App() {
  // Default match-up: Son Goku vs Monkey D. Luffy (or Saitama)
  const [p1, setP1] = useState<Character>(
    () => ANIME_CHARACTERS.find((c) => c.id === 'goku') || ANIME_CHARACTERS[0]
  );
  const [p2, setP2] = useState<Character>(
    () => ANIME_CHARACTERS.find((c) => c.id === 'luffy') || ANIME_CHARACTERS[1]
  );

  const [activeTab, setActiveTab] = useState<'arena' | 'matrix' | 'roster'>('arena');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modal selector state
  const [selectModalState, setSelectModalState] = useState<{
    isOpen: boolean;
    target: 'p1' | 'p2';
  }>({
    isOpen: false,
    target: 'p1',
  });

  // Calculate battle outcome based on the 6 hardcoded stats
  const battleResult = useMemo(() => {
    return computeBattleResult(p1, p2);
  }, [p1, p2]);

  // Quick random matchups
  const handleRandomMatchup = () => {
    const p1Idx = Math.floor(Math.random() * ANIME_CHARACTERS.length);
    let p2Idx = Math.floor(Math.random() * ANIME_CHARACTERS.length);
    while (p2Idx === p1Idx) {
      p2Idx = Math.floor(Math.random() * ANIME_CHARACTERS.length);
    }
    setP1(ANIME_CHARACTERS[p1Idx]);
    setP2(ANIME_CHARACTERS[p2Idx]);
  };

  const handleRandomP1 = () => {
    const available = ANIME_CHARACTERS.filter((c) => c.id !== p2.id);
    const chosen = available[Math.floor(Math.random() * available.length)];
    if (chosen) setP1(chosen);
  };

  const handleRandomP2 = () => {
    const available = ANIME_CHARACTERS.filter((c) => c.id !== p1.id);
    const chosen = available[Math.floor(Math.random() * available.length)];
    if (chosen) setP2(chosen);
  };

  const handleSwapFighters = () => {
    const temp = p1;
    setP1(p2);
    setP2(temp);
  };

  const handleSetPresetMatch = (id1: string, id2: string) => {
    const char1 = ANIME_CHARACTERS.find((c) => c.id === id1);
    const char2 = ANIME_CHARACTERS.find((c) => c.id === id2);
    if (char1 && char2) {
      soundManager.playSelect();
      setP1(char1);
      setP2(char2);
      setActiveTab('arena');
    }
  };

  // Popular dream match presets
  const dreamMatches = [
    { title: 'Goku vs Saitama', id1: 'goku', id2: 'saitama' },
    { title: 'Naruto vs Luffy', id1: 'naruto', id2: 'luffy' },
    { title: 'Gojo vs Rimuru', id1: 'gojo', id2: 'rimuru' },
    { title: 'Ichigo vs Jinwoo', id1: 'ichigo', id2: 'jinwoo' },
    { title: 'Eren vs Simon', id1: 'eren', id2: 'simon' },
    { title: 'Alucard vs Jotaro', id1: 'alucard', id2: 'jotaro' },
    { title: 'Guts vs Thorfinn', id1: 'guts', id2: 'thorfinn' },
    { title: 'Deku vs Tanjiro', id1: 'deku', id2: 'tanjiro' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRandomMatchup={handleRandomMatchup}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Quick Iconic Preset Matchup Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <div className="flex items-center gap-1 text-amber-400 font-bold uppercase tracking-wider text-[11px] shrink-0">
            <Sparkles className="w-3.5 h-3.5" /> Iconic Duels:
          </div>
          {dreamMatches.map((dm) => (
            <button
              key={dm.title}
              onClick={() => handleSetPresetMatch(dm.id1, dm.id2)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 font-medium text-xs flex items-center gap-1"
            >
              <Swords className="w-3 h-3 text-rose-400" />
              <span>{dm.title}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Battle Arena (Default fighting game view) */}
        {activeTab === 'arena' && (
          <BattleArena
            p1={p1}
            p2={p2}
            result={battleResult}
            onChangeP1={() => setSelectModalState({ isOpen: true, target: 'p1' })}
            onChangeP2={() => setSelectModalState({ isOpen: true, target: 'p2' })}
            onRandomP1={handleRandomP1}
            onRandomP2={handleRandomP2}
            onSwapFighters={handleSwapFighters}
          />
        )}

        {/* Tab 2: Stat Matrix Breakdown */}
        {activeTab === 'matrix' && (
          <StatComparisonMatrix p1={p1} p2={p2} result={battleResult} />
        )}

        {/* Tab 3: Character Roster (35 Anime Series) */}
        {activeTab === 'roster' && (
          <CharacterRoster
            currentP1={p1}
            currentP2={p2}
            onSelectP1={(char) => {
              setP1(char);
              setActiveTab('arena');
            }}
            onSelectP2={(char) => {
              setP2(char);
              setActiveTab('arena');
            }}
          />
        )}
      </main>

      {/* Character Selection Modal */}
      <CharacterSelectModal
        isOpen={selectModalState.isOpen}
        title={
          selectModalState.target === 'p1'
            ? 'Choose Your Character (Player 1)'
            : 'Choose Opponent Character (Player 2)'
        }
        selectedCharacterId={
          selectModalState.target === 'p1' ? p1.id : p2.id
        }
        opponentCharacterId={
          selectModalState.target === 'p1' ? p2.id : p1.id
        }
        onClose={() => setSelectModalState({ isOpen: false, target: 'p1' })}
        onSelect={(selectedChar) => {
          if (selectModalState.target === 'p1') {
            setP1(selectedChar);
          } else {
            setP2(selectedChar);
          }
        }}
      />

      {/* App Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CharaStat Fighting Game Simulator • 35 Iconic Anime Universes</span>
          <span className="font-mono text-[11px]">
            Stats: Power • Agility • Battle IQ • Durability • Endurance • Special Ability
          </span>
        </div>
      </footer>
    </div>
  );
}
