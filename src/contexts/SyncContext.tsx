
import React, { createContext, useContext, useState, useEffect } from 'react';
import { VideoService } from '@/services/VideoService';
import { GlobalTimelineService } from '@/services/GlobalTimelineService';

interface SyncContextType {
  isConnected: boolean;
  currentPosition: number;
  globalViewerCount: number;
  viewerPositions: ViewerPosition[];
  selectVideo: (videoId: string) => void;
  currentVideo: Video | null;
  isPlaying: boolean;
  togglePlayback: () => void;
  seekTo: (position: number) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export interface ViewerPosition {
  id: string;
  position: number;
  timestamp: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  duration: number;
  viewers: number;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export const SyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [globalViewerCount, setGlobalViewerCount] = useState(0);
  const [viewerPositions, setViewerPositions] = useState<ViewerPosition[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or use system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Connect to services on mount
  useEffect(() => {
    // Connect to video service
    VideoService.initialize();
    
    // Connect to global timeline service
    GlobalTimelineService.initialize();
    
    // Subscribe to position updates
    const positionSub = VideoService.onPositionChange((position) => {
      setCurrentPosition(position);
      GlobalTimelineService.updateViewerPosition(position);
    });
    
    // Subscribe to viewer updates
    const viewersSub = GlobalTimelineService.onViewersUpdate((data) => {
      setViewerPositions(data.positions);
      setGlobalViewerCount(data.count);
    });
    
    // Set connection status
    const connectionSub = VideoService.onConnectionChange((status) => {
      setIsConnected(status);
    });
    
    // Set playback status
    const playbackSub = VideoService.onPlaybackChange((status) => {
      setIsPlaying(status);
    });
    
    // Simulate connection (would be real WebSocket in production)
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
    
    // Apply initial dark mode setting
    applyDarkMode(isDarkMode);
    
    return () => {
      // Clean up subscriptions
      positionSub();
      viewersSub();
      connectionSub();
      playbackSub();
      
      // Disconnect from services
      VideoService.disconnect();
      GlobalTimelineService.disconnect();
    };
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    applyDarkMode(newMode);
  };
  
  // Apply dark mode to document
  const applyDarkMode = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Select video
  const selectVideo = (videoId: string) => {
    const video = VideoService.getVideoById(videoId);
    if (video) {
      setCurrentVideo(video);
      VideoService.loadVideo(video);
      setIsPlaying(false);
    }
  };
  
  // Toggle playback
  const togglePlayback = () => {
    if (isPlaying) {
      VideoService.pause();
    } else {
      VideoService.play();
    }
  };
  
  // Seek to position
  const seekTo = (position: number) => {
    VideoService.seekTo(position);
  };
  
  return (
    <SyncContext.Provider 
      value={{
        isConnected,
        currentPosition,
        globalViewerCount,
        viewerPositions,
        selectVideo,
        currentVideo,
        isPlaying,
        togglePlayback,
        seekTo,
        toggleDarkMode,
        isDarkMode
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = (): SyncContextType => {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};
