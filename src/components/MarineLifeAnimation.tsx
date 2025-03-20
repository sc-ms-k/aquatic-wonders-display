
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Fish, Anchor, Ship, Sailboat, Waves } from 'lucide-react';

const MarineLifeAnimation = () => {
  const [marineLife, setMarineLife] = useState<Array<{
    id: number;
    type: string;
    position: { x: number; y: number };
    size: number;
    delay: number;
    duration: number;
    direction: 'left' | 'right';
    depth: number;
  }>>([]);

  useEffect(() => {
    // Generate random marine life
    const generateMarineLife = () => {
      const types = ['fish', 'anchor', 'ship', 'sailboat', 'waves'];
      const count = 12; // Total number of marine life elements
      
      const newMarineLife = Array.from({ length: count }, (_, i) => {
        const typeIndex = Math.floor(Math.random() * types.length);
        const direction = Math.random() > 0.5 ? 'left' : 'right' as 'left' | 'right';
        const size = Math.random() * 0.5 + 0.5; // Size between 0.5 and 1
        const depth = Math.random();
        
        return {
          id: i,
          type: types[typeIndex],
          position: {
            x: direction === 'right' ? -10 : 110, // Start off-screen
            y: Math.random() * 80 + 10, // Random vertical position
          },
          size,
          delay: Math.random() * 20,
          duration: Math.random() * 20 + 30, // Between 30 and 50 seconds
          direction,
          depth, // Used for z-index and opacity
        };
      });
      
      setMarineLife(newMarineLife);
    };
    
    generateMarineLife();
    
    // Regenerate periodically
    const interval = setInterval(() => {
      generateMarineLife();
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, []);

  const getMarineLifeIcon = (type: string, direction: 'left' | 'right', size: number) => {
    const baseSize = Math.floor(size * 48);
    const scaleX = direction === 'left' ? 1 : -1;
    const iconProps = {
      size: baseSize,
      style: { transform: `scaleX(${scaleX})` },
      className: "text-white opacity-80"
    };
    
    switch (type) {
      case 'fish':
        return <Fish {...iconProps} />;
      case 'anchor':
        return <Anchor {...iconProps} className="text-ocean-bioluminescent opacity-70 animate-jellyfish-pulse" />;
      case 'ship':
        return <Ship {...iconProps} />;
      case 'sailboat':
        return <Sailboat {...iconProps} />;
      case 'waves':
        return <Waves {...iconProps} />;
      default:
        return <Fish {...iconProps} />;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {marineLife.map((item) => {
        const initialX = item.position.x;
        const targetX = item.direction === 'left' ? -10 : 110;
        
        return (
          <motion.div
            key={item.id}
            initial={{ 
              x: `${initialX}vw`, 
              y: `${item.position.y}vh`,
              opacity: 0.2 + (item.depth * 0.8)
            }}
            animate={{ 
              x: `${targetX}vw`,
              y: [
                `${item.position.y}vh`,
                `${item.position.y + (Math.random() * 10 - 5)}vh`,
                `${item.position.y - (Math.random() * 10 - 5)}vh`,
                `${item.position.y}vh`,
              ]
            }}
            transition={{
              x: {
                duration: item.duration,
                delay: item.delay,
                ease: "linear",
                repeat: Infinity,
              },
              y: {
                duration: item.duration / 4,
                delay: item.delay,
                times: [0, 0.33, 0.66, 1],
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{ 
              zIndex: Math.floor(item.depth * 10),
              filter: `blur(${(1 - item.depth) * 2}px)`
            }}
            className="absolute"
          >
            {getMarineLifeIcon(item.type, item.direction, item.size)}
          </motion.div>
        );
      })}
    </div>
  );
};

export default MarineLifeAnimation;
