import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionWrapper({ children, id, className = '', alt = false }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`section-pad ${alt ? 'section-alt' : 'bg-white'} ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <p className="font-mono text-[#D4AF37] text-sm tracking-[0.2em] uppercase mb-3">{label}</p>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-[#111111] mb-4">{title}</h2>
      {subtitle && <p className="text-[#6B7280] font-body max-w-xl mx-auto text-lg">{subtitle}</p>}
    </div>
  );
}
