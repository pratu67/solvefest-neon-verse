
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const BinaryDigit = ({ delay }: { delay: number }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  const digit = Math.random() > 0.5 ? '1' : '0';
  const left = `${Math.random() * 100}%`;
  const animationDuration = `${10 + Math.random() * 20}s`;
  
  return visible ? (
    <div 
      className="absolute text-neon-blue text-opacity-20 text-xs"
      style={{
        left,
        top: '-20px',
        animation: `binary-rain ${animationDuration} linear forwards`,
        animationDelay: `${delay}ms`
      }}
    >
      {digit}
    </div>
  ) : null;
};

const HeroSection = () => {
  const [binaryRain, setBinaryRain] = useState<number[]>([]);
  
  useEffect(() => {
    const binary = Array.from({ length: 50 }, (_, i) => i * 500);
    setBinaryRain(binary);
  }, []);
  
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 overflow-hidden flex items-center">
      {/* Binary rain background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryRain.map((delay, index) => (
          <BinaryDigit key={index} delay={delay} />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-glow-blue">Solve</span>
            <span className="text-glow-green">Fest</span>
            <span className="text-light"> 2025</span>
          </h1>
          
          <div className="relative inline-block mb-8">
            <h2 className="text-xl md:text-3xl font-orbitron">
              <span className="text-glow-purple">Decode the Future</span>
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
          </div>
          
          <p className="text-lg md:text-xl mb-8 text-light opacity-90">
            Where Code Meets Logic & Brilliance Competes
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#register" 
              className="btn-neon-green py-3 px-8 rounded-md text-lg font-orbitron flex items-center justify-center gap-2 group"
            >
              Register Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#timeline" 
              className="btn-neon-blue py-3 px-8 rounded-md text-lg font-orbitron"
            >
              Event Timeline
            </a>
          </div>
        </div>
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
