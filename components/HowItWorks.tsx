import React from 'react';

const steps = [
  {
    title: "We Generate the Leads",
    desc: "We use laser-focused marketing strategies to attract real customers actively looking for home services."
  },
  {
    title: "We Pre-Qualify Every Call",
    desc: "We pre-screen leads to ensure they have an urgent need, are actively seeking a solution, and are ready to book."
  },
  {
    title: "You Exclusively Get the Call",
    desc: "Unlike other platforms where you compete for the same leads, every call you receive is exclusive to you."
  },
  {
    title: "You Close the Deal",
    desc: "With our high-intent, pre-screened calls, all that’s left is for you to do is to book the job and grow your business."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="process" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
             <div className="lg:w-1/3 text-center lg:text-left">
                <div className="block mb-6">
                  <h2 className="text-4xl md:text-6xl font-bold uppercase">How It Works</h2>
                </div>
                <div className="block">
                  <p className="text-white/60">Leadify connects you straight to ready-to-book callers in 4 simple steps.</p>
                </div>
             </div>
             
             <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                {steps.map((step, i) => (
                    <div key={i} className="bg-[#050505] hover:bg-[#0a0a0a] transition-colors h-full group border border-transparent hover:border-orange-500/20 relative">
                       <div className="w-full h-full">
                          <div className="p-10 flex flex-col gap-6 h-full text-left">
                              <div className="font-mono text-4xl text-orange-500/40 font-bold group-hover:text-orange-500 transition-colors">0{i+1}</div>
                              <div>
                                  <h3 className="text-xl font-bold mb-4 uppercase">{step.title}</h3>
                                  <p className="text-white/50 text-sm">{step.desc}</p>
                              </div>
                          </div>
                       </div>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;