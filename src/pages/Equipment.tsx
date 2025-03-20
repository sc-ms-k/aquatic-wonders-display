
import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Microscope, FlaskConical, Waves, Ship } from 'lucide-react';

const Equipment = () => {
  const equipmentCategories = [
    {
      id: 'research',
      name: 'Research Equipment',
      items: [
        {
          name: 'Deep Sea ROV',
          description: 'Remote Operated Vehicle capable of reaching depths of 6,000 meters with HD cameras and sampling equipment.',
          icon: <Ship className="h-12 w-12 text-ocean-light" />,
        },
        {
          name: 'Advanced Microscopes',
          description: 'Electron microscopes for studying microorganisms found in the deep sea ecosystem.',
          icon: <Microscope className="h-12 w-12 text-ocean-light" />,
        },
        {
          name: 'Water Analysis Kit',
          description: 'Portable chemistry lab for analyzing water samples for various parameters and pollutants.',
          icon: <FlaskConical className="h-12 w-12 text-ocean-light" />,
        },
      ]
    },
    {
      id: 'facilities',
      name: 'Facilities',
      items: [
        {
          name: 'Marine Research Labs',
          description: 'State-of-the-art laboratories equipped for marine biology, oceanography, and climate research.',
          icon: <Microscope className="h-12 w-12 text-ocean-light" />,
        },
        {
          name: 'Research Vessels',
          description: 'Fleet of research ships equipped with advanced sonar, sampling equipment, and laboratories.',
          icon: <Ship className="h-12 w-12 text-ocean-light" />,
        },
        {
          name: 'Coastal Monitoring Stations',
          description: 'Network of automated stations measuring ocean conditions, wave patterns, and climate data.',
          icon: <Waves className="h-12 w-12 text-ocean-light" />,
        },
      ]
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
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Research Equipment & Facilities</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore our cutting-edge equipment and facilities that enable groundbreaking marine research
          </p>
        </div>

        <Tabs defaultValue="research" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="research">Research Equipment</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
          </TabsList>
          
          {equipmentCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="glass-card"
                  >
                    <Card className="h-full bg-ocean-deep/30 backdrop-blur-md border-white/10">
                      <CardHeader className="flex flex-col items-center">
                        <div className="mb-2 p-3 rounded-full bg-ocean-deep/50">
                          {item.icon}
                        </div>
                        <CardTitle>{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-white/70 text-center">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default Equipment;
