import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection, { fadeUp } from './ui/AnimatedSection';
import { submitContactMessage } from '../lib/supabase';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'Swornim.karki300@gmail.com', href: 'mailto:Swornim.karki300@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+977 9766846456', href: 'tel:+9779766846456' },
  { icon: MapPin, label: 'Location', value: 'Nepal', href: null },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const handlePlanSelect = (event) => {
      const planName = event.detail?.name;
      const planPrice = event.detail?.price;

      if (!planName) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        subject: `${planName} Package Inquiry`,
        message: prev.message || `Hi, I'm interested in the ${planName} package (${planPrice}). Please share the next steps.`,
      }));
    };

    window.addEventListener('portfolio:select-plan', handlePlanSelect);

    return () => {
      window.removeEventListener('portfolio:select-plan', handlePlanSelect);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await submitContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <AnimatedSection id="contact" className="relative">
      <div className="floating-orb w-[500px] h-[500px] bg-accent-500 top-[10%] left-[-15%] opacity-[0.05]" />

      <div className="section-container">
        <SectionHeading
          label="Get In Touch"
          title="Let's Work Together"
          description="Have a project in mind? I'd love to hear about it. Send me a message and I'll get back within 24 hours."
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-8">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10
                              border border-accent-500/20 flex items-center justify-center
                              group-hover:bg-accent-500/20 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white font-medium hover:gradient-text transition-all duration-300">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Decorative element */}
            <div className="glass-card p-6 mt-8">
              <p className="text-sm text-gray-400 leading-relaxed">
                <span className="text-accent-400 font-semibold">💡 Pro tip:</span> Include
                your project requirements, timeline, and budget range for a faster response.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-6 lg:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08]
                             rounded-xl text-white placeholder-gray-500
                             focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20
                             transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08]
                             rounded-xl text-white placeholder-gray-500
                             focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20
                             transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08]
                           rounded-xl text-white placeholder-gray-500
                           focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20
                           transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08]
                           rounded-xl text-white placeholder-gray-500 resize-none
                           focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20
                           transition-all duration-300"
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-300">Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                >
                  <span className="text-sm text-red-300">{errorMsg}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-accent-500 to-pink-500
                  shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40
                  transition-all duration-300 flex items-center justify-center gap-2
                  ${status === 'sending' ? 'opacity-60 cursor-wait' : ''}`}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
