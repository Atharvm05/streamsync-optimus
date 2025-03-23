
import { ViewerPosition } from '@/contexts/SyncContext';

type ViewersCallback = (data: { positions: ViewerPosition[], count: number }) => void;

// Simulate viewer position updates
const generateRandomViewers = (count: number): ViewerPosition[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i}`,
    position: Math.random() * 100,
    timestamp: Date.now() - Math.random() * 1000 * 60 * 5
  }));
};

export class GlobalTimelineService {
  private static viewersCallbacks: ViewersCallback[] = [];
  private static currentViewers: ViewerPosition[] = [];
  private static updateInterval: number | null = null;
  private static userId: string = `user-${Math.floor(Math.random() * 10000)}`;
  private static currentPosition: number = 0;
  
  // Initialize the service
  static initialize(): void {
    console.log('GlobalTimelineService initialized');
    
    // Generate initial viewers
    this.currentViewers = generateRandomViewers(50);
    
    // Add the current user
    this.currentViewers.push({
      id: this.userId,
      position: 0,
      timestamp: Date.now()
    });
    
    // Start the update interval
    this.updateInterval = window.setInterval(() => {
      // Update other viewers' positions (simulate real-time movement)
      this.currentViewers = this.currentViewers.map(viewer => {
        if (viewer.id !== this.userId) {
          // Move viewers forward randomly
          return {
            ...viewer,
            position: Math.min(100, viewer.position + (Math.random() * 1)),
            timestamp: Date.now()
          };
        }
        return viewer;
      });
      
      // Randomly add/remove viewers
      if (Math.random() > 0.7) {
        // Add a new viewer
        this.currentViewers.push({
          id: `user-${Math.floor(Math.random() * 10000)}`,
          position: Math.random() * 20,
          timestamp: Date.now()
        });
      }
      
      if (Math.random() > 0.8 && this.currentViewers.length > 30) {
        // Remove a random viewer (not current user)
        const otherViewers = this.currentViewers.filter(v => v.id !== this.userId);
        const indexToRemove = Math.floor(Math.random() * otherViewers.length);
        this.currentViewers = [
          ...this.currentViewers.filter(v => v.id === this.userId),
          ...otherViewers.slice(0, indexToRemove),
          ...otherViewers.slice(indexToRemove + 1)
        ];
      }
      
      // Notify subscribers
      this.notifyViewersUpdate();
    }, 5000);
    
    // Initial notification
    setTimeout(() => {
      this.notifyViewersUpdate();
    }, 100);
  }
  
  // Update the current user's position
  static updateViewerPosition(position: number): void {
    this.currentPosition = position;
    
    // Update the current user's position
    this.currentViewers = this.currentViewers.map(viewer => {
      if (viewer.id === this.userId) {
        return {
          ...viewer,
          position,
          timestamp: Date.now()
        };
      }
      return viewer;
    });
    
    // No need to notify here since it will happen on interval
  }
  
  // Disconnect
  static disconnect(): void {
    if (this.updateInterval !== null) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    this.viewersCallbacks = [];
    console.log('GlobalTimelineService disconnected');
  }
  
  // Register for viewers updates
  static onViewersUpdate(callback: ViewersCallback): () => void {
    this.viewersCallbacks.push(callback);
    return () => {
      this.viewersCallbacks = this.viewersCallbacks.filter(cb => cb !== callback);
    };
  }
  
  // Notify viewers update
  private static notifyViewersUpdate(): void {
    this.viewersCallbacks.forEach(callback => callback({
      positions: this.currentViewers,
      count: this.currentViewers.length
    }));
  }
}
