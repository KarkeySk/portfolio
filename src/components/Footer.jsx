import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';

const footerLinks = {
  Navigation: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
  ],
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'Mobile Apps', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
    { label: 'Consulting', href: '#services' },
  ],
  Resources: [
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
};

const socials = [
  { icon: Github, href: 'https://github.com/KarkeySk/portfolio', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Top gradient line */}
      <div className="accent-line w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-pink-500
                            flex items-center justify-center shadow-lg shadow-accent-500/25">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Swornim<span className="gradient-text">.dev</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              CS student & aspiring full-stack developer passionate about creating exceptional
              digital experiences. Let's build something amazing together.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06]
                           text-gray-400 hover:text-white hover:bg-white/[0.08]
                           hover:border-accent-500/30 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-accent-400
                               transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} Swornim Karki.
    
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]
                     text-gray-400 hover:text-accent-400 hover:border-accent-500/30
                     transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
