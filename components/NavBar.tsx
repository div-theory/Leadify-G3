
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Button from './ui/Button';
import Logo from './ui/Logo';
import PixelReveal from './ui/PixelReveal';
import { useActiveSection } from './hooks/useActiveSection';

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Who Are We', href: '#advantage' },
    { name: 'How It Works', href: '#process' },
    { name: 'Why Pay Per Call', href: '#why-us' },
    { name: 'FAQ', href: '#faq' },
  ];

  // Extract IDs from hrefs (removing '#')
  const sectionIds = navLinks.map(link => link.href.substring(1));
  const activeSection = useActiveSection(sectionIds);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
        const headerOffset = 100; // Height of header + buffer
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 px-6">
          {/* Logo with Hover Reveal */}
          <a href="#" onClick={(e) => handleScroll(e, '#')} className="group">
            <PixelReveal enableHover rows={6} columns={20} blockColor="#000000">
                <Logo />
            </PixelReveal>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center h-full ml-auto gap-10 mr-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`
                    text-xs font-mono uppercase tracking-wider transition-colors relative group py-2
                    ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}
                  `}
                >
                  {link.name}
                  <span 
                    className={`
                      absolute bottom-0 left-0 h-[1px] bg-orange-500 transition-all duration-300
                      ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                    `} 
                  />
                </a>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center border-l border-white/10 pl-10 h-full">
            <Button variant="primary" className="!py-3 !px-6 !text-xs gap-2">
                <Phone className="w-4 h-4" />
                Call Now
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100vh' }}
            exit={{ height: 0 }}
            className="fixed inset-0 top-20 z-40 bg-black overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`
                      text-3xl font-bold font-mono uppercase transition-colors
                      ${isActive ? 'text-orange-500' : 'text-white hover:text-orange-500'}
                    `}
                  >
                    {link.name}
                  </a>
                );
              })}
              <Button variant="primary" className="mt-4 justify-center">
                 <Phone className="w-4 h-4 mr-2" /> Call Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
