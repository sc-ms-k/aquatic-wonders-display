
import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Factory, Hotel, Home } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      name: "Marine Research Headquarters",
      description: "Our primary research center housing laboratories, data centers, and administrative offices.",
      icon: <Home className="w-16 h-16 text-ocean-light" />,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop"
    },
    {
      name: "Sustainable Aquaculture Facility",
      description: "State-of-the-art facility dedicated to developing sustainable seafood farming practices.",
      icon: <Factory className="w-16 h-16 text-ocean-light" />,
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop"
    },
    {
      name: "Oceanfront Research Station",
      description: "Coastal facility with direct ocean access for immediate sample collection and testing.",
      icon: <Home className="w-16 h-16 text-ocean-light" />,
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop"
    },
    {
      name: "Marine Conservation Hotel",
      description: "Eco-friendly accommodation for visiting researchers and educational tourism.",
      icon: <Hotel className="w-16 h-16 text-ocean-light" />,
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop"
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="container py-12"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Marine Facilities</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore our network of specialized facilities dedicated to marine research, conservation, and education
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative overflow-hidden rounded-2xl">
                  <motion.img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full aspect-video object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-full bg-ocean-deep/50 backdrop-blur-sm">
                    {facility.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{facility.name}</h2>
                </div>
                <p className="text-white/70 text-lg">{facility.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-ocean-light text-ocean-deep font-medium"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Facilities;
