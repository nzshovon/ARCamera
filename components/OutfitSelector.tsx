
import React, { useState, useMemo } from 'react';
import { Outfit } from '../types';
import { OUTFITS } from '../constants';

interface OutfitSelectorProps {
  selectedId: string;
  onSelect: (outfit: Outfit) => void;
}

const CATEGORIES = ['All', 'Traditional', 'Future', 'Formal', 'Street', 'Casual', 'Fantasy'];

const OutfitSelector: React.FC<OutfitSelectorProps> = ({ selectedId, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredOutfits = useMemo(() => {
    if (activeCategory === 'All') return OUTFITS;
    return OUTFITS.filter(o => o.category === activeCategory);
  }, [activeCategory]);

  const selectedOutfit = useMemo(() => 
    OUTFITS.find(o => o.id === selectedId) || OUTFITS[0], 
    [selectedId]
  );

  return (
    <div className="w-full space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Collection</h3>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
            {filteredOutfits.length} ITEMS
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 space-x-2 custom-scrollbar no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                ${activeCategory === cat 
                  ? 'bg-white text-slate-950 shadow-lg' 
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Selected Outfit Preview */}
      <div className="relative group animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-slate-900/80 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-40 h-56 md:h-auto overflow-hidden relative">
              <img 
                src={selectedOutfit.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={selectedOutfit.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 bg-indigo-500 text-[8px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg">Active</span>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-center">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">
                {selectedOutfit.category}
              </span>
              <h4 className="text-xl font-black text-white mb-2 tracking-tight">
                {selectedOutfit.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {selectedOutfit.description}
              </p>
              <div className="mt-4 flex items-center space-x-2 text-slate-500">
                <i className="fas fa-sparkles text-[10px] text-indigo-500"></i>
                <span className="text-[9px] font-bold uppercase tracking-widest">AI Enhanced Fit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Select Variant</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 overflow-y-auto custom-scrollbar pr-2 max-h-[400px]">
          {filteredOutfits.map((outfit) => (
            <button
              key={outfit.id}
              onClick={() => onSelect(outfit)}
              className={`group relative flex md:flex-row flex-col items-center md:items-start p-3 rounded-2xl transition-all duration-300 border-2 text-left
                ${selectedId === outfit.id 
                  ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                  : 'bg-slate-900/50 border-white/5 hover:border-white/10 hover:bg-slate-800'
                }`}
            >
              <div className="w-full md:w-16 h-28 md:h-16 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 relative">
                <img 
                  src={outfit.thumbnail} 
                  alt={outfit.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${selectedId === outfit.id ? 'scale-110' : 'group-hover:scale-105'}`} 
                />
                <div className={`absolute inset-0 bg-indigo-500/20 transition-opacity duration-300 ${selectedId === outfit.id ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
              
              <div className="md:ml-4 mt-3 md:mt-0 overflow-hidden">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{outfit.category}</span>
                  {selectedId === outfit.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></div>
                  )}
                </div>
                <h4 className={`text-xs font-bold truncate ${selectedId === outfit.id ? 'text-white' : 'text-slate-300'}`}>
                  {outfit.name}
                </h4>
                <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed mt-1 opacity-80">
                  {outfit.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutfitSelector;
