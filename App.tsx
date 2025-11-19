
import React from 'react';
import FluidBackground from './components/ui/FluidBackground';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Differentiation from './components/Differentiation';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Contact from './components/Contact';
import WebsiteReveal from './components/WebsiteReveal';

const App: React.FC = () => {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-white">
      <WebsiteReveal />
      <FluidBackground />
      <div className="dither-overlay" />

      <NavBar />
      
      <Hero />

      <Problem />
      
      <Differentiation />
      
      <Stats />
      
      <HowItWorks />
      
      <WhyUs />
      
      <Services />

      <FAQ />

      <Contact />

      <Footer />
    </main>
  );
};

export default App;
