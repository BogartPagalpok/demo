import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { Shoe } from '../data/shoes';

interface VideoModalProps {
  open: boolean;
  shoe: Shoe;
  onClose: () => void;
}

export default function VideoModal({ open, shoe, onClose }: VideoModalProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { theme } = shoe;

  useEffect(() => {
    if (!open) {
      setPlaying(false);
      setHasPlayed(false);
      setProgress(0);
      setElapsed(0);
    }
  }, [open]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.play().catch(() => setPlaying(false));
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  const handlePlayPause = () => {
    if (!hasPlayed) {
      setHasPlayed(true);
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setElapsed(Math.floor(current));
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(Math.floor(videoRef.current.duration));
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    if (!hasPlayed) setHasPlayed(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setElapsed(Math.floor(newTime));
    setProgress(ratio * 100);
    if (!playing) setPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          border: `1px solid rgba(${theme.glowRgb}, 0.2)`,
          boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 80px rgba(${theme.glowRgb}, 0.12)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Canvas Area */}
        <div
          className="relative aspect-video flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.primary} 0%, #000 50%, ${theme.secondary} 100%)`,
          }}
        >
          {/* Ambient Light Simulation */}
          <div
            className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{ background: `radial-gradient(circle, rgba(${theme.glowRgb}, 0.2) 0%, transparent 70%)` }}
          />
          <div
            className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: `radial-gradient(circle, rgba(${theme.glowRgb}, 0.15) 0%, transparent 70%)` }}
          />

          {/* Video Stream Node Layer */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
            <video
              ref={videoRef}
              src="https://ayfbrkudeqvvnhchmxas.supabase.co/storage/v1/object/public/media/rick.mp4"
              className="w-full h-full aspect-video rounded-xl shadow-2xl object-cover transition-opacity duration-500"
              style={{ opacity: hasPlayed ? 1 : 0 }}
              muted={muted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setPlaying(false)}
            />
          </div>

          {/* Fake Thumbnail Overlay Layout Layer */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-20 transition-all duration-500 bg-black/40 pointer-events-none"
            style={{ 
              opacity: hasPlayed ? 0 : 1,
              transform: hasPlayed ? 'scale(1.05)' : 'scale(1)',
              visibility: hasPlayed ? 'hidden' : 'visible'
            }}
          >
            <img
              src={shoe.image}
              alt={shoe.name}
              className="w-48 md:w-64 object-contain"
              style={{
                filter: `drop-shadow(0 16px 40px rgba(${theme.glowRgb}, 0.5))`,
                transform: 'rotate(-10deg)',
              }}
            />
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-black tracking-[0.3em] uppercase text-white/40">Campaign Film</p>
              <p className="text-2xl font-black uppercase text-white tracking-wide">{shoe.name}</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white z-30"
          >
            <X size={18} />
          </button>
        </div>

        {/* Controls Bar */}
        <div
          className="px-6 py-4 flex flex-col gap-3 z-20 relative"
          style={{ background: 'rgba(8,8,16,0.97)', borderTop: `1px solid rgba(${theme.glowRgb}, 0.1)` }}
        >
          {/* Progress Bar */}
          <div className="relative group cursor-pointer" onClick={handleProgressBarClick}>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(to right, ${theme.accent}, ${theme.accent})`,
                  boxShadow: `0 0 8px rgba(${theme.glowRgb}, 0.6)`,
                }}
              />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full -mt-px transition-all duration-300"
              style={{
                left: `${progress}%`,
                transform: `translateX(-50%) translateY(-50%)`,
                backgroundColor: theme.accent,
                boxShadow: `0 0 8px rgba(${theme.glowRgb}, 0.8)`,
              }}
            />
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 0 16px rgba(${theme.glowRgb}, 0.4)`,
                }}
              >
                {playing ? (
                  <Pause size={12} className="text-white" fill="white" />
                ) : (
                  <Play size={12} className="ml-0.5 text-white" fill="white" />
                )}
              </button>

              {/* Mute */}
              <button
                onClick={() => setMuted(!muted)}
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Time */}
              <span className="text-[10px] font-mono text-white/30">
                {formatTime(elapsed)} / {formatTime(duration || 147)}
              </span>
            </div>

            {/* ILLUSIVE STUDIO Footer Brand Signature Lock */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end justify-center">
                <span className="text-[8px] font-black tracking-[0.4em] text-white/50 uppercase leading-none">
                  ILLUSIVE STUDIO
                </span>
                <span className="text-[6px] font-bold tracking-[0.2em] text-white/20 uppercase mt-0.5">
                  CONCEPT DESIGN LAB
                </span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/20">4K · HDR</span>
                <button 
                  onClick={toggleFullscreen}
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}