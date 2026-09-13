import { Swords, Volume2, VolumeX, Shuffle, Users, BarChart3 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface HeaderProps {
  activeTab: 'arena' | 'matrix' | 'roster';
  setActiveTab: (tab: 'arena' | 'matrix' | 'roster') => void;
  onRandomMatchup: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export function Header({
  activeTab,
  setActiveTab,
  onRandomMatchup,
  soundEnabled,
  setSoundEnabled,
}: HeaderProps) {
  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
    if (newState) soundManager.playSelect();
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-600/30 border border-rose-400/40">
                <Swords className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-combat text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-200">
                    CHARASTAT
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono tracking-wider">
                    VERSUS
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Cross-Universe Anime Combat • 35 Series • 6 Core Stats
                </p>
              </div>
            </div>

            {/* Mobile Sound & Random Controls */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                id="mobile-sound-toggle"
                onClick={toggleSound}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
              <button
                id="mobile-random-match"
                onClick={() => {
                  soundManager.playSelect();
                  onRandomMatchup();
                }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300"
                title="Random Matchup"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs & Actions */}
          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3">
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                id="tab-arena"
                onClick={() => {
                  soundManager.playSelect();
                  setActiveTab('arena');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'arena'
                    ? 'bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-md shadow-rose-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Swords className="w-3.5 h-3.5" />
                <span>Battle Arena</span>
              </button>

              <button
                id="tab-matrix"
                onClick={() => {
                  soundManager.playSelect();
                  setActiveTab('matrix');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'matrix'
                    ? 'bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-md shadow-rose-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Stat Matrix</span>
              </button>

              <button
                id="tab-roster"
                onClick={() => {
                  soundManager.playSelect();
                  setActiveTab('roster');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'roster'
                    ? 'bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-md shadow-rose-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Roster (35)</span>
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                id="desktop-random-matchup-btn"
                onClick={() => {
                  soundManager.playSelect();
                  onRandomMatchup();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 hover:text-amber-200 transition-colors"
                title="Pick two random fighters"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Random Duel</span>
              </button>

              <button
                id="desktop-sound-toggle-btn"
                onClick={toggleSound}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title={soundEnabled ? 'Mute Arcade Sound Effects' : 'Enable Arcade Sound Effects'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
