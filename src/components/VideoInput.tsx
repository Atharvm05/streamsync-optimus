
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSync } from '@/contexts/SyncContext';
import { toast } from '@/components/ui/use-toast';

const VideoInput: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const { addCustomVideo } = useSync();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!videoUrl.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid video URL',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Simple URL validation
      new URL(videoUrl);
      
      addCustomVideo({
        id: `custom-${Date.now()}`,
        title: 'Custom Video',
        description: 'User-provided video',
        src: videoUrl,
        thumbnail: '/placeholder.svg',
        duration: 0, // Will be updated once video loads
        viewers: 1
      });

      toast({
        title: 'Success',
        description: 'Custom video added successfully',
      });
      
      setVideoUrl('');
    } catch (error) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid video URL',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
      <Input
        type="text"
        placeholder="Enter video URL (MP4, WebM, etc.)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Add Video</Button>
    </form>
  );
};

export default VideoInput;
