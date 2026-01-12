
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CameraViewProps {
  onCapture: (base64Image: string) => void;
  isProcessing: boolean;
  liveMode: boolean;
  arOverlay: string | null;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, isProcessing, liveMode, arOverlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Camera access denied or not available. Please check permissions.");
        console.error("Camera error:", err);
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Periodic capture for Live Mode
  useEffect(() => {
    if (liveMode && !isProcessing) {
      const timer = setTimeout(() => {
        handleCapture();
      }, 4000); // Sample every 4 seconds for "live" updates
      return () => clearTimeout(timer);
    }
  }, [liveMode, isProcessing]);

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Data = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
      onCapture(base64Data);
    }
  }, [onCapture, isProcessing]);

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-center p-8 rounded-[40px] border-2 border-dashed border-slate-700">
        <i className="fas fa-video-slash text-4xl mb-4 text-slate-500"></i>
        <p className="text-slate-300">{error}</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full rounded-[40px] overflow-hidden bg-black shadow-2xl transition-all duration-1000 border-2 ${liveMode ? 'border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'border-white/10'} group`}>
      {/* 1. Live Camera Layer */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover scale-x-[-1]"
      />
      
      {/* 2. AR Overlay Layer (The Generative Result) */}
      {arOverlay && (
        <div 
          className="absolute inset-0 z-10 animate-in fade-in duration-1000"
          style={{ transition: 'opacity 1s ease-in-out' }}
        >
          <img src={arOverlay} className="w-full h-full object-cover" alt="AR Overlay" />
          {/* Subtle blend edges */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
        </div>
      )}
      
      <canvas ref={canvasRef} className="hidden" />

      {/* Pulsating Live Border (Inner) */}
      {liveMode && (
        <div className="absolute inset-0 z-10 pointer-events-none rounded-[40px] border-[4px] border-indigo-500/20 animate-pulse"></div>
      )}

      {/* 3. Interface Overlays */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Mirror Mode Guide */}
        {!isProcessing && !arOverlay && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] border-2 border-dashed border-white/10 rounded-[30px] flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">Studio Frame</span>
            </div>
          </div>
        )}

        {/* Scanline Animation during processing */}
        {isProcessing && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_30px_rgba(99,102,241,1)] animate-[scan_2.5s_infinite]"></div>
          </div>
        )}
      </div>
      
      {/* Status Badges */}
      <div className="absolute top-8 left-8 flex flex-col space-y-2 z-30">
        <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/10 shadow-xl">
          <div className={`relative flex items-center justify-center ${liveMode ? 'w-3 h-3' : 'w-2 h-2'}`}>
            <div className={`w-full h-full rounded-full ${liveMode ? 'bg-indigo-500 animate-ping absolute opacity-75' : 'bg-red-500'}`}></div>
            <div className={`w-2 h-2 rounded-full relative ${liveMode ? 'bg-indigo-500' : 'bg-red-500'}`}></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">
              {liveMode ? 'Live Mirror' : 'Static View'}
            </span>
            {liveMode && <span className="text-[7px] text-indigo-300 font-bold uppercase tracking-[0.2em] mt-0.5 animate-pulse">Neural Sync Active</span>}
          </div>
        </div>
        {isProcessing && (
          <div className="bg-white px-4 py-2 rounded-2xl flex items-center space-x-2 animate-bounce shadow-2xl">
            <i className="fas fa-wand-magic-sparkles text-[10px] text-indigo-600"></i>
            <span className="text-[9px] font-black uppercase text-indigo-900 tracking-widest">Generating Look...</span>
          </div>
        )}
      </div>

      {/* Controls */}
      {!liveMode && !isProcessing && (
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center space-y-4 z-30">
          <button
            onClick={handleCapture}
            className="flex items-center justify-center w-24 h-24 rounded-full bg-white text-slate-950 shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-90 transition-all duration-300 group"
          >
            <div className="w-20 h-20 rounded-full border-2 border-slate-950 flex items-center justify-center">
              <i className="fas fa-camera text-3xl"></i>
            </div>
          </button>
          <p className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">Capture Look</p>
        </div>
      )}

      {liveMode && !arOverlay && !isProcessing && (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center z-30">
           <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center space-x-3">
              <i className="fas fa-sync fa-spin text-indigo-400 text-xs"></i>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Analyzing Fit...</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default CameraView;
