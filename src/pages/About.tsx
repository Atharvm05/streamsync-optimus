
import React from 'react';
import { ArrowRight, Users, Server, Zap, Database, Monitor, Clock, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// Team data
const teamMembers = [
  {
    name: 'Emma Chen',
    role: 'CEO & Founder',
    image: 'https://randomuser.me/api/portraits/women/17.jpg'
  },
  {
    name: 'Michael Torres',
    role: 'CTO',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Product',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'James Wilson',
    role: 'Lead Engineer',
    image: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
];

// Stats
const stats = [
  { value: '99.99%', label: 'Uptime', icon: <Clock size={20} className="text-primary" /> },
  { value: '200ms', label: 'Avg. Latency', icon: <Zap size={20} className="text-primary" /> },
  { value: '100M+', label: 'Monthly Users', icon: <Users size={20} className="text-primary" /> },
  { value: '190+', label: 'Countries', icon: <Globe size={20} className="text-primary" /> }
];

// Technology stack
const technologies = [
  { name: 'Global CDN', icon: <Globe size={24} className="text-primary" /> },
  { name: 'AI Load Balancing', icon: <Server size={24} className="text-primary" /> },
  { name: 'Distributed Database', icon: <Database size={24} className="text-primary" /> },
  { name: 'WebSocket Architecture', icon: <Zap size={24} className="text-primary" /> },
  { name: 'Adaptive Streaming', icon: <Monitor size={24} className="text-primary" /> },
  { name: 'End-to-End Encryption', icon: <Shield size={24} className="text-primary" /> }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">About StreamSync</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
              We're on a mission to revolutionize video streaming with perfect synchronization 
              that brings people together, no matter where they are.
            </p>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  StreamSync was founded in 2022 with a simple yet ambitious goal: to eliminate the 
                  "Did you see that?!" problem when friends, family, or colleagues are watching the 
                  same content at different times due to streaming delays.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our team of engineers, all passionate about creating shared experiences, developed 
                  a proprietary synchronization engine that ensures everyone sees the same frame at 
                  exactly the same time, regardless of device or location.
                </p>
                <p className="text-muted-foreground">
                  Today, StreamSync is used by millions of viewers around the world, from friends 
                  watching movies together to businesses streaming events to global audiences, all 
                  perfectly in sync.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                    alt="Team collaborating" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-sm flex flex-col items-center text-center"
                >
                  <div className="mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Technology Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Technology</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="bg-muted/30 p-6 rounded-xl hover:bg-card hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4">{tech.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{tech.name}</h3>
                  <p className="text-muted-foreground">
                    {(() => {
                      switch (tech.name) {
                        case 'Global CDN': 
                          return 'Content delivery network with edge servers on every continent for minimal latency.';
                        case 'AI Load Balancing': 
                          return 'Machine learning algorithms that predict traffic patterns and optimize resource allocation.';
                        case 'Distributed Database': 
                          return 'Fault-tolerant, globally replicated data storage for high availability.';
                        case 'WebSocket Architecture': 
                          return 'Real-time communication channel ensuring instant synchronization between viewers.';
                        case 'Adaptive Streaming': 
                          return 'Dynamic quality adjustment based on network conditions for buffer-free playback.';
                        case 'End-to-End Encryption': 
                          return 'Secure transmission of all content to protect viewer privacy and content rights.';
                        default: 
                          return '';
                      }
                    })()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to learn more?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                We're always excited to talk about how StreamSync can help deliver perfectly 
                synchronized content for your audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  Contact Us <ArrowRight size={18} />
                </Button>
                <Button variant="outline" size="lg">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
