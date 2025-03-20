
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import AuthButton from './AuthButton';

interface NavigationLink {
  name: string;
  path: string;
}

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const links: NavigationLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Equipment', path: '/equipment' },
    { name: 'Facilities', path: '/facilities' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close the menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300',
        scrolled ? 'bg-ocean-deep/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="mr-2"
          >
            🌊
          </motion.div>
          <span className="hidden sm:inline">Marine Research Institute</span>
          <span className="sm:hidden">MRI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'relative transition-colors hover:text-ocean-light',
                location.pathname === link.path ? 'text-ocean-light' : 'text-white'
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ocean-light"
                />
              )}
            </Link>
          ))}
          <div className="ml-4">
            <AuthButton />
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <AuthButton />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden"
      >
        <div className="container pt-4 pb-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded transition-colors',
                location.pathname === link.path
                  ? 'bg-ocean-light/20 text-ocean-light'
                  : 'text-white hover:bg-white/10'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navigation;
