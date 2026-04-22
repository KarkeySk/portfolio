import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-16 lg:mb-20"
    >
      {label && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] uppercase
                         text-accent-300 bg-accent-500/10 border border-accent-500/20 rounded-full">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
          {description}
        </p>
      )}
      <div className="accent-line w-24 mx-auto mt-6" />
    </motion.div>
  );
}
