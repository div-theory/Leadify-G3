
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import PixelReveal from './ui/PixelReveal';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does Pay Per Call work?",
    answer: "Pay Per Call is a performance-based marketing model where you only pay for qualified inbound phone calls from prospective customers. We generate the interest, and you answer the phone. You are not billed for clicks or impressions, only results."
  },
  {
    question: "Are these leads exclusive?",
    answer: "Yes. 100%. Unlike shared lead platforms where 5 contractors fight over the same homeowner, our calls are routed directly and exclusively to your phone line. You have zero competition on that lead."
  },
  {
    question: "What qualifies as a billable call?",
    answer: "A qualified call is typically defined by a set duration (e.g., 60 seconds or longer) to ensure you are speaking with a real prospect. You are never billed for spam, wrong numbers, or solicitors."
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer: "No. We believe in earning your business every month. We operate on a performance basis with no long-term lock-in contracts. Our partners stay because they make money, not because they are stuck."
  },
  {
    question: "How quickly can I start receiving calls?",
    answer: "Once your campaign setup and budget are approved, we can typically have live calls flowing to your business within 48 to 72 hours."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 border-b border-white/10 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 text-center">
          <PixelReveal className="block mb-6 mx-auto" rows={8} columns={30}>
            <h2 className="text-3xl md:text-5xl font-bold uppercase">
              Frequently Asked <span className="text-white/40">Questions</span>
            </h2>
          </PixelReveal>
          <PixelReveal className="block mx-auto" delay={0.1} rows={4} columns={30}>
            <p className="text-white/60 text-sm font-mono uppercase tracking-widest">Everything you need to know</p>
          </PixelReveal>
        </div>
        
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10 group">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors px-4 -mx-4"
              >
                <PixelReveal rows={4} columns={40} delay={0.05 * i} className="w-full">
                    <span className="text-lg md:text-xl font-bold uppercase pr-8 group-hover:text-white/90 transition-colors block">
                    {faq.question}
                    </span>
                </PixelReveal>
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-white/20 bg-black group-hover:border-white transition-all duration-300">
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </motion.div>
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pr-12 pt-2">
                      <PixelReveal rows={15} columns={60} duration={0.4} delay={0.1} blockColor="#050505">
                        <p className="text-white/60 font-mono text-sm leading-relaxed border-l-2 border-white/20 pl-6">
                            {faq.answer}
                        </p>
                      </PixelReveal>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
