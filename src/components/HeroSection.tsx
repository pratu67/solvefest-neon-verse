
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 overflow-hidden flex items-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-primary">Solve</span>
            <span className="text-green-500">Fest</span>
            <span className="text-slate-800 dark:text-slate-200"> 2025</span>
          </h1>
          
          <div className="relative inline-block mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
              Decode the Future
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-400 to-transparent"></div>
          </div>
          
          <p className="text-lg md:text-xl mb-8 text-slate-700 dark:text-slate-300">
            Where Code Meets Logic & Brilliance Competes
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#register" 
              className="bg-primary text-white py-3 px-8 rounded-md text-lg font-medium hover:bg-primary/90 flex items-center justify-center gap-2 group transition-colors"
            >
              Register Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#timeline" 
              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 py-3 px-8 rounded-md text-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              Event Timeline
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
