
import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Timeline from '../components/Timeline';
import PrizeDisplay from '../components/PrizeDisplay';
import CountdownTimer from '../components/CountdownTimer';
import RegistrationPanel from '../components/RegistrationPanel';
import Footer from '../components/Footer';

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        
        if (element) {
          e.preventDefault();
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Header />
      <HeroSection />
      <CountdownTimer />
      <Timeline />
      <PrizeDisplay />
      <RegistrationPanel />
      <Footer />
    </div>
  );
};

export default Index;
