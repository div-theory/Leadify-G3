import React from 'react';
import Button from './ui/Button';
import PixelReveal from './ui/PixelReveal';
import StatusGraph from './ui/StatusGraph';

const Hero: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log("Email submitted");
  };

  return (
    <section className="relative min-h-screen pt-32 flex flex-col justify-center border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#050505] to-[#0a0500]">
      {/* Dithered Orange Glow Background */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 relative z-10">
        
        {/* Left Column: Copy - Centered on Mobile, Left on LG */}
        <div className="lg:col-span-8 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
          <div className="font-mono text-xs text-white/60 mb-6 tracking-widest uppercase flex items-center gap-4 justify-center lg:justify-start">
            <span className="w-12 h-[1px] bg-white/40"></span>
            <div className="inline-block">
              <PixelReveal delay={0} rows={6} columns={30}>
                Exclusive Pay Per Call Leads
              </PixelReveal>
            </div>
            <span className="w-12 h-[1px] bg-white/40 lg:hidden"></span>
          </div>
          
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 uppercase flex flex-col items-center lg:items-start gap-2">
              <PixelReveal delay={0.1} rows={12} columns={40} className="w-fit">
                Start Receiving
              </PixelReveal>
              <PixelReveal delay={0.2} rows={12} columns={40} className="w-fit text-orange-500/90">
                High-Intent Calls
              </PixelReveal>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 items-baseline">
                  <PixelReveal delay={0.3} rows={10} columns={10} className="w-fit text-white/50">
                    In
                  </PixelReveal>
                  <PixelReveal delay={0.3} rows={10} columns={30} className="w-fit text-orange-500">
                    48 Hours
                  </PixelReveal>
              </div>
          </div>

          <div className="max-w-2xl mb-10">
            <PixelReveal delay={0.5} rows={15} columns={50}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                Leadify delivers a predictable pipeline of high-intent prospects ready to convert.
                Spend less time finding leads and more time making money.
              </p>
            </PixelReveal>
          </div>

          {/* Email Input & CTA Form */}
          <div className="w-full max-w-md lg:max-w-xl">
             <PixelReveal delay={0.6} rows={12} columns={50} className="w-full">
                <form 
                  onSubmit={handleSubmit} 
                  className="flex flex-col sm:flex-row gap-4 w-full"
                >
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    required
                    className="
                        w-full sm:flex-1 bg-white/5 border border-white/10 p-4 
                        font-mono text-sm text-white placeholder:text-white/30 uppercase tracking-wider
                        focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300
                    "
                  />
                  <Button 
                    variant="primary" 
                    icon 
                    type="submit"
                    className="w-full sm:w-auto whitespace-nowrap"
                  >
                    Start Closing Deals
                  </Button>
                </form>
             </PixelReveal>
          </div>
        </div>

        {/* Right Column: System Status Dashboard */}
        <div className="lg:col-span-4 flex flex-col justify-end h-full min-h-[400px]">
           <PixelReveal delay={0.8} rows={40} columns={40} className="w-full h-full">
             <div className="p-1 border border-white/10 bg-white/[0.02] backdrop-blur-md w-full h-full flex flex-col min-h-[400px]">
               {/* Dashboard Header */}
               <div className="flex justify-between items-center p-4 border-b border-white/10">
                  <h3 className="font-mono text-xs uppercase text-white/50">System Status</h3>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  </div>
               </div>

               {/* Graph Area */}
               <div className="flex-1 relative border-b border-white/10 bg-black/20">
                  <div className="absolute top-4 left-4 z-10">
                      <div className="font-mono text-[10px] text-orange-500 mb-1">LIVE TRAFFIC</div>
                      <div className="text-2xl font-bold text-white">2,491</div>
                  </div>
                  <StatusGraph className="w-full h-full" />
               </div>

               {/* Metrics Footer */}
               <div className="p-6 space-y-6 bg-white/[0.02]">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-mono text-white/60 uppercase">Pipeline Status</span>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
                        <span className="text-orange-500 font-mono font-bold tracking-wider text-sm">OPTIMIZED</span>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-white/40 uppercase mb-1">Active Nodes</div>
                        <div className="font-mono text-lg">842</div>
                    </div>
                    <div>
                        <div className="text-xs text-white/40 uppercase mb-1">System Load</div>
                        <div className="font-mono text-lg text-orange-500/80">12%</div>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-xs text-white/40 uppercase mb-1">Conversion Rate</div>
                            <div className="text-3xl font-bold text-white">98.4%</div>
                        </div>
                        <div className="h-8 w-24 flex items-end gap-1">
                             {[30, 50, 40, 70, 60, 80, 100].map((h, i) => (
                                 <div key={i} className="flex-1 bg-orange-500/20 hover:bg-orange-500 transition-colors" style={{ height: `${h}%` }} />
                             ))}
                        </div>
                    </div>
                 </div>
               </div>
             </div>
           </PixelReveal>
        </div>
      </div>

      {/* Ticker/Marquee at bottom of Hero */}
      <div className="w-full border-t border-white/10 py-4 overflow-hidden bg-black/50 backdrop-blur-sm">
        <div className="flex whitespace-nowrap animate-marquee gap-12">
          {Array(10).fill("STOP CHASING LEADS. START CLOSING DEALS.").map((text, i) => (
            <span key={i} className="font-mono text-sm text-white/40 uppercase tracking-widest flex items-center gap-12">
              {text} <span className="w-2 h-2 bg-orange-500 rotate-45" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;