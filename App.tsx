
import React, { useState, useCallback, useEffect } from 'react';
import CameraView from './components/CameraView';
import OutfitSelector from './components/OutfitSelector';
import { Outfit, TryOnResult } from './types';
import { OUTFITS } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit>(OUTFITS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [results, setResults] = useState<TryOnResult[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState<number | null>(null);

  // When liveMode is toggled off, clear the active overlay
  useEffect(() => {
    if (!liveMode) {
      setActiveResultIndex(null);
    }
  }, [liveMode]);

  const handleCapture = useCallback(async (base64Image: string) => {
    setIsProcessing(true);
    const resultUrl = await geminiService.tryOnOutfit(base64Image, selectedOutfit.prompt);
    
    if (resultUrl) {
      const newResult: TryOnResult = {
        imageUrl: resultUrl,
        outfitId: selectedOutfit.id,
        timestamp: Date.now()
      };
      setResults(prev => [newResult, ...prev.slice(0, 19)]); // Keep history to 20
      
      // If we are in live mode, automatically show the result as an overlay
      setActiveResultIndex(0);
    } else {
      if (!liveMode) alert("Style generation failed. Try posing clearly in good light.");
    }
    setIsProcessing(false);
  }, [selectedOutfit, liveMode]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Futuristic Header */}
      <header className="h-24 flex items-center justify-between px-10 border-b border-white/5 bg-slate-950/80 backdrop-blur-3xl sticky top-0 z-50">
        <div className="flex items-center space-x-5">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[18px] flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)] rotate-3">
            <i className="fas fa-magic text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">
              SENSE<span className="text-indigo-500">STYLE</span>.
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">AR Generative Studio</span>
              <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.4em]">V2.0</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          {/* Live Filter Toggle */}
          <div className="flex items-center space-x-4 bg-slate-900/50 border border-white/5 px-5 py-2.5 rounded-2xl">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${liveMode ? 'text-indigo-400' : 'text-slate-500'}`}>
              {liveMode ? 'Live Mode On' : 'Live Mode Off'}
            </span>
            <button 
              onClick={() => setLiveMode(!liveMode)}
              className={`w-12 h-6 rounded-full p-1 transition-all duration-300 flex items-center ${liveMode ? 'bg-indigo-600' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-lg transition-all duration-300 ${liveMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="h-10 w-px bg-white/10 hidden xl:block"></div>
          
          <div className="hidden xl:flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Neural Latency</span>
            <span className="text-xs font-mono font-bold text-green-400">0.82 SEC</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col xl:flex-row">
        {/* Left Side: Wardrobe */}
        <aside className="w-full xl:w-[450px] border-r border-white/5 bg-slate-950 p-10 flex flex-col space-y-12 order-2 xl:order-1 overflow-y-auto custom-scrollbar">
          <OutfitSelector 
            selectedId={selectedOutfit.id} 
            onSelect={(outfit) => {
              setSelectedOutfit(outfit);
              // When changing outfits, clear the current overlay so the user sees the scan happen again
              setActiveResultIndex(null);
            }} 
          />
          
          <div className="space-y-6">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Mirror Settings</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-white/5 rounded-3xl hover:bg-slate-800 transition-all group">
                   <i className="fas fa-lightbulb text-indigo-400 mb-3 group-hover:scale-110 transition-transform"></i>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Auto-Light</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-white/5 rounded-3xl hover:bg-slate-800 transition-all group">
                   <i className="fas fa-expand text-indigo-400 mb-3 group-hover:scale-110 transition-transform"></i>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Fit-Check</span>
                </button>
             </div>
          </div>
        </aside>

        {/* Center: Live AR View */}
        <section className="flex-grow bg-slate-950 p-6 lg:p-14 flex flex-col items-center justify-center order-1 xl:order-2 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="w-full max-w-5xl aspect-[4/3] relative">
            <CameraView 
              onCapture={handleCapture} 
              isProcessing={isProcessing} 
              liveMode={liveMode}
              arOverlay={activeResultIndex !== null ? results[activeResultIndex].imageUrl : null}
            />
          </div>

          {/* Quick Share / Actions (Only when overlay is present) */}
          {activeResultIndex !== null && (
            <div className="mt-8 flex items-center space-x-6 animate-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={() => setActiveResultIndex(null)}
                className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all"
              >
                Clear Lens
              </button>
              <button className="px-10 py-3 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105 transition-all">
                Save Capture
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Grid Overlay for subtle tech look */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[99] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    </div>
  );
};

export default App;
