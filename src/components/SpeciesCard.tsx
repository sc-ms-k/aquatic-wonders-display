
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, Maximize2 } from 'lucide-react';

interface SpeciesCardProps {
  name: string;
  scientificName: string;
  description: string;
  habitat: string;
  depth: string;
  conservationStatus: string;
  imageSrc: string;
  className?: string;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({
  name,
  scientificName,
  description,
  habitat,
  depth,
  conservationStatus,
  imageSrc,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "glass-card rounded-2xl overflow-hidden relative",
          isExpanded ? "col-span-2 row-span-2" : "",
          className
        )}
      >
        <div className="aspect-video relative overflow-hidden">
          <motion.img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm italic text-white/70">{scientificName}</p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm">
              {conservationStatus}
            </span>
          </div>
          
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "80px" }}
            className="overflow-hidden"
          >
            <p className="text-sm leading-relaxed mb-4">{description}</p>
            
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4 mt-4 text-sm"
              >
                <div>
                  <p className="text-white/70">Habitat</p>
                  <p className="font-medium">{habitat}</p>
                </div>
                <div>
                  <p className="text-white/70">Depth Range</p>
                  <p className="font-medium">{depth}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-sm flex items-center gap-1 text-white/70 hover:text-white transition-colors"
          >
            {isExpanded ? "Show less" : "Read more"}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-ocean-deep/90 backdrop-blur-md rounded-2xl max-w-3xl w-full overflow-hidden glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img
                  src={imageSrc}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{name}</h2>
                    <p className="text-md italic text-white/70">{scientificName}</p>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                    {conservationStatus}
                  </span>
                </div>
                
                <p className="text-base leading-relaxed mb-6">{description}</p>
                
                <div className="grid grid-cols-2 gap-6 text-base">
                  <div>
                    <p className="text-white/70 mb-1">Habitat</p>
                    <p className="font-medium">{habitat}</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Depth Range</p>
                    <p className="font-medium">{depth}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-8 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpeciesCard;
