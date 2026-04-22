import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection, { fadeUp } from './ui/AnimatedSection';
import { createEsewaPaymentPayload, submitEsewaPayment } from '../lib/esewa';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: '$499',
    amount: 499,
    period: 'one-time',
    description: 'Perfect for personal projects and small businesses getting started.',
    gradient: 'from-accent-500 to-neon-blue',
    features: [
      'Custom responsive website',
      'Up to 5 pages',
      'Contact form integration',
      'Basic SEO optimization',
      'Mobile-first design',
      '1 round of revisions',
      '2 weeks delivery',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    icon: Crown,
    price: '$1,499',
    amount: 1499,
    period: 'one-time',
    description: 'Ideal for growing businesses needing advanced features and integrations.',
    gradient: 'from-accent-500 to-pink-500',
    features: [
      'Everything in Starter',
      'Up to 15 pages',
      'CMS integration',
      'Advanced animations',
      'Payment integration',
      'Analytics dashboard',
      'API development',
      '3 rounds of revisions',
      '4 weeks delivery',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Rocket,
    price: '$3,999',
    amount: 3999,
    period: 'one-time',
    description: 'For large-scale applications requiring custom architecture and ongoing support.',
    gradient: 'from-pink-500 to-neon-orange',
    features: [
      'Everything in Professional',
      'Unlimited pages',
      'Custom SaaS platform',
      'Real-time features',
      'Advanced security',
      'CI/CD pipeline setup',
      'Database architecture',
      'Performance optimization',
      'Unlimited revisions',
      '8 weeks delivery',
      'Dedicated support',
      '3 months maintenance',
    ],
    popular: false,
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [processingPlan, setProcessingPlan] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const handleGetStarted = async (plan) => {
    setSelectedPlan(plan.name);
    setProcessingPlan(plan.name);
    setPaymentError('');

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('portfolio:select-plan', {
          detail: {
            name: plan.name,
            price: plan.price,
          },
        })
      );
    }

    try {
      const payload = await createEsewaPaymentPayload(plan);
      submitEsewaPayment(payload);
    } catch (error) {
      console.error('eSewa payment error:', error);
      setPaymentError(error.message || 'Unable to start the eSewa dev payment flow right now.');
      setProcessingPlan('');

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <AnimatedSection id="pricing" className="relative">
      <div className="floating-orb w-[600px] h-[600px] bg-accent-500 bottom-[-20%] left-[50%] -translate-x-1/2 opacity-[0.04]" />

      <div className="section-container">
        <SectionHeading
          label="Pricing"
          title="Investment Plans"
          description="Transparent pricing for every project size. Choose a package to continue into the eSewa dev sandbox or send a tailored inquiry."
        />

        <div className="mx-auto mb-8 max-w-3xl glass-card border border-emerald-500/20 bg-emerald-500/10 p-5">
          <p className="text-sm leading-relaxed text-gray-300">
            Payments now use the eSewa development gateway with the official sandbox merchant code
            <span className="mx-1 font-semibold text-emerald-300">EPAYTEST</span>
            and test OTP
            <span className="mx-1 font-semibold text-emerald-300">123456</span>.
          </p>
        </div>

        {paymentError && (
          <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {paymentError}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`relative glass-card p-8 flex flex-col
                ${plan.popular
                  ? 'border-accent-500/30 shadow-2xl shadow-accent-500/10 scale-[1.02] lg:scale-105'
                  : ''
                }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2
                              px-5 py-1.5 text-xs font-bold tracking-wider uppercase
                              bg-gradient-to-r from-accent-500 to-pink-500 text-white
                              rounded-full shadow-lg shadow-accent-500/30">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl
                              bg-gradient-to-br ${plan.gradient} mb-4 shadow-lg`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl lg:text-5xl font-display font-extrabold gradient-text">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-sm ml-2">/{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                type="button"
                disabled={Boolean(processingPlan)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => void handleGetStarted(plan)}
                className={`w-full py-4 rounded-xl font-semibold text-white
                  transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-accent-500 to-pink-500 shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40'
                      : 'bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] hover:border-accent-500/30'
                  } ${selectedPlan === plan.name ? 'ring-2 ring-accent-500/40' : ''} ${
                    processingPlan ? 'cursor-wait opacity-70' : ''
                  }`}
              >
                {processingPlan === plan.name
                  ? `Redirecting to eSewa for ${plan.name}...`
                  : selectedPlan === plan.name
                    ? `Pay ${plan.price} with eSewa`
                    : `Choose ${plan.name}`}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
