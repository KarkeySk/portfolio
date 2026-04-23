import { motion } from 'framer-motion';
import { Facebook, Github, Linkedin } from 'lucide-react';
import GradientButton from './ui/GradientButton';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Github, href: 'https://github.com/KarkeySk/portfolio', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/swornim-karki-782362405', label: 'LinkedIn' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-0 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="floating-orb bottom-[-12rem] left-1/2 h-[34rem] w-[70rem] -translate-x-1/2 bg-cyan-400/40" />
        <div className="floating-orb left-[-12rem] top-1/3 h-[28rem] w-[28rem] bg-cyan-500/20" />
      </div>

      <div className="portfolio-shell min-h-[620px]">
        <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-55 grayscale"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=900&fit=crop&crop=faces')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06131d] via-[#06131d]/35 to-[#06131d]/10" />
          <div className="absolute inset-0 bg-cyan-500/15 mix-blend-screen" />
          <div className="absolute left-[24%] top-[22%] h-36 w-20 rotate-[17deg] rounded-full bg-cyan-400/45 blur-lg" />
          <div className="absolute left-[33%] top-[17%] h-32 w-3 rotate-[18deg] rounded-full bg-cyan-300/70 blur-[2px]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#06131d] to-transparent" />
        </div>

        <div className="relative z-10 flex min-h-[620px] items-center px-8 pb-12 pt-24 sm:px-16 lg:w-[58%] lg:px-24 lg:pt-20">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300/80"
            >
              Portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="text-4xl font-display font-extrabold leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl"
            >
              Hi, I&apos;m Swornim Karki
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-3 text-2xl font-display font-extrabold text-cyan-400 sm:text-3xl"
            >
              Frontend Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-7 max-w-lg text-base font-medium leading-7 text-white/80"
            >
              Computer Science student building clean, responsive, and practical web applications.
              I enjoy turning college projects and client ideas into polished digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <GradientButton href="#contact" variant="primary" size="md">
                Hire Me
              </GradientButton>
              <GradientButton href="#contact" variant="outline" size="md">
                Let&apos;s Talk
              </GradientButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-24 flex items-center gap-5"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/45 text-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-lg hover:shadow-cyan-400/30"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
