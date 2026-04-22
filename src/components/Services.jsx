import { motion } from 'framer-motion';
import {
  Globe, Server, Smartphone, PaintBucket,
  Database, ShieldCheck, Zap, BarChart3,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection, { fadeUp } from './ui/AnimatedSection';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks. From landing pages to complex SaaS platforms — all crafted for performance.',
    gradient: 'from-accent-500 to-pink-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps using React Native that feel truly native. Smooth animations, offline support, and push notifications.',
    gradient: 'from-neon-blue to-accent-500',
  },
  {
    icon: Server,
    title: 'Backend & API',
    description: 'Scalable REST and GraphQL APIs with robust authentication, rate limiting, and real-time capabilities via WebSockets.',
    gradient: 'from-pink-500 to-neon-orange',
  },
  {
    icon: PaintBucket,
    title: 'UI/UX Design',
    description: 'Pixel-perfect interfaces designed in Figma. User research, wireframing, prototyping, and design systems that scale.',
    gradient: 'from-green-400 to-neon-blue',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Optimized database schemas, migrations, indexing strategies, and data modeling for PostgreSQL, MongoDB, and more.',
    gradient: 'from-yellow-400 to-pink-500',
  },
  {
    icon: ShieldCheck,
    title: 'Security & DevOps',
    description: 'CI/CD pipelines, Docker containerization, cloud deployments, SSL, WAF, and thorough security audits.',
    gradient: 'from-accent-500 to-neon-blue',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Core Web Vitals optimization, lazy loading, code splitting, caching strategies, and lighthouse score improvements.',
    gradient: 'from-neon-orange to-accent-500',
  },
  {
    icon: BarChart3,
    title: 'Consulting & Strategy',
    description: 'Technical architecture consulting, code reviews, technology stack selection, and project roadmap planning.',
    gradient: 'from-pink-500 to-accent-500',
  },
];

export default function Services() {
  return (
    <AnimatedSection id="services" className="relative">
      <div className="floating-orb w-[400px] h-[400px] bg-neon-blue top-[20%] right-[-10%] opacity-[0.05]" />

      <div className="section-container">
        <SectionHeading
          label="What I Offer"
          title="Services & Solutions"
          description="End-to-end development services designed to transform your vision into reality."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="glass-card p-6 group cursor-default"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl
                            bg-gradient-to-br ${service.gradient} mb-5
                            shadow-lg group-hover:shadow-xl transition-shadow duration-300
                            group-hover:scale-110 transform transition-transform`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-display font-semibold text-white mb-2
                           group-hover:gradient-text transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div className={`h-[2px] w-0 group-hover:w-full mt-5 rounded-full
                            bg-gradient-to-r ${service.gradient}
                            transition-all duration-500 ease-out`} />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
