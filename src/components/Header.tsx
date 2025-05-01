
import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">SolveFest</span>
        </a>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {['Home', 'Timeline', 'Prizes', 'Register', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <a href="#register" className="bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          Register Now
        </a>
      </div>
    </header>
  );
};

export default Header;
