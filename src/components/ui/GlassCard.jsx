import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  ...props
}) {
  return (
    <motion.div
      className={`
        glass-card p-6 lg:p-8
        ${glow ? 'hover:shadow-accent-500/20 hover:shadow-2xl' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -6, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
