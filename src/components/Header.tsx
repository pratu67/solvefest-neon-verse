
import React from 'react';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark bg-opacity-80 backdrop-blur-md border-b border-neon-blue border-opacity-30 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-neon-blue animate-pulse-neon" />
          <span className="text-2xl font-orbitron font-bold text-glow-blue">SolveFest</span>
        </a>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {['Home', 'Timeline', 'Prizes', 'Register', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="font-orbitron text-light hover:text-neon-purple transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-neon-purple after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <a href="#register" className="btn-neon-green py-2 px-4 rounded-md text-sm font-orbitron">
          Register Now
        </a>
      </div>
    </header>
  );
};

export default Header;
