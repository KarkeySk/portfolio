import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection, { fadeUp } from './ui/AnimatedSection';

const projects = [
  {
    title: 'Vehicle Rental System',
    description: 'A college coursework project for managing vehicle listings, bookings, customer records, and rental workflow operations.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop',
    tags: ['Java', 'OOP', 'Database', 'Coursework'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://github.com/KarkeySk',
    featured: true,
  },
  {
    title: 'Inventory Management System',
    description: 'A semester project focused on tracking products, stock levels, sales records, and inventory updates for small businesses.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
    tags: ['React', 'Database', 'CRUD', 'Semester Project'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://github.com/KarkeySk',
    featured: true,
  },
  {
    title: 'Bhatbhatify Web App',
    description: 'A sprint-based college project inspired by retail shopping workflows, including planning, reporting, and web app implementation.',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=500&fit=crop',
    tags: ['React', 'Supabase', 'Report', 'Sprint Project'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://github.com/KarkeySk',
    featured: true,
  },
  {
    title: 'Weather App',
    description: 'A frontend college practice project that displays weather information with a clean interface and responsive layout.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://github.com/KarkeySk',
    featured: false,
  },
  {
    title: 'Recipe Finder Web Application',
    description: 'A web development assignment for searching recipes, presenting results, and practicing user-friendly UI structure.',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=500&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript', 'Assignment'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://github.com/KarkeySk',
    featured: false,
  },
  {
    title: 'Banking Application',
    description: 'An object-oriented programming college project for basic account handling, transactions, and banking operations.',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=500&fit=crop',
    tags: ['Java', 'OOP', 'File Handling', 'College Project'],
    github: 'https://github.com/KarkeySk/portfolio',
    live: 'https://github.com/KarkeySk',
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
          description="College coursework and semester projects that show my learning journey across web development, OOP, databases, and practical software systems."
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
