
import { Video } from '@/contexts/SyncContext';

// Mock featured content - in a real app this would come from an API
const featuredContent: Video[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    description: 'A short film about a big rabbit who encounters three bullying rodents.',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    duration: 596,
    viewers: 3842
  },
  {
    id: '2',
    title: 'Elephant Dream',
    description: 'The first Blender Open Movie from 2006.',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    duration: 653,
    viewers: 2195
  },
  {
    id: '3',
    title: 'Sintel',
    description: 'A lonely girl travels to find her dragon friend.',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    duration: 888,
    viewers: 4271
  }
];

// Store custom videos added by users
let customVideos: Video[] = [];

type PositionCallback = (position: number) => void;
type ConnectionCallback = (isConnected: boolean) => void;
type PlaybackCallback = (isPlaying: boolean) => void;

export class VideoService {
  private static positionCallbacks: PositionCallback[] = [];
  private static connectionCallbacks: ConnectionCallback[] = [];
  private static playbackCallbacks: PlaybackCallback[] = [];
  private static currentVideo: Video | null = null;
  private static videoElement: HTMLVideoElement | null = null;
  private static isPlaying = false;
  private static syncInterval: number | null = null;
  
  // Initialize the service
  static initialize(): void {
    console.log('VideoService initialized');
    // Load the first video by default
    this.currentVideo = featuredContent[0];
  }
  
  // Set the video element
  static setVideoElement(element: HTMLVideoElement | null): void {
    this.videoElement = element;
    
    if (element) {
      // Set up event listeners
      element.addEventListener('timeupdate', this.handleTimeUpdate);
      element.addEventListener('play', this.handlePlay);
      element.addEventListener('pause', this.handlePause);
      element.addEventListener('loadedmetadata', this.handleLoadedMetadata);
      element.addEventListener('error', this.handleError);
    }
  }
  
  // Handle time update
  private static handleTimeUpdate = (): void => {
    if (this.videoElement) {
      const position = (this.videoElement.currentTime / this.videoElement.duration) * 100;
      this.notifyPositionChange(position);
    }
  };
  
  // Handle play
  private static handlePlay = (): void => {
    this.isPlaying = true;
    this.notifyPlaybackChange(true);
  };
  
  // Handle pause
  private static handlePause = (): void => {
    this.isPlaying = false;
    this.notifyPlaybackChange(false);
  };
  
  // Handle loaded metadata
  private static handleLoadedMetadata = (): void => {
    console.log('Video metadata loaded');
    if (this.videoElement && this.currentVideo && this.currentVideo.duration === 0) {
      // Update duration for custom videos once loaded
      this.currentVideo.duration = this.videoElement.duration;
    }
  };
  
  // Handle error
  private static handleError = (e: Event): void => {
    console.error('Video playback error:', e);
  };
  
  // Get video by ID (now includes custom videos)
  static getVideoById(id: string): Video | null {
    return [...featuredContent, ...customVideos].find(video => video.id === id) || null;
  }
  
  // Get all videos (including custom videos)
  static getAllVideos(): Video[] {
    return [...featuredContent, ...customVideos];
  }
  
  // Add a custom video
  static addCustomVideo(video: Video): void {
    const existingIndex = customVideos.findIndex(v => v.id === video.id);
    if (existingIndex !== -1) {
      customVideos[existingIndex] = video;
    } else {
      customVideos.push(video);
    }
  }
  
  // Load a video
  static loadVideo(video: Video): void {
    this.currentVideo = video;
    
    if (this.videoElement) {
      this.videoElement.src = video.src;
      this.videoElement.load();
      this.notifyPositionChange(0);
    }
  }
  
  // Play
  static play(): void {
    if (this.videoElement) {
      const playPromise = this.videoElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Start sync interval
            if (this.syncInterval === null) {
              this.syncInterval = window.setInterval(() => {
                // In a real app, this would sync with server
                console.log('Syncing video position with server');
              }, 5000);
            }
          })
          .catch(error => {
            console.error('Play failed:', error);
          });
      }
    }
  }
  
  // Pause
  static pause(): void {
    if (this.videoElement) {
      this.videoElement.pause();
      
      // Clear sync interval
      if (this.syncInterval !== null) {
        clearInterval(this.syncInterval);
        this.syncInterval = null;
      }
    }
  }
  
  // Seek to position (percentage)
  static seekTo(position: number): void {
    if (this.videoElement && this.videoElement.duration) {
      const time = (position / 100) * this.videoElement.duration;
      this.videoElement.currentTime = time;
      this.notifyPositionChange(position);
    }
  }
  
  // Disconnect
  static disconnect(): void {
    if (this.videoElement) {
      this.videoElement.removeEventListener('timeupdate', this.handleTimeUpdate);
      this.videoElement.removeEventListener('play', this.handlePlay);
      this.videoElement.removeEventListener('pause', this.handlePause);
      this.videoElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
      this.videoElement.removeEventListener('error', this.handleError);
    }
    
    if (this.syncInterval !== null) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    
    this.positionCallbacks = [];
    this.connectionCallbacks = [];
    this.playbackCallbacks = [];
    console.log('VideoService disconnected');
  }
  
  // Register for position changes
  static onPositionChange(callback: PositionCallback): () => void {
    this.positionCallbacks.push(callback);
    return () => {
      this.positionCallbacks = this.positionCallbacks.filter(cb => cb !== callback);
    };
  }
  
  // Register for connection changes
  static onConnectionChange(callback: ConnectionCallback): () => void {
    this.connectionCallbacks.push(callback);
    // Initial notification
    callback(true);
    return () => {
      this.connectionCallbacks = this.connectionCallbacks.filter(cb => cb !== callback);
    };
  }
  
  // Register for playback changes
  static onPlaybackChange(callback: PlaybackCallback): () => void {
    this.playbackCallbacks.push(callback);
    return () => {
      this.playbackCallbacks = this.playbackCallbacks.filter(cb => cb !== callback);
    };
  }
  
  // Notify position change
  private static notifyPositionChange(position: number): void {
    this.positionCallbacks.forEach(callback => callback(position));
  }
  
  // Notify connection change
  private static notifyConnectionChange(isConnected: boolean): void {
    this.connectionCallbacks.forEach(callback => callback(isConnected));
  }
  
  // Notify playback change
  private static notifyPlaybackChange(isPlaying: boolean): void {
    this.playbackCallbacks.forEach(callback => callback(isPlaying));
  }
}
