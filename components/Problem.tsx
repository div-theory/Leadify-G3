
import React from 'react';
import { Ban, TrendingDown, UserX, AlertCircle, MousePointer2, Clock } from 'lucide-react';
import PixelReveal from './ui/PixelReveal';
import DitheredIcon from './ui/DitheredIcon';
import MagicCard from './ui/MagicCard';

const problems = [
  {
    title: "Stop Wasting Money",
    desc: "Businesses spend thousands on ads that don’t bring in results.",
    icon: TrendingDown
  },
  {
    title: "Stop Chasing Cold Leads",
    desc: "Leads aren’t ready to buy or show little to no interest.",
    icon: UserX
  },
  {
    title: "Stop Paying for Shared",
    desc: "Multiple competitors receive the same lead, creating a race to win the customer.",
    icon: AlertCircle
  },
  {
    title: "Stop Click-Based Ads",
    desc: "Businesses pay for clicks or forms regardless of lead quality or intent.",
    icon: MousePointer2
  },
  {
    title: "Stop Unqualified Prospects",
    desc: "Effort is spent talking to people who aren’t serious about hiring.",
    icon: Clock
  },
  {
    title: "Stop Poor Marketing ROI",
    desc: "The return on marketing spend is low, causing stress and inefficiency.",
    icon: Ban
  }
];

const Problem: React.FC = () => {
  return (
    <section className="py-24 border-b border-white/10 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-4xl">
            <div className="text-4xl md:text-6xl font-bold mb-6 uppercase leading-none">
                <PixelReveal className="block mb-2" rows={10} columns={40}>Lead Generation Process</PixelReveal>
                <PixelReveal className="text-orange-500" delay={0.1} rows={8} columns={30}>Is Broken</PixelReveal>
            </div>
            <div className="h-px w-24 bg-white mb-6" />
            <PixelReveal delay={0.2} rows={10} columns={50} className="block">
              <p className="text-xl text-white/60 max-w-2xl">
                  Stop Burning Cash & Chasing Bad Leads that don’t convert. 
                  Most lead generation platforms drain your budget and deliver nothing in return.
              </p>
            </PixelReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {problems.map((p, i) => (
            <MagicCard
              key={i}
              className="h-full bg-[#050505]"
            >
              <PixelReveal className="w-full h-full" delay={i * 0.1} rows={20} columns={20}>
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-6 flex justify-between items-start">
                     <p className="font-mono text-xs text-orange-500/50">0{i + 1}</p>
                     <DitheredIcon icon={p.icon} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 uppercase">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mt-auto">{p.desc}</p>
                </div>
              </PixelReveal>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
