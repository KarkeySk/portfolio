import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-5 z-50"
      >
        <div className="mx-auto flex h-16 w-[min(1120px,calc(100%-32px))] items-center justify-between rounded-t-[2rem] border border-cyan-300/10 border-b-transparent bg-[#06131d]/85 px-6 backdrop-blur-xl sm:px-10">
          <a href="#hero" className="text-xl font-display font-extrabold tracking-wide text-white">
            Swornim<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-colors duration-300 ${
                  link.label === 'Home' ? 'text-cyan-400' : 'text-white/85 hover:text-cyan-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-xl border border-cyan-300/15 p-2 text-cyan-200 transition-colors hover:bg-cyan-400/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-40 rounded-3xl border border-cyan-300/10 bg-[#06131d]/95 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="block rounded-2xl px-4 py-3 text-center text-base font-bold text-white/85 transition-colors hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
