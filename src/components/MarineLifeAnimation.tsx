
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Fish, Anchor, Ship, Sailboat, Waves, Home, Factory, Hotel, Microscope } from 'lucide-react';

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

  const [coralReefs, setCoralReefs] = useState<Array<{
    id: number;
    position: { x: number; y: number };
    size: number;
    rotation: number;
    variant: number;
  }>>([]);

  useEffect(() => {
    // Generate random marine life
    const generateMarineLife = () => {
      const types = [
        'fish', 'anchor', 'ship', 'sailboat', 'waves', 
        'research-station', 'factory', 'hotel', 'microscope'
      ];
      const count = 20; // Increased number of marine life elements
      
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
    
    // Generate coral reefs for the bottom of the page
    const generateCoralReefs = () => {
      const count = 8; // Number of coral reef elements
      const newCoralReefs = Array.from({ length: count }, (_, i) => {
        return {
          id: i,
          position: {
            x: (i * 100 / count) + (Math.random() * 10 - 5), // Spread across the bottom
            y: 90 + (Math.random() * 5), // Near the bottom of the screen
          },
          size: Math.random() * 0.5 + 1, // Larger than marine life
          rotation: Math.random() * 20 - 10, // Slight random rotation
          variant: Math.floor(Math.random() * 3), // Different coral variants
        };
      });
      
      setCoralReefs(newCoralReefs);
    };
    
    generateMarineLife();
    generateCoralReefs();
    
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
      case 'research-station':
        return <Home {...iconProps} className="text-blue-200" />;
      case 'factory':
        return <Factory {...iconProps} className="text-gray-300" />;
      case 'hotel':
        return <Hotel {...iconProps} className="text-yellow-200" />;
      case 'microscope':
        return <Microscope {...iconProps} className="text-purple-200" />;
      default:
        return <Fish {...iconProps} />;
    }
  };

  // SVG patterns for coral reefs
  const renderCoralReef = (variant: number, size: number) => {
    const baseSize = Math.floor(size * 60);
    const color = [
      "text-pink-300 opacity-70",
      "text-orange-200 opacity-60",
      "text-purple-300 opacity-70"
    ][variant % 3];
    
    return (
      <svg width={baseSize} height={baseSize} viewBox="0 0 24 24" className={color}>
        {variant === 0 && (
          <path d="M12 2C13.5 6 15 7 18 8C15 9 13.5 10 12 14C10.5 10 9 9 6 8C9 7 10.5 6 12 2Z" fill="currentColor" />
        )}
        {variant === 1 && (
          <path d="M12 2C15 5 16 8 16 12C16 16 15 19 12 22C9 19 8 16 8 12C8 8 9 5 12 2Z" fill="currentColor" />
        )}
        {variant === 2 && (
          <path d="M4 12C8 11 10 10 12 4C14 10 16 11 20 12C16 13 14 14 12 20C10 14 8 13 4 12Z" fill="currentColor" />
        )}
      </svg>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Coral Reefs (bottom of screen) */}
      {coralReefs.map((reef) => (
        <div
          key={`coral-${reef.id}`}
          className="absolute"
          style={{
            left: `${reef.position.x}vw`,
            bottom: `${100 - reef.position.y}vh`,
            transform: `rotate(${reef.rotation}deg)`,
            zIndex: 5,
          }}
        >
          {renderCoralReef(reef.variant, reef.size)}
        </div>
      ))}

      {/* Marine Life */}
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
