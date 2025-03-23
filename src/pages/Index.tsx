
import React, { useState } from 'react';
import { ArrowRight, Play, ChevronRight, Code, FilmIcon, Zap, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import GlobalTimeline from '@/components/GlobalTimeline';
import VideoInput from '@/components/VideoInput';
import { cn } from '@/lib/utils';
import { useSync } from '@/contexts/SyncContext';
import { VideoService } from '@/services/VideoService';

// Features section
const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Real-Time Synchronization',
    description: 'Perfect sync across all devices, ensuring everyone sees the same content at the exact same time.'
  },
  {
    icon: <FilmIcon className="h-8 w-8 text-primary" />,
    title: 'Zero Buffering',
    description: 'Our advanced technology eliminates buffering, providing instant playback with no interruptions.'
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Optimization',
    description: 'Smart resource allocation predicts and prepares for peak loads, ensuring smooth streaming for millions.'
  }
];

const Index: React.FC = () => {
  const { 
    currentVideo, 
    selectVideo, 
    isConnected,
    globalViewerCount,
    isDarkMode,
    toggleDarkMode
  } = useSync();
  const [showGlobalTimeline, setShowGlobalTimeline] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Get all available videos
  const featuredContent = VideoService.getAllVideos();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode}
          className="rounded-full"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Connection Status */}
      <div className={cn(
        "fixed top-4 left-4 z-50 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
        isConnected 
          ? "bg-green-500/10 text-green-500 border border-green-500/20" 
          : "bg-red-500/10 text-red-500 border border-red-500/20"
      )}>
        {isConnected ? 'Connected' : 'Connecting...'}
      </div>
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:pt-32 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Introducing StreamSync
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight md:leading-tight">
              Perfect synchronization for<br />millions of viewers
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Experience lag-free, perfectly synchronized streaming across any device, 
              anywhere in the world, all at the same time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                View Demo <Play size={18} />
              </Button>
            </div>
            
            {/* Add custom video input */}
            <div className="mt-4 mb-8">
              <h3 className="text-lg font-medium mb-2">Add Your Own Video</h3>
              <VideoInput />
            </div>
          </div>
          
          {/* Video Player Preview */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            {currentVideo && (
              <VideoPlayer 
                src={currentVideo.src}
                poster={currentVideo.thumbnail}
                title={currentVideo.title}
              />
            )}
            
            {/* Global Timeline (toggleable) */}
            <div className="mt-4 mb-8 px-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{currentVideo?.title}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowGlobalTimeline(!showGlobalTimeline)}
                >
                  {showGlobalTimeline ? 'Hide' : 'Show'} Global Timeline
                </Button>
              </div>
              
              {showGlobalTimeline && (
                <GlobalTimeline className="mb-4" />
              )}
              
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">
                  {currentVideo?.description}
                </p>
                <span className="text-sm text-muted-foreground">
                  {globalViewerCount} viewers watching now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cutting-Edge Streaming Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              StreamSync combines advanced algorithms with AI-driven optimizations to deliver 
              the most reliable streaming experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  'relative rounded-xl p-6 transition-all duration-500 h-full',
                  activeFeature === index 
                    ? 'bg-card shadow-lg scale-105' 
                    : 'bg-background'
                )}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Content Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Content</h2>
            <Button variant="ghost" className="gap-1">
              View All <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredContent.map((item) => (
              <div 
                key={item.id}
                className={cn(
                  'overflow-hidden rounded-xl transition-all duration-300 cursor-pointer',
                  'hover:shadow-lg hover:-translate-y-1',
                  currentVideo?.id === item.id ? 'ring-2 ring-primary' : ''
                )}
                onClick={() => selectVideo(item.id)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" className="rounded-full w-12 h-12">
                      <Play size={20} />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="text-xs text-muted-foreground flex items-center justify-between">
                    <span>{Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}</span>
                    <span>{item.viewers.toLocaleString()} viewers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Perfect Sync?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of content creators and millions of viewers who are already 
            enjoying the future of synchronized streaming.
          </p>
          <Button size="lg" className="gap-2">
            Get Started Today <ArrowRight size={18} />
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
