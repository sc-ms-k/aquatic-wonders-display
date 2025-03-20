
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

  const [seaGrasses, setSeaGrasses] = useState<Array<{
    id: number;
    position: { x: number; y: number };
    height: number;
    width: number;
    rotation: number;
    variant: number;
  }>>([]);

  useEffect(() => {
    // Generate random marine life
    const generateMarineLife = () => {
      const types = [
        'fish', 'anchor', 'ship', 'sailboat', 'waves', 
        'research-station', 'factory', 'hotel', 'microscope',
        'tropical-fish', 'clownfish', 'angelfish', 'stingray'
      ];
      const count = 25; // Increased number of marine life elements
      
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
      const count = 12; // Increased number of coral reef elements
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
    
    // Generate sea grasses for the bottom of the page
    const generateSeaGrasses = () => {
      const count = 15; // Number of sea grass elements
      const newSeaGrasses = Array.from({ length: count }, (_, i) => {
        return {
          id: i,
          position: {
            x: Math.random() * 100, // Random x position
            y: 95 + (Math.random() * 3), // At the bottom of the screen
          },
          height: Math.random() * 10 + 5, // Height between 5 and 15vh
          width: Math.random() * 2 + 1, // Width between 1 and 3vh
          rotation: Math.random() * 10 - 5, // Slight random rotation
          variant: Math.floor(Math.random() * 4), // Different seagrass variants
        };
      });
      
      setSeaGrasses(newSeaGrasses);
    };
    
    generateMarineLife();
    generateCoralReefs();
    generateSeaGrasses();
    
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
      case 'tropical-fish':
        return <Fish {...iconProps} className="text-yellow-300 opacity-80" />;
      case 'clownfish':
        return <Fish {...iconProps} className="text-orange-400 opacity-80" />;
      case 'angelfish':
        return <Fish {...iconProps} className="text-blue-300 opacity-80" />;
      case 'stingray':
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 24 24" style={{ transform: `scaleX(${scaleX})` }} className="text-gray-300 opacity-70">
            <path d="M22 12C22 13 21 14 20 14C19 14 18 13 18 12C18 11 19 10 20 10C21 10 22 11 22 12Z" fill="currentColor" />
            <path d="M4 12C4 9 7 5 12 5C17 5 20 9 20 12C20 15 17 19 12 19C7 19 4 15 4 12Z" fill="currentColor" />
            <path d="M2 12C2 13 3 14 4 14C5 14 6 13 6 12C6 11 5 10 4 10C3 10 2 11 2 12Z" fill="currentColor" />
          </svg>
        );
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

  // Render sea grasses
  const renderSeaGrass = (variant: number, height: number, width: number, rotation: number) => {
    const colors = [
      "text-green-300 opacity-60",
      "text-green-400 opacity-50",
      "text-emerald-300 opacity-60",
      "text-teal-300 opacity-50"
    ];
    
    return (
      <div 
        className={`absolute ${colors[variant % colors.length]}`} 
        style={{
          height: `${height}vh`,
          width: `${width}vw`,
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'bottom center',
          animation: 'sway 10s ease-in-out infinite alternate'
        }}
      >
        {variant % 2 === 0 ? (
          // Straight sea grass
          <div className="h-full w-full bg-current rounded-t-full" />
        ) : (
          // Curved sea grass
          <div className="h-full w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-current rounded-t-full" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sea Grasses (bottom of screen) */}
      {seaGrasses.map((grass) => (
        <div
          key={`grass-${grass.id}`}
          className="absolute"
          style={{
            left: `${grass.position.x}vw`,
            bottom: `${100 - grass.position.y}vh`,
            zIndex: 3,
          }}
        >
          {renderSeaGrass(grass.variant, grass.height, grass.width, grass.rotation)}
        </div>
      ))}

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
