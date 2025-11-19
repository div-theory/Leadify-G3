import React from 'react';

const benefits = [
    { title: "Maximize Your ROI", desc: "Pay Per Call directly ties marketing dollars to qualified phone leads." },
    { title: "Get High-Intent Leads", desc: "Receive calls from prospects actively seeking your services 'Right now'." },
    { title: "Efficient Ad Spend", desc: "Pay only for real genuine opportunities, reducing wasted budget." },
    { title: "Predictable & Scalable", desc: "Set your budget and scale predictably. Know your cost per qualified call." },
    { title: "Direct Interaction", desc: "Speak with prospects in real-time, address concerns instantly." },
    { title: "Better Tracking", desc: "Eliminate Wasted Spend. Monitor call data, assess lead quality." }
];

const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="block mb-6 mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold uppercase">Why Pay Per Call?</h2>
            </div>
            <div className="block mx-auto">
              <p className="text-white/60">It’s simple: Pay Per Call aligns our success with yours. We only win when you get qualified calls that turn into real revenue.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
                <div key={i} className="border border-white/10 relative group overflow-hidden">
                  <div className="w-full h-full">
                    <div className="p-6 h-full">
                      <div className="absolute top-0 left-0 w-full h-1 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      <h3 className="text-xl font-bold mb-4 uppercase group-hover:text-white transition-colors">{b.title}</h3>
                      <p className="text-white/50 text-sm">{b.desc}</p>
                    </div>
                  </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;