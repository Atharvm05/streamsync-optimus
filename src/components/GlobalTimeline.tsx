
import React from 'react';
import { cn } from '@/lib/utils';
import { useSync } from '@/contexts/SyncContext';

interface GlobalTimelineProps {
  className?: string;
}

const GlobalTimeline: React.FC<GlobalTimelineProps> = ({ className }) => {
  const { 
    currentPosition, 
    viewerPositions, 
    globalViewerCount, 
    currentVideo,
    seekTo 
  } = useSync();
  
  // Group viewers by position bins
  const getViewerGroups = () => {
    const groups: { [key: number]: number } = {};
    const binSize = 2; // Size of each bin in percentage
    
    viewerPositions.forEach(viewer => {
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
      hours > 0 ? hours : null,
      minutes < 10 && hours > 0 ? `0${minutes}` : minutes,
      secs < 10 ? `0${secs}` : secs
    ].filter(Boolean).join(':');
  };
  
  // Handle timeline click
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = ((e.clientX - rect.left) / rect.width) * 100;
    seekTo(clickPosition);
  };
  
  return (
    <div className={cn('w-full', className)}>
      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
        <span>Global Viewer Timeline</span>
        <span>{globalViewerCount} viewers</span>
      </div>
      
      <div 
        className="relative h-8 bg-muted rounded-md overflow-hidden cursor-pointer"
        onClick={handleTimelineClick}
      >
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
        <span>{formatTime(currentVideo?.duration || 0)}</span>
      </div>
    </div>
  );
};

export default GlobalTimeline;
