
import React from 'react';
import { Mail, Instagram, Facebook, Linkedin, Twitter, Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="pt-16 pb-6 bg-dark border-t border-neon-blue border-opacity-30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <a href="#" className="flex items-center gap-2 mb-6">
              <Brain className="h-8 w-8 text-neon-blue" />
              <span className="text-2xl font-orbitron font-bold text-glow-blue">SolveFest</span>
            </a>
            <p className="text-light/70 mb-6">
              The ultimate problem-solving competition where brilliant minds compete to decode the future.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, href: "#", color: "blue" },
                { icon: <Facebook className="w-5 h-5" />, href: "#", color: "blue" },
                { icon: <Instagram className="w-5 h-5" />, href: "#", color: "purple" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#", color: "blue" },
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  className={`btn-neon-${social.color} w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110`}
                  aria-label={`Visit our social media ${index + 1}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-orbitron mb-6 text-glow-green">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "Timeline", href: "#timeline" },
                { name: "Prizes", href: "#prizes" },
                { name: "Register", href: "#register" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-light/70 hover:text-neon-green transition-colors duration-300 flex items-center"
                  >
                    <span className="text-neon-green mr-2">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-orbitron mb-6 text-glow-purple">Contact Us</h3>
            <div className="space-y-4">
              <p className="flex items-start">
                <Mail className="w-5 h-5 text-neon-purple mr-3 mt-0.5" />
                <span className="text-light/70">
                  <a href="mailto:info@solvefest.com" className="hover:text-neon-purple transition-colors duration-300">
                    info@solvefest.com
                  </a>
                </span>
              </p>
              <p className="text-light/70">
                Tech University Campus,<br />
                Innovation District,<br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-light/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-light/50 text-sm mb-4 md:mb-0">
            © 2025 SolveFest. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-light/50 text-sm hover:text-neon-blue transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-light/50 text-sm hover:text-neon-blue transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
