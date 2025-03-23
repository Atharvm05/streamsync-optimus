
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Clock, ThumbsUp, History, Play, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// Mock library content
const generateLibraryContent = (count: number, type: string) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${type}-${i}`,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Title ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/${type}-${i}/800/450`,
    duration: Math.floor(Math.random() * 7200) + 300,
    progress: type === 'watchlist' ? 0 : Math.floor(Math.random() * 100),
    timestamp: Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7
  }));
};

const Library: React.FC = () => {
  const [watchlist] = useState(generateLibraryContent(8, 'watchlist'));
  const [history] = useState(generateLibraryContent(12, 'history'));
  const [liked] = useState(generateLibraryContent(6, 'liked'));
  
  // Format duration
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };
  
  // Render library item
  const renderLibraryItem = (item: any, showProgress: boolean = true) => (
    <div key={item.id} className="group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-video">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" className="gap-1">
            <Play size={16} /> Play
          </Button>
        </div>
        
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {formatDuration(item.duration)}
        </div>
        
        {showProgress && item.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <div 
              className="h-full bg-primary"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium line-clamp-1">{item.title}</h3>
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>{showProgress && item.progress > 0 ? `${item.progress}% complete` : 'Not started'}</span>
          <span>{formatTimestamp(item.timestamp)}</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 px-4">
        <div className="container mx-auto max-w-6xl py-8">
          <h1 className="text-3xl font-bold mb-6">Your Library</h1>
          
          <Tabs defaultValue="watchlist" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="watchlist" className="gap-2">
                <Bookmark size={16} /> Watchlist
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History size={16} /> History
              </TabsTrigger>
              <TabsTrigger value="liked" className="gap-2">
                <ThumbsUp size={16} /> Liked
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="watchlist" className="animate-fade-in">
              {watchlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {watchlist.map(item => renderLibraryItem(item, false))}
                  <div className="rounded-lg border-2 border-dashed border-muted aspect-[4/3] flex flex-col items-center justify-center text-muted-foreground p-4 hover:border-primary hover:text-primary transition-colors">
                    <Plus size={24} className="mb-2" />
                    <span className="text-sm font-medium">Add to watchlist</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <Bookmark size={48} className="mx-auto mb-4 text-muted" />
                  <h3 className="text-lg font-medium mb-2">Your watchlist is empty</h3>
                  <p className="text-muted-foreground mb-4">Save videos to watch later by adding them to your watchlist.</p>
                  <Button>Browse Content</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              {history.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {history.map(item => renderLibraryItem(item))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Clock size={48} className="mx-auto mb-4 text-muted" />
                  <h3 className="text-lg font-medium mb-2">Your history is empty</h3>
                  <p className="text-muted-foreground mb-4">Videos you watch will appear here.</p>
                  <Button>Browse Content</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="liked" className="animate-fade-in">
              {liked.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {liked.map(item => renderLibraryItem(item))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <ThumbsUp size={48} className="mx-auto mb-4 text-muted" />
                  <h3 className="text-lg font-medium mb-2">You haven't liked any videos yet</h3>
                  <p className="text-muted-foreground mb-4">Like videos to save them to this list.</p>
                  <Button>Browse Content</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Library;
