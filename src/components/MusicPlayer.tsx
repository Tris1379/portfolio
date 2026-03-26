"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX, Leaf, Music } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MusicPlayer() {
  const tracks = siteConfig.music.tracks;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // Sync audio element with state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Progress tracking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [tracks.length]);

  // Auto-play when track changes if currently playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentTrack, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (isMuted) setIsMuted(false);
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, isMuted]);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      audio.currentTime = ratio * audio.duration;
    },
    []
  );

  return (
    <>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        preload="metadata"
      />

      {/* Collapsed FAB */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="glass fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Open music player"
        >
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-5">
              <div className="waveform-bar" />
              <div className="waveform-bar" />
              <div className="waveform-bar" />
              <div className="waveform-bar" />
              <div className="waveform-bar" />
            </div>
          ) : (
            <Music className="w-5 h-5 text-(--color-text-secondary)" />
          )}
        </button>
      )}

      {/* Expanded panel */}
      {expanded && (
        <div className="glass fixed bottom-5 right-5 z-50 w-64 p-4 rounded-xl transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Leaf
                className={`w-4 h-4 text-(--color-primary) shrink-0 ${
                  isPlaying ? "spin-leaf" : ""
                }`}
              />
              <span className="text-xs text-(--color-text-secondary) truncate">
                {tracks[currentTrack].title}
              </span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-(--color-text-secondary) hover:text-(--color-text) transition-colors ml-2 shrink-0 cursor-pointer"
              aria-label="Minimize player"
            >
              <Music className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="h-1 w-full rounded-full bg-(--color-text)/10 mb-4 cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div
              className="h-full rounded-full bg-(--color-primary) transition-[width] duration-200 group-hover:opacity-80"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-(--color-primary)/15 hover:bg-(--color-primary)/25 transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-(--color-primary) fill-(--color-primary)" />
                ) : (
                  <Play className="w-4 h-4 text-(--color-primary) fill-(--color-primary) ml-0.5" />
                )}
              </button>
              <button
                onClick={nextTrack}
                className="w-7 h-7 rounded-full flex items-center justify-center text-(--color-text-secondary) hover:text-(--color-text) transition-colors cursor-pointer"
                aria-label="Next track"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="text-(--color-text-secondary) hover:text-(--color-text) transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 h-1 rounded-full appearance-none cursor-pointer accent-(--color-primary) bg-(--color-text)/10"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
