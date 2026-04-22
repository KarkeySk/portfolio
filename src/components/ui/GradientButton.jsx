import { motion } from 'framer-motion';

export default function GradientButton({
  children,
  onClick,
  href,
  variant = 'primary', // 'primary' | 'outline' | 'ghost'
  size = 'md',          // 'sm' | 'md' | 'lg'
  className = '',
  icon: Icon,
  disabled = false,
  type = 'button',
  ...props
}) {
  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const variants = {
    primary: 'glow-button',
    outline: 'outline-button',
    ghost: 'px-6 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300',
  };

  const baseClass = `${variants[variant]} ${sizes[size]} inline-flex items-center justify-center gap-2.5 font-semibold ${className}`;

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      <Component
        href={href}
        onClick={onClick}
        className={`${baseClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
        type={href ? undefined : type}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </Component>
    </motion.div>
  );
}
