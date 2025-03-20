
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div 
      ref={ref}
      className={cn(
        "min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16",
        className
      )}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div 
          className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm text-sm"
          custom={0}
          variants={textVariants}
        >
          Marine Research & Conservation
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight wave-text"
          custom={1}
          variants={textVariants}
        >
          Exploring the Depths of Our Ocean Ecosystems
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          custom={2}
          variants={textVariants}
        >
          Our team of marine biologists and oceanographers are dedicated to understanding and protecting the world's most valuable and vulnerable marine ecosystems.
        </motion.p>
        
        <motion.div
          custom={3}
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#research"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-ocean-light text-ocean-deep font-medium transition-colors"
          >
            Our Research
          </motion.a>
          
          <motion.a
            href="#species"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            Discover Species
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
