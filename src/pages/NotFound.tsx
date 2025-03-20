
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Anchor, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="mb-6 inline-block">
            <Anchor className="w-24 h-24 text-ocean-light animate-float" />
          </div>
          <h1 className="text-6xl font-bold mb-4 wave-text">404</h1>
          <p className="text-xl text-white/80 mb-8 max-w-md mx-auto">
            Looks like this page is lost at sea. We couldn't find the marine treasure you're looking for.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={18} />
            Return to Surface
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
