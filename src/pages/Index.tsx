
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ResearchProgress from '@/components/ResearchProgress';
import SpeciesCard from '@/components/SpeciesCard';
import TeamMember from '@/components/TeamMember';
import { motion } from 'framer-motion';

const Index = () => {
  // Mock data for species
  const speciesData = [
    {
      name: "Giant Squid",
      scientificName: "Architeuthis dux",
      description: "The giant squid is a deep-ocean dwelling squid and one of the largest known invertebrates. The largest confirmed specimen reached 13 meters in length and weighed over 900 kg. They remain one of the most elusive and mysterious creatures in the ocean.",
      habitat: "Deep oceanic waters",
      depth: "300-1,000 meters",
      conservationStatus: "Data Deficient",
      imageSrc: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop"
    },
    {
      name: "Blue Whale",
      scientificName: "Balaenoptera musculus",
      description: "The blue whale is the largest animal known to have ever existed, with lengths up to 30 meters and weights up to 180 tonnes. Despite their massive size, these magnificent creatures feed almost exclusively on tiny krill, consuming up to 3,600 kg daily.",
      habitat: "All major oceans",
      depth: "Surface to 500 meters",
      conservationStatus: "Endangered",
      imageSrc: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=800&auto=format&fit=crop"
    },
    {
      name: "Coral Polyp",
      scientificName: "Anthozoa class",
      description: "Coral polyps are tiny, soft-bodied organisms related to sea anemones and jellyfish. They are the building blocks of coral reefs, secreting calcium carbonate to form a hard skeleton. These colonial organisms play a crucial role in marine ecosystems.",
      habitat: "Tropical and subtropical reefs",
      depth: "0-150 meters",
      conservationStatus: "Various (many threatened)",
      imageSrc: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop"
    },
    {
      name: "Leafy Seadragon",
      scientificName: "Phycodurus eques",
      description: "The leafy seadragon is a marine fish related to seahorses, with elaborate leaf-like appendages that provide excellent camouflage in seaweed and kelp environments. They move using transparent fins, creating the illusion that they're floating seaweed.",
      habitat: "Southern Australian waters",
      depth: "10-30 meters",
      conservationStatus: "Near Threatened",
      imageSrc: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop"
    }
  ];

  // Mock data for team members
  const teamData = [
    {
      name: "Dr. Marina Chen",
      role: "Lead Marine Biologist",
      bio: "Dr. Chen has over 15 years of experience studying deep-sea ecosystems. Her groundbreaking research on hydrothermal vent communities has been published in Nature and Science. She leads our marine biodiversity census program.",
      imageSrc: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop",
      researchFocus: ["Deep-sea ecosystems", "Hydrothermal vents", "Marine biodiversity"],
      contactEmail: "marina.chen@example.com",
      publications: [
        { title: "Diversity of Life in Hydrothermal Vent Ecosystems", url: "#" },
        { title: "New Species Discovery in the Mariana Trench", url: "#" }
      ]
    },
    {
      name: "Prof. James Washington",
      role: "Oceanographer",
      bio: "Professor Washington specializes in ocean currents and their impact on marine ecosystems. His current work focuses on how changing currents affect coral reef health and resilience in the face of climate change.",
      imageSrc: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=800&auto=format&fit=crop",
      researchFocus: ["Ocean currents", "Climate change impact", "Coral reefs"],
      contactEmail: "j.washington@example.com",
      publications: [
        { title: "Ocean Current Shifts in the North Pacific", url: "#" },
        { title: "Resilience Factors in Pacific Coral Systems", url: "#" }
      ]
    },
    {
      name: "Dr. Aisha Patel",
      role: "Marine Conservation Specialist",
      bio: "Dr. Patel focuses on developing effective marine protected areas and conservation strategies. Her work has helped establish several marine sanctuaries and has influenced international marine conservation policy.",
      imageSrc: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&auto=format&fit=crop",
      researchFocus: ["Marine protected areas", "Conservation policy", "Stakeholder engagement"],
      contactEmail: "aisha.p@example.com",
      publications: [
        { title: "Effectiveness of Marine Protected Areas in the Indo-Pacific", url: "#" },
        { title: "Community-Based Conservation Models for Coral Reefs", url: "#" }
      ]
    },
    {
      name: "Dr. Mateo Rodriguez",
      role: "Marine Geneticist",
      bio: "Dr. Rodriguez studies the genetic diversity and adaptation of marine species. His research helps us understand how marine life evolves and adapts to changing ocean conditions, with implications for conservation and fisheries management.",
      imageSrc: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop",
      researchFocus: ["Marine genetics", "Evolutionary biology", "Adaptation"],
      contactEmail: "m.rodriguez@example.com",
      publications: [
        { title: "Genetic Diversity in Coral Reef Fish Populations", url: "#" },
        { title: "Adaptive Mechanisms in Deep Sea Organisms", url: "#" }
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

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Research Progress Section */}
      <motion.section
        id="research"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-20"
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Research Progress</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Tracking our ongoing marine research initiatives and their current status
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ResearchProgress />
          </div>
        </div>
      </motion.section>
      
      {/* Marine Species Section */}
      <motion.section
        id="species"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-20"
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Marine Species</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Discover some of the fascinating species we study and protect in our marine research programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {speciesData.map((species, index) => (
              <SpeciesCard
                key={index}
                name={species.name}
                scientificName={species.scientificName}
                description={species.description}
                habitat={species.habitat}
                depth={species.depth}
                conservationStatus={species.conservationStatus}
                imageSrc={species.imageSrc}
              />
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Team Section */}
      <motion.section
        id="team"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-20"
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Research Team</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Meet the dedicated marine scientists and researchers behind our ocean studies
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageSrc={member.imageSrc}
                researchFocus={member.researchFocus}
                contactEmail={member.contactEmail}
                publications={member.publications}
              />
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="py-10 border-t border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">Marine Research Institute</h3>
              <p className="text-white/70">Exploring and protecting our ocean ecosystems</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#research" className="hover:text-ocean-light transition-colors">Research</a>
              <a href="#species" className="hover:text-ocean-light transition-colors">Species</a>
              <a href="#team" className="hover:text-ocean-light transition-colors">Team</a>
              <a href="#" className="hover:text-ocean-light transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            <p>© {new Date().getFullYear()} Marine Research Institute. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
