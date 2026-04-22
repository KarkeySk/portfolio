import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection, { fadeUp } from './ui/AnimatedSection';

const projects = [
  {
    title: 'NexusAI Platform',
    description: 'A cutting-edge AI-powered SaaS platform with real-time analytics, team collaboration, and automated workflows. Built for scale.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'OpenAI', 'eSewa'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://example.com',
    featured: true,
  },
  {
    title: 'CryptoVault Dashboard',
    description: 'Real-time cryptocurrency portfolio tracker with advanced charting, price alerts, and multi-wallet support.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
    tags: ['Next.js', 'TypeScript', 'WebSocket', 'TradingView'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://example.com',
    featured: true,
  },
  {
    title: 'Artisan E-Commerce',
    description: 'Premium e-commerce platform with 3D product visualization, AR try-on, and intelligent recommendations.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    tags: ['React', 'Three.js', 'eSewa', 'Supabase'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://example.com',
    featured: false,
  },
  {
    title: 'HealthSync App',
    description: 'Comprehensive health & fitness tracking app with wearable integrations, meal planning, and AI coaching.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    tags: ['React Native', 'Firebase', 'ML Kit', 'Node.js'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://example.com',
    featured: false,
  },
  {
    title: 'DevCollab IDE',
    description: 'Browser-based collaborative code editor with real-time multi-cursor editing, terminal, and Git integration.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    tags: ['Next.js', 'WebRTC', 'Monaco', 'Docker'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://example.com',
    featured: false,
  },
  {
    title: 'AutoFlow CRM',
    description: 'Intelligent CRM with automated lead scoring, pipeline management, email sequences, and reporting dashboards.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    tags: ['Vue.js', 'Django', 'Celery', 'Redis'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://example.com',
    featured: false,
  },
];

function ProjectCard({ project, index }) {
  const isFeatured = project.featured;

  return (
    <motion.div
      variants={fadeUp}
      className={`glass-card overflow-hidden group ${
        isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-700
                   group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent
                      opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Links overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4
                      opacity-0 group-hover:opacity-100 transition-all duration-500">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-dark-950/80 backdrop-blur-sm border border-white/10
                     text-white hover:bg-accent-500/20 hover:border-accent-500/30 transition-all"
            aria-label={`${project.title} GitHub`}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-dark-950/80 backdrop-blur-sm border border-white/10
                     text-white hover:bg-accent-500/20 hover:border-accent-500/30 transition-all"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold
                        bg-accent-500/90 backdrop-blur-sm text-white rounded-full
                        flex items-center gap-1.5">
            <ArrowUpRight className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-white mb-2
                     group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium text-accent-300
                       bg-accent-500/10 border border-accent-500/15 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <AnimatedSection id="projects" className="relative">
      <div className="floating-orb w-[500px] h-[500px] bg-pink-500 bottom-[10%] left-[-15%] opacity-[0.05]" />

      <div className="section-container">
        <SectionHeading
          label="Portfolio"
          title="Featured Projects"
          description="A curated selection of projects that showcase my expertise in full-stack development."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
