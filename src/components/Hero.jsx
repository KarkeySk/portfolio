import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';
import GradientButton from './ui/GradientButton';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Ambient Background ─────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        {/* Large gradient orbs */}
        <div className="floating-orb w-[600px] h-[600px] bg-accent-500 top-[-10%] left-[-10%] animate-float" />
        <div className="floating-orb w-[500px] h-[500px] bg-pink-500 bottom-[-15%] right-[-10%] animate-float-delayed" />
        <div className="floating-orb w-[300px] h-[300px] bg-neon-blue top-[20%] right-[15%] opacity-10 animate-pulse-slow" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container text-center relative z-10">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full
                     bg-accent-500/10 border border-accent-500/20 text-accent-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          <span className="text-sm font-medium">CS Student &middot; Available for freelance work</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                     font-display font-extrabold leading-[1.05] mb-6"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text">Swornim</span>
          <br />
          <span className="gradient-text">Karki</span>
          <span className="text-white"> — I Build</span>
          <br />
          <span className="text-white">The </span>
          <span className="gradient-text">Future</span>
          <motion.span
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
            className="inline-block ml-2"
          >
            <Sparkles className="w-8 h-8 lg:w-12 lg:h-12 text-accent-400 inline" />
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed mb-10"
        >
          Computer Science student & aspiring full-stack developer passionate about crafting
          performant, scalable, and visually stunning web applications. Turning ideas into reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <GradientButton href="#projects" variant="primary" size="lg">
            View My Work
          </GradientButton>
          <GradientButton href="#contact" variant="outline" size="lg">
            Let's Talk
          </GradientButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: 'https://github.com/KarkeySk/portfolio', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]
                       text-gray-400 hover:text-white hover:bg-white/[0.08]
                       hover:border-accent-500/30 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-accent-400 transition-colors"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
