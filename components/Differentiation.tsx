import React from 'react';
import { Check } from 'lucide-react';
import MagicCard from './ui/MagicCard';

const points = [
  { title: "Only Pay for High-Intent Calls", desc: "No clicks, no form fills—just real calls from people actively looking for your services." },
  { title: "Pre-Screened Leads", desc: "We qualify every lead to ensure they’re ready to hire and need help now." },
  { title: "100% Exclusive to You", desc: "No lead sharing. Every call goes directly to your business—no competition." },
  { title: "Pay Only When the Phone Rings", desc: "You’re only charged when a qualified prospect makes contact. Simple and fair." },
  { title: "Talk to Ready-to-Book Customers", desc: "Phone calls let you build trust and close faster—no waiting on replies." },
  { title: "Transparent & Scalable Results", desc: "Track everything, control your volume, and grow at your pace—with better ROI." }
];

const Differentiation: React.FC = () => {
  return (
    <section id="advantage" className="py-24 border-b border-white/10 bg-white/[0.02] overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Heading - Centered Mobile */}
            <div className="lg:col-span-5 flex flex-col justify-start items-center text-center lg:items-start lg:text-left">
                <div className="mb-12 lg:mb-0">
                    <div className="text-4xl md:text-6xl font-bold mb-8 uppercase leading-[0.9]">
                        <div className="w-fit mb-2 mx-auto lg:mx-0">Your Unfair</div>
                        <div className="w-fit text-orange-500 mx-auto lg:mx-0">Advantage</div>
                    </div>
                    <div className="w-full">
                      <p className="text-lg text-white/60 mb-8 leading-relaxed">
                          How is Leadify Different? We focus on quality connections, not just quantity. 
                          Stop fighting for scraps and start eating at the big table.
                      </p>
                    </div>
                    <div className="w-fit mx-auto lg:mx-0">
                      <div className="font-mono text-xs border border-orange-500/30 bg-orange-500/5 inline-flex items-center px-4 py-2 uppercase tracking-wider text-orange-500">
                          <span className="w-2 h-2 bg-orange-500 mr-3 animate-pulse"/>
                          Market Leader Protocol
                      </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Grid Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {points.map((point, i) => (
                    <MagicCard key={i} className="group h-full min-h-[200px]">
                      <div className="w-full h-full">
                        <div className="flex flex-col gap-4 p-8 h-full justify-start text-left">
                            <div className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-colors duration-300">
                                <Check className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-3 uppercase group-hover:text-orange-500 transition-colors">{point.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{point.desc}</p>
                            </div>
                        </div>
                      </div>
                    </MagicCard>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;