
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ViewerPosition {
  id: string;
  position: number; // Position as percentage
  timestamp: number;
}

// Mock data for demonstration
const generateMockViewers = (): ViewerPosition[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i}`,
    position: Math.random() * 100,
    timestamp: Date.now() - Math.random() * 1000 * 60 * 5
  }));
};

interface GlobalTimelineProps {
  currentPosition: number; // Position as percentage (0-100)
  duration: number; // Total duration in seconds
  className?: string;
}

const GlobalTimeline: React.FC<GlobalTimelineProps> = ({
  currentPosition,
  duration,
  className
}) => {
  const [viewers, setViewers] = useState<ViewerPosition[]>([]);
  
  // Update viewers positions periodically
  useEffect(() => {
    // Initial viewers
    setViewers(generateMockViewers());
    
    // Update viewers every 5 seconds
    const interval = setInterval(() => {
      setViewers(prev => {
        return prev.map(viewer => ({
          ...viewer,
          position: Math.min(100, viewer.position + (Math.random() * 2))
        }));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Group viewers by position bins
  const getViewerGroups = () => {
    const groups: { [key: number]: number } = {};
    const binSize = 2; // Size of each bin in percentage
    
    viewers.forEach(viewer => {
      const bin = Math.floor(viewer.position / binSize) * binSize;
      groups[bin] = (groups[bin] || 0) + 1;
    });
    
    return Object.entries(groups).map(([position, count]) => ({
      position: parseFloat(position),
      count
    }));
  };
  
  const viewerGroups = getViewerGroups();
  
  // Format time in HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return [
      hours,
      minutes < 10 ? `0${minutes}` : minutes,
      secs < 10 ? `0${secs}` : secs
    ].filter(Boolean).join(':');
  };
  
  return (
    <div className={cn('w-full', className)}>
      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
        <span>Global Viewer Timeline</span>
        <span>{viewers.length} viewers</span>
      </div>
      
      <div className="relative h-8 bg-muted rounded-md overflow-hidden">
        {/* Timeline ticks */}
        <div className="absolute inset-0 flex justify-between px-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className="h-full w-px bg-border"
            />
          ))}
        </div>
        
        {/* Viewer distribution */}
        {viewerGroups.map(group => (
          <div
            key={group.position}
            className="absolute bottom-0 w-1 bg-primary/40 rounded-t-sm"
            style={{
              height: `${Math.min(100, group.count * 5)}%`,
              left: `${group.position}%`,
              opacity: 0.8
            }}
          />
        ))}
        
        {/* Current position marker */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-primary rounded-sm z-10"
          style={{ left: `${currentPosition}%` }}
        />
      </div>
      
      {/* Time markers */}
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>00:00</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default GlobalTimeline;
