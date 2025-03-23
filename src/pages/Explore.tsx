
import React, { useState } from 'react';
import { Search, Filter, Play, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// Mock content categories
const categories = [
  'All',
  'Movies',
  'TV Shows',
  'Live Events',
  'Sports',
  'Music',
  'Gaming',
  'Education'
];

// Mock content
const contentLibrary = Array.from({ length: 20 }, (_, i) => ({
  id: `content-${i}`,
  title: `Content Title ${i + 1}`,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  thumbnail: `https://picsum.photos/seed/${i + 1}/800/450`,
  duration: Math.floor(Math.random() * 7200) + 300,
  views: Math.floor(Math.random() * 1000000),
  timestamp: Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
}));

const Explore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  
  // Filter content based on category and search
  const filteredContent = contentLibrary.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Sort content
  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.timestamp - a.timestamp;
      case 'popular':
        return b.views - a.views;
      case 'trending':
      default:
        // Trending is a mix of recency and popularity
        const aScore = (a.views / 1000) + (a.timestamp / 1000000);
        const bScore = (b.views / 1000) + (b.timestamp / 1000000);
        return bScore - aScore;
    }
  });
  
  // Format view count
  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  // Format duration
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 px-4">
        <div className="container mx-auto max-w-6xl py-8">
          <h1 className="text-3xl font-bold mb-6">Explore</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {}}
                >
                  <Filter size={16} />
                  Filter
                </Button>
              </div>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {}}
                >
                  Sort By: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                  <ChevronDown size={16} />
                </Button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border border-border z-10 hidden">
                  <div className="py-1">
                    <button 
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-muted"
                      onClick={() => setSortBy('trending')}
                    >
                      Trending
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-muted"
                      onClick={() => setSortBy('newest')}
                    >
                      Newest
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-muted"
                      onClick={() => setSortBy('popular')}
                    >
                      Most Popular
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="overflow-x-auto mb-8">
            <div className="flex gap-2 min-w-max pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedContent.map((item) => (
              <div 
                key={item.id}
                className="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in"
              >
                <div className="relative aspect-video">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="gap-1">
                      <Play size={16} /> Watch Now
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(item.duration)}
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium line-clamp-1">{item.title}</h3>
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>{item.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {formatViews(item.views)} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-10">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
