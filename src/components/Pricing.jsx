import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Rocket, Zap } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection, { fadeUp } from './ui/AnimatedSection';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: 'NPR 75,104',
    amount: 75104,
    period: 'one-time',
    description: 'Perfect for personal projects and small businesses getting started.',
    gradient: 'from-cyan-500 to-sky-400',
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
    price: 'NPR 225,613',
    amount: 225613,
    period: 'one-time',
    description: 'Ideal for growing businesses needing advanced features and integrations.',
    gradient: 'from-cyan-400 to-blue-500',
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
    price: 'NPR 601,887',
    amount: 601887,
    period: 'one-time',
    description: 'For large-scale applications requiring custom architecture and ongoing support.',
    gradient: 'from-blue-500 to-cyan-300',
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

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan.name);

    if (typeof window === 'undefined') {
      return;
    }

    window.dispatchEvent(
      new CustomEvent('portfolio:select-plan', {
        detail: {
          name: plan.name,
          price: plan.price,
          amount: plan.amount,
        },
      })
    );

    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  return (
    <AnimatedSection id="pricing" className="relative">
      <div className="floating-orb bottom-[-20%] left-[50%] h-[600px] w-[600px] -translate-x-1/2 bg-cyan-500 opacity-[0.04]" />

      <div className="section-container">
        <SectionHeading
          label="Pricing"
          title="Investment Plans"
          description="Choose any package and I will redirect you to the bottom contact form. After you submit, I can arrange the payment from there."
        />

        <div className="mx-auto mb-8 max-w-3xl glass-card border border-cyan-500/20 bg-cyan-500/10 p-5">
          <p className="text-sm leading-relaxed text-gray-300">
            Select a plan below. The contact form will be filled with your selected package, and after submitting it you can continue with payment coordination.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              role="button"
              tabIndex={0}
              onClick={() => handleChoosePlan(plan)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleChoosePlan(plan);
                }
              }}
              className={`relative flex cursor-pointer flex-col rounded-3xl border p-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 ${
                selectedPlan === plan.name
                  ? 'border-cyan-300/50 bg-cyan-400/[0.06] shadow-2xl shadow-cyan-500/10 ring-2 ring-cyan-400/40'
                  : 'border-cyan-300/10 bg-slate-950/55 hover:border-cyan-300/30 hover:bg-slate-950/70'
              }`}
            >
              {plan.popular && (
                <div className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-cyan-400/30">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${plan.gradient} shadow-lg`}>
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-1 text-xl font-display font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-display font-extrabold gradient-text lg:text-5xl">
                  {plan.price}
                </span>
                <span className="ml-2 text-sm text-gray-500">/{plan.period}</span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleChoosePlan(plan);
                }}
                className={`relative z-10 w-full rounded-xl py-4 font-semibold transition-all duration-300 ${
                  selectedPlan === plan.name
                    ? 'bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/30'
                    : 'border border-white/[0.1] bg-white/[0.06] text-white hover:border-cyan-400/30 hover:bg-white/[0.1]'
                }`}
              >
                {selectedPlan === plan.name ? `Fill form for ${plan.name}` : `Choose ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
