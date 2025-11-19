
import React from 'react';
import Button from './ui/Button';
import PixelReveal from './ui/PixelReveal';

const stats = [
  { label: "Appointments Set (2024)", value: "10,000+" },
  { label: "Trusted Partners", value: "50+" },
  { label: "Years Experience", value: "8+" },
  { label: "Client ROAS", value: "5x" },
  { label: "States Covered", value: "50" },
];

const Stats: React.FC = () => {
  return (
    <section className="py-24 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
            <PixelReveal className="mb-8 block" rows={10} columns={40}>
              <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight">
                  Let’s grow your business— <br/> one call at a time.
              </h2>
            </PixelReveal>
            <PixelReveal delay={0.2} rows={6} columns={20}>
              <Button variant="primary">Start Scaling</Button>
            </PixelReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-white/10">
            {stats.map((stat, i) => (
                <div key={i} className="border-b md:border-b-0 border-r border-white/10 last:border-r-0 group hover:bg-white/5 transition-colors">
                  <PixelReveal className="w-full h-full" delay={i * 0.1} rows={10} columns={10}>
                    <div className="p-8 flex flex-col justify-between h-32">
                      <span className="text-3xl md:text-4xl font-bold text-orange-500 group-hover:scale-110 transition-transform origin-left">{stat.value}</span>
                      <span className="font-mono text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
                    </div>
                  </PixelReveal>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
