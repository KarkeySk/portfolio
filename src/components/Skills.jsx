import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection, { fadeUp } from './ui/AnimatedSection';

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-accent-500 to-pink-500',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 88 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    title: 'Backend',
    color: 'from-neon-blue to-accent-500',
    skills: [
      { name: 'Node.js / Express', level: 92 },
      { name: 'Python / Django', level: 85 },
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'GraphQL', level: 80 },
    ],
  },
  {
    title: 'DevOps & Tools',
    color: 'from-pink-500 to-neon-orange',
    skills: [
      { name: 'Docker / K8s', level: 82 },
      { name: 'AWS / Vercel', level: 88 },
      { name: 'CI/CD Pipelines', level: 85 },
      { name: 'Git / GitHub', level: 95 },
      { name: 'Supabase / Firebase', level: 90 },
    ],
  },
];

function SkillBar({ name, level, color, delay }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-xs font-mono text-gray-500">{level}%</span>
      </div>
      <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="relative">
      {/* Ambient orb */}
      <div className="floating-orb w-[400px] h-[400px] bg-accent-500 top-[10%] right-[-10%] opacity-[0.06]" />

      <div className="section-container">
        <SectionHeading
          label="Tech Stack"
          title="Skills & Expertise"
          description="Mastering the tools and technologies that power modern web development."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              className="glass-card p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                <h3 className="text-lg font-display font-semibold text-white">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-5">
                {category.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    delay={catIdx * 2 + i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
