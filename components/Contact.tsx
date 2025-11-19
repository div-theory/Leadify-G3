
import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import PixelReveal from './ui/PixelReveal';
import Button from './ui/Button';
import Input from './ui/Input';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: ''
  });
  
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError('Invalid Format');
    } else {
      setEmailError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'email') {
      if (emailError) setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
        setEmailError('Required');
        return;
    }
    if (!validateEmail(formData.email)) {
        setEmailError('Invalid Format');
        return;
    }
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Copy & Contact Info */}
          <div className="flex flex-col justify-center">
            <PixelReveal rows={4} columns={20} className="mb-4 block">
              <h3 className="text-xs font-mono text-white/60 uppercase tracking-widest">
                Don’t Let Another Lead Slip Away
              </h3>
            </PixelReveal>
            
            <div className="mb-8">
               <PixelReveal rows={10} columns={30} delay={0.1} className="block">
                 <h2 className="text-4xl md:text-6xl font-bold uppercase leading-[0.9] mb-4">
                   Start getting <br/>
                   exclusive, high-<br/>
                   intent calls <span className="text-orange-500">NOW</span>
                 </h2>
               </PixelReveal>
            </div>

            <PixelReveal rows={10} columns={40} delay={0.2} className="block mb-12">
              <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                Ready to grow? Fill out the form or contact us directly. We typically respond within one business day.
              </p>
            </PixelReveal>

            <div className="space-y-6">
              <PixelReveal rows={4} columns={20} delay={0.3} className="block">
                <p className="text-orange-500 text-sm font-mono uppercase mb-4">Or reach us directly:</p>
              </PixelReveal>
              
              <PixelReveal rows={6} columns={20} delay={0.4} className="block">
                <a href="tel:4692878087" className="flex items-center gap-4 group w-fit">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-white font-mono hover:text-orange-500 transition-colors">(469) 287-8087</span>
                </a>
              </PixelReveal>

              <PixelReveal rows={6} columns={20} delay={0.5} className="block">
                <a href="mailto:info@leadifysystems.com" className="flex items-center gap-4 group w-fit">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-white font-mono hover:text-orange-500 transition-colors">info@leadifysystems.com</span>
                </a>
              </PixelReveal>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <PixelReveal rows={20} columns={20} delay={0.2} className="w-full h-full">
              <div className="bg-white/[0.02] border border-white/10 p-8 md:p-10 w-full">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <Input 
                    label="Full Name" 
                    name="fullName"
                    placeholder="e.g., Jane Doe" 
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <Input 
                    label="Email Address" 
                    name="email"
                    placeholder="you@company.com" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    error={emailError}
                  />
                  <Input 
                    label="Phone Number" 
                    name="phone"
                    placeholder="(123) 456-7890" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input 
                    label="Company Name (Optional)" 
                    name="company"
                    placeholder="Your Company Inc." 
                    type="text" 
                    value={formData.company}
                    onChange={handleChange}
                  />
                  
                  <Button variant="primary" className="w-full mt-4 justify-between !px-6" icon type="submit">
                    Get Started Now
                  </Button>
                </form>
              </div>
            </PixelReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;