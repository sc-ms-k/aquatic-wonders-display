
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ExternalLink, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  researchFocus: string[];
  contactEmail?: string;
  publications?: { title: string; url: string }[];
  className?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  bio,
  imageSrc,
  researchFocus,
  contactEmail,
  publications,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "glass-card rounded-2xl overflow-hidden cursor-pointer group",
          className
        )}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-sm text-white/80">{role}</p>
          </div>
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
              className="bg-ocean-deep/90 backdrop-blur-md rounded-2xl max-w-3xl w-full overflow-hidden glass-card flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-1/3 relative">
                <div className="aspect-square md:h-full">
                  <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              
              <div className="p-6 md:w-2/3 md:overflow-auto max-h-[80vh]">
                <h2 className="text-2xl font-semibold mb-1">{name}</h2>
                <p className="text-md text-white/80 mb-4">{role}</p>
                
                <p className="text-base leading-relaxed mb-6">{bio}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Research Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {researchFocus.map((focus, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-white/10 backdrop-blur-sm"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
                
                {publications && publications.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Key Publications</h3>
                    <ul className="space-y-2">
                      {publications.map((pub, index) => (
                        <li key={index} className="flex items-start">
                          <ExternalLink size={16} className="mr-2 mt-1 flex-shrink-0" />
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-ocean-light hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {pub.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {contactEmail && (
                  <div className="mt-auto pt-4">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail size={16} />
                      Contact Researcher
                    </a>
                  </div>
                )}
                
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

export default TeamMember;
