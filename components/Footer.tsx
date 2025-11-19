
import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import PixelReveal from './ui/PixelReveal';
import Logo from './ui/Logo';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-start">
             <PixelReveal enableHover rows={6} columns={20} className="block mb-6 cursor-pointer">
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="block w-fit">
                    <Logo />
                </a>
             </PixelReveal>
             <PixelReveal rows={8} columns={20} delay={0.1} className="block">
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                    High-intent, exclusive calls to accelerate your growth.
                </p>
             </PixelReveal>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <PixelReveal rows={4} columns={16} delay={0.1} className="block mb-6">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">Navigate</h4>
            </PixelReveal>
            <div className="flex flex-col gap-3">
                {[
                    { name: 'Home', href: '#' },
                    { name: 'How It Works', href: '#process' },
                    { name: 'Why Pay Per Call', href: '#why-us' },
                    { name: 'Services', href: '#services' },
                    { name: 'FAQ', href: '#faq' }
                ].map((link, i) => (
                    <PixelReveal key={i} rows={2} columns={12} delay={0.2 + (i * 0.03)} className="block">
                        <a 
                            href={link.href} 
                            className="text-white/50 hover:text-orange-500 transition-colors text-sm font-mono"
                        >
                            {link.name}
                        </a>
                    </PixelReveal>
                ))}
            </div>
          </div>

          {/* Column 3: Get In Touch */}
          <div>
             <PixelReveal rows={4} columns={16} delay={0.1} className="block mb-6">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">Get In Touch</h4>
             </PixelReveal>
             <div className="flex flex-col gap-4">
                <PixelReveal rows={4} columns={20} delay={0.2} className="block">
                    <a href="tel:4692878087" className="flex items-start gap-3 group">
                        <Phone className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-white/50 group-hover:text-white transition-colors text-sm font-mono">(469) 287-8087</span>
                    </a>
                </PixelReveal>
                
                <PixelReveal rows={4} columns={24} delay={0.25} className="block">
                    <a href="mailto:info@leadifysystems.com" className="flex items-start gap-3 group">
                        <Mail className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-white/50 group-hover:text-white transition-colors text-sm font-mono">info@leadifysystems.com</span>
                    </a>
                </PixelReveal>

                <PixelReveal rows={6} columns={24} delay={0.3} className="block">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-white/50 text-sm font-mono leading-relaxed">
                            6136 Frisco Square Blvd, Suite 400 Frisco, TX 75034
                        </span>
                    </div>
                </PixelReveal>
             </div>
          </div>

          {/* Column 4: Legal */}
          <div>
             <PixelReveal rows={4} columns={16} delay={0.1} className="block mb-6">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">Legal</h4>
             </PixelReveal>
             <div className="flex flex-col gap-3">
                {['Privacy Policy', 'Terms & Conditions'].map((item, i) => (
                    <PixelReveal key={i} rows={2} columns={12} delay={0.2 + (i * 0.03)} className="block">
                        <a href="#" className="text-white/50 hover:text-orange-500 transition-colors text-sm font-mono">
                            {item}
                        </a>
                    </PixelReveal>
                ))}
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white/30 text-xs font-mono">
                © {new Date().getFullYear()} Leadify. All rights reserved.
            </div>

            <button 
                onClick={scrollToTop}
                className="w-10 h-10 bg-orange-500 flex items-center justify-center text-white hover:bg-white hover:text-orange-500 transition-colors duration-300"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
