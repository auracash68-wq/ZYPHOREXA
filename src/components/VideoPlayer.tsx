/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { VideoItem } from '../types';

interface VideoPlayerProps {
  videos: VideoItem[];
}

export default function VideoPlayer({ videos }: VideoPlayerProps) {
  return (
    <div id="video-showcase-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {videos.map((video, idx) => (
        <VideoCard key={video.id} video={video} index={idx} />
      ))}
    </div>
  );
}

function VideoCard({ video, index }: { key?: string; video: VideoItem; index: number }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parse Video IDs for YouTube and Vimeo if needed
  const getEmbedUrl = () => {
    if (video.type === 'youtube') {
      // Extract video ID if the full URL is provided, otherwise use url directly
      let videoId = video.url;
      if (video.url.includes('v=')) {
        videoId = video.url.split('v=')[1]?.split('&')[0];
      } else if (video.url.includes('youtu.be/')) {
        videoId = video.url.split('youtu.be/')[1]?.split('?')[0];
      } else if (video.url.includes('shorts/')) {
        videoId = video.url.split('shorts/')[1]?.split('?')[0];
      }
      const muteParam = isMuted ? '1' : '0';
      const playParam = isPlaying ? '1' : '0';
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muteParam}&loop=1&playlist=${videoId}&controls=1&enablejsapi=1&playsinline=1`;
    } else if (video.type === 'vimeo') {
      let vimeoId = video.url;
      if (video.url.includes('vimeo.com/')) {
        vimeoId = video.url.split('vimeo.com/')[1]?.split('?')[0];
      }
      const muteParam = isMuted ? '1' : '0';
      const playParam = isPlaying ? '1' : '0';
      return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=${muteParam}&loop=1&autopause=0`;
    }
    return '';
  };

  const togglePlay = () => {
    if (video.type === 'mp4' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (video.type === 'mp4' && videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const triggerFullscreen = () => {
    if (cardRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        cardRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  // Sync state for HTML5 video
  useEffect(() => {
    if (video.type === 'mp4' && videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, video.type]);

  // Adjust aspect ratios dynamically
  const aspectClass = video.aspectRatio === '9:16' 
    ? 'aspect-[9/16]' 
    : video.aspectRatio === '1:1' 
      ? 'aspect-square' 
      : 'aspect-[16/9]';

  // Float offsets for alternating effect
  const floatDelay = index * 0.4;
  const glowTheme = index % 2 === 0 
    ? 'hover:shadow-[#0072FF]/20 group-hover:border-[#0072FF]/50 border-white/5' 
    : 'hover:shadow-[#FF007A]/20 group-hover:border-[#FF007A]/50 border-white/5';

  return (
    <motion.div
      ref={cardRef}
      id={`video-card-${video.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
      animate={{
        y: [0, -8, 0],
      }}
      // Alternating floating motions so they look natural and futuristic
      // @ts-ignore
      transition={{
        y: {
          duration: 4.5 + index,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        }
      }}
      className={`group relative overflow-hidden rounded-2xl glass-panel p-2 flex flex-col justify-between h-full transition-all duration-500 hover:scale-[1.03] ${glowTheme}`}
    >
      {/* Visual Ambient Light Overlay glows */}
      <div className={`absolute -inset-px bg-gradient-to-tr ${
        index % 2 === 0 ? 'from-[#0072FF]/10 to-transparent' : 'from-[#FF007A]/10 to-transparent'
      } rounded-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />

      {/* Decorative ambient corner dot */}
      <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${
        index % 2 === 0 ? 'bg-[#00F0FF]' : 'bg-[#FF007A]'
      } opacity-50 group-hover:scale-150 transition-all`} />

      {/* Media Player wrapper */}
      <div className={`relative w-full rounded-xl overflow-hidden bg-black/40 ${aspectClass}`}>
        {video.type === 'mp4' ? (
          <video
            ref={videoRef}
            id={`native-video-${video.id}`}
            src={video.url}
            loop
            muted={isMuted}
            autoPlay
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <iframe
            id={`iframe-video-${video.id}`}
            src={getEmbedUrl()}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            className="w-full h-full border-0 absolute inset-0 object-cover"
            allowFullScreen
          />
        )}

        {/* Ambient Hover Overlay Cover for MP4 controls */}
        {video.type === 'mp4' && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </div>
          </div>
        )}
      </div>

      {/* Metadata & Premium Custom Control Rails */}
      <div className="p-4 relative z-10 flex-grow flex flex-col justify-between mt-2">
        <div>
          <h3 className="font-display font-semibold text-lg text-white group-hover:text-[#00F0FF] transition-colors leading-tight mb-1">
            {video.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed font-sans mb-4">
            {video.description}
          </p>
        </div>

        {/* Floating control buttons bar */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-auto">
          <div className="flex items-center gap-2">
            {/* Play/Pause (Always visible for MP4, simulated for Iframe by swapping URL / state) */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-[#0072FF]/20 hover:border-[#0072FF]/50 transition-all duration-300"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Speaker / Unmute button with Independent Control */}
            <button
              onClick={toggleMute}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-300 ${
                !isMuted 
                  ? 'bg-[#FF007A]/20 border-[#FF007A]/50 text-white shadow-[0_0_15px_rgba(255,0,122,0.3)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-mono tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400 uppercase">
              {video.type === 'mp4' ? 'Direct Source' : 'Stream API'}
            </span>
            <button
              onClick={triggerFullscreen}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              title="Fullscreen Mode"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
