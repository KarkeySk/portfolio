import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Coffee } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import AnimatedSection, { fadeUp } from './ui/AnimatedSection';

const stats = [
  { value: '2+', label: 'Years Learning' },
  { value: '15+', label: 'Projects Built' },
  { value: '10+', label: 'Happy Clients' },
  { value: '100%', label: 'Dedication' },
];

const highlights = [
  { icon: Code2, title: 'Clean Code', desc: 'Writing maintainable, well-structured code with best practices.' },
  { icon: Palette, title: 'Pixel-Perfect', desc: 'Bringing designs to life with meticulous attention to detail.' },
  { icon: Rocket, title: 'Performance', desc: 'Optimized applications that load fast and scale effortlessly.' },
  { icon: Coffee, title: 'Passionate', desc: 'Constantly learning new technologies and pushing boundaries.' },
];

export default function About() {
  return (
    <AnimatedSection id="about" className="relative">
      <div className="section-container">
        <SectionHeading
          label="About Me"
          title="Crafting the Future of the Web"
          description="A passionate Computer Science student with a love for creating beautiful,
                       performant, and user-centric digital experiences."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Story */}
          <motion.div variants={fadeUp} className="space-y-6">
            <div className="relative">
              {/* Decorative code snippet */}
              <div className="glass-card p-6 font-mono text-sm leading-relaxed">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-auto text-xs text-gray-500">developer.js</span>
                </div>
                <code className="text-gray-300">
                  <span className="text-accent-400">const</span>{' '}
                  <span className="text-neon-blue">swornim</span> = {'{'}<br />
                  &nbsp;&nbsp;<span className="text-pink-400">name</span>:{' '}
                  <span className="text-green-400">"Swornim Karki"</span>,<br />
                  &nbsp;&nbsp;<span className="text-pink-400">role</span>:{' '}
                  <span className="text-green-400">"CS Student & Developer"</span>,<br />
                  &nbsp;&nbsp;<span className="text-pink-400">passion</span>:{' '}
                  <span className="text-green-400">"Building the impossible"</span>,<br />
                  &nbsp;&nbsp;<span className="text-pink-400">motto</span>:{' '}
                  <span className="text-green-400">"Learn. Build. Repeat."</span>,<br />
                  {'}'};
                </code>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-lg">
              I'm Swornim Karki, a Computer Science student who thrives at the intersection of
              design and engineering. Currently pursuing my Bachelor's degree, I'm building
              real-world projects and sharpening my full-stack skills every day.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My approach combines clean architecture, modern UI/UX principles, and a relentless
              focus on learning. Whether it's a startup MVP or a course project, I bring
              the same level of craft and dedication to every line of code.
            </p>
          </motion.div>

          {/* Right — Highlights & Stats */}
          <motion.div variants={fadeUp} className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="glass-card p-5 text-center group"
                >
                  <div className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Highlight cards */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="glass-card p-5 group"
                >
                  <item.icon className="w-6 h-6 text-accent-400 mb-3 group-hover:text-accent-300 transition-colors" />
                  <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
