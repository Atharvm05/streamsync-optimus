
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 w-full z-50 px-4 py-3 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold">S</span>
          <span className="text-xl font-semibold tracking-tight">StreamSync</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/explore" className="text-foreground hover:text-primary transition-colors">Explore</Link>
            <Link to="/library" className="text-foreground hover:text-primary transition-colors">Library</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button size="sm" className="px-4">
              Sign In
            </Button>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <div className="flex flex-col p-6 space-y-6">
            <Link to="/" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/explore" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
            <Link to="/library" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Library</Link>
            <Link to="/about" className="text-lg" onClick={() => setMobileMenuOpen(false)}>About</Link>
            
            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                onClick={toggleDarkMode} 
                className="gap-2"
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
