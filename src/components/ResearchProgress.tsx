
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressItemProps {
  title: string;
  description: string;
  progress: number;
  color?: string;
  colorEnd?: string;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  title,
  description,
  progress,
  color = "#0077B6",
  colorEnd = "#7FFFD4"
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-sm text-white/70 mb-4">{description}</p>
        
        <div className="h-3 bg-black/10 rounded-full overflow-hidden">
          <div 
            className="progress-bar h-full rounded-full"
            style={{
              '--progress-width': `${progress}%`,
              '--progress-color': color,
              '--progress-color-end': colorEnd,
            } as React.CSSProperties}
          ></div>
        </div>
        
        <div className="mt-2 text-sm text-right">{progress}% Complete</div>
      </div>
    </motion.div>
  );
};

interface ResearchProgressProps {
  className?: string;
}

const ResearchProgress: React.FC<ResearchProgressProps> = ({ className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <ProgressItem
        title="Deep Ocean Mapping"
        description="Mapping the unexplored regions of the Mariana Trench"
        progress={76}
        color="#0077B6"
        colorEnd="#90E0EF"
      />
      
      <ProgressItem
        title="Coral Reef Restoration"
        description="Restoring damaged coral ecosystems in the Pacific"
        progress={42}
        color="#00B4D8"
        colorEnd="#48CAE4"
      />
      
      <ProgressItem
        title="Marine Biodiversity Census"
        description="Cataloging marine species in protected oceanic zones"
        progress={89}
        color="#0096C7"
        colorEnd="#ADE8F4"
      />
      
      <ProgressItem
        title="Plastic Pollution Monitoring"
        description="Tracking microplastic concentration in marine habitats"
        progress={63}
        color="#023E8A"
        colorEnd="#0077B6"
      />
    </div>
  );
};

export default ResearchProgress;
