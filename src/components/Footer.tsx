
import React from 'react';
import { Mail, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="py-16 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <a href="#" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-primary">SolveFest</span>
            </a>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              The ultimate problem-solving competition where brilliant minds compete to decode the future.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Facebook className="w-5 h-5" />, href: "#" },
                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={`Visit our social media ${index + 1}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-6 text-slate-900 dark:text-slate-100">Quick Links</h3>
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
                    className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors duration-300 flex items-center"
                  >
                    <span className="text-primary mr-2">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-6 text-slate-900 dark:text-slate-100">Contact Us</h3>
            <div className="space-y-4">
              <p className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400">
                  <a href="mailto:info@solvefest.com" className="hover:text-primary transition-colors duration-300">
                    info@solvefest.com
                  </a>
                </span>
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Tech University Campus,<br />
                Innovation District,<br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-4 md:mb-0">
            © 2025 SolveFest. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-slate-500 dark:text-slate-500 text-sm hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
            <a href="#" className="text-slate-500 dark:text-slate-500 text-sm hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
