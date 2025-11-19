import React from 'react';
import MagicCard from './ui/MagicCard';

const services = [
  "HVAC", "Electrical", "Plumbing", "Pest Control", 
  "Fire/Smoke Damage", "Water Damage", "Mold Remediation", "Roofing",
  "Siding", "Painting", "Bathroom Remodeling", "Junk Removal"
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 border-b border-white/10 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="w-fit">
                <h2 className="text-3xl md:text-5xl font-bold uppercase">Services We Serve</h2>
              </div>
            </div>
            <div className="w-fit">
              <p className="text-orange-500 font-mono text-sm uppercase tracking-widest">High-Ticket Home Services</p>
            </div>
        </div>

        <div className="flex flex-wrap gap-4">
            {services.map((s, i) => (
                <div key={i} className="flex-none">
                    <MagicCard className="cursor-default group h-full">
                        <div className="px-6 py-4 font-mono text-sm uppercase transition-colors group-hover:text-orange-500 whitespace-nowrap">
                          {s}
                        </div>
                    </MagicCard>
                </div>
            ))}
            <div className="flex-none">
                <div className="px-6 py-4 border border-dashed border-white/20 font-mono text-sm uppercase text-white/40 h-full flex items-center whitespace-nowrap hover:text-orange-500 hover:border-orange-500/50 transition-colors cursor-pointer">
                    And Many More
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;