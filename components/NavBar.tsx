'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, MessageCircle, Menu, X } from 'lucide-react';

const navLinks = [
  { id: 'hero', label: 'Home', icon: User },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: MessageCircle },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setMenuOpen(false); // close mobile menu
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === id
                    ? 'text-violet bg-violet/10'
                    : 'text-muted hover:text-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.button>
            ))}
          </div>

          {/* Hamburger button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-light">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden flex flex-col space-y-2 pb-4"
          >
            {navLinks.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeSection === id
                    ? 'text-violet bg-violet/10'
                    : 'text-muted hover:text-light'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
