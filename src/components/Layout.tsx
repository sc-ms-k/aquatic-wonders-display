
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import MarineLifeAnimation from './MarineLifeAnimation';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const generateRandomBubbles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 15,
  }));
};

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const [bubbles, setBubbles] = useState<{ id: number; size: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setBubbles(generateRandomBubbles(20));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden deep-sea-gradient">
      {/* Animated background bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble absolute"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: `-${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
      
      {/* Animated marine life */}
      <MarineLifeAnimation />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn("relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24", className)}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
