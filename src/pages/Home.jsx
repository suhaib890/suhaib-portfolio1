import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, ArrowDown, ChevronRight, BarChart2, Brain, Database } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { person, stats } from '../data/portfolioData';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const G = '#0F3D3E';
const highlights = [
  { icon: Database,  label: 'Data Analytics', desc: 'SQL, Power BI, Excel' },
  { icon: Brain,     label: 'AI / ML',         desc: 'Python, Scikit-learn' },
  { icon: BarChart2, label: 'Visualization',   desc: 'Tableau, Matplotlib'  },
];

export default function Home({ onNavigate }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="page-enter">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid">
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[130px]"
            style={{ background: 'rgba(15,61,62,0.06)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[110px]"
            style={{ background: 'rgba(21,95,97,0.05)' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-14">

            {/* ── Text ── */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono mb-6 border"
                  style={{ borderColor:'rgba(15,61,62,0.25)', background:'rgba(15,61,62,0.06)', color:G }}>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Open to Opportunities
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
                className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-4 text-[#111827]">
                Hi, I'm <span className="gradient-text">Suhaib</span><br />Ashraf
              </motion.h1>

              <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
                className="text-xl md:text-2xl font-display font-semibold mb-5 text-[#6B7280]">
                <TypeAnimation
                  sequence={['Aspiring Data Analyst',2000,'AI / ML Learner',2000,'Python & SQL Developer',2000,'Intelligent Systems Builder',2000]}
                  repeat={Infinity} style={{ color: G }} />
              </motion.div>

              <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }}
                className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 text-[#6B7280]">
                {person.bio.slice(0, 165)}...
              </motion.p>

              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.4 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <a href="/suhaib-ashraf-cv.pdf" download className="btn-green">
                  <Download size={17} /> Download CV
                </a>
                <button onClick={() => onNavigate('/contact')} className="btn-outline">
                  <Mail size={17} /> Contact Me
                </button>
              </motion.div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                className="flex items-center gap-3 justify-center lg:justify-start">
                {[
                  { icon: Github,   href: person.github,              label: 'GitHub'   },
                  { icon: Linkedin, href: person.linkedin,             label: 'LinkedIn' },
                  { icon: Mail,     href: `mailto:${person.email}`,    label: 'Email'    },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer" whileHover={{ scale:1.15, y:-2 }}
                    className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center transition-all"
                    style={{ borderColor:'#E5E7EB', color:'#9CA3AF' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; e.currentTarget.style.background='rgba(15,61,62,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='#E5E7EB'; e.currentTarget.style.color='#9CA3AF'; e.currentTarget.style.background='#fff'; }}>
                    <Icon size={16} />
                  </motion.a>
                ))}
                <span className="text-sm font-mono ml-1 text-[#9CA3AF]">@suhaib-ashraf</span>
              </motion.div>
            </div>

            {/* ── Profile Photo ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, x: 30 }}
              animate={{ opacity: 1, scale: 1,    x: 0  }}
              transition={{ duration: 0.75, delay: 0.25, ease: 'easeOut' }}
              className="relative flex-shrink-0 flex justify-center"
            >
              {/* Outer decorative ring — spinning */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">

                {/* Spinning conic ring */}
                <div className="absolute inset-0 rounded-full spin-ring"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0%, #0F3D3E 25%, #E6F4F1 50%, #0F3D3E 75%, transparent 100%)',
                    padding: '3px',
                    borderRadius: '50%',
                  }}>
                  <div className="w-full h-full rounded-full bg-white" />
                </div>

                {/* Glass overlay ring (static, soft) */}
                <div className="absolute inset-[3px] rounded-full border-2 pointer-events-none z-10"
                  style={{ borderColor: 'rgba(255,255,255,0.55)' }} />

                {/* Actual photo */}
                <div className="absolute inset-[6px] rounded-full overflow-hidden profile-img-wrap img-glow"
                  style={{
                    boxShadow: '0 8px 40px rgba(15,61,62,0.20), inset 0 0 0 2px rgba(15,61,62,0.10)',
                    border: '2px solid rgba(15,61,62,0.12)',
                  }}>
                  {/* Subtle glass overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 z-10 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(15,61,62,0.18), transparent)',
                      backdropFilter: 'blur(0px)',
                    }} />
                  <img
                    src="/suhaib-profile.jpg"
                    alt="Suhaib Ashraf — Data Analyst & AI/ML Learner"
                    className="profile-img"
                  />
                </div>

                {/* Ambient glow behind */}
                <div className="absolute inset-0 rounded-full -z-10 scale-125 blur-3xl"
                  style={{ background: 'rgba(15,61,62,0.09)' }} />

                {/* Floating badge chips */}
                {[
                  {
                    content: <><span className="font-mono font-semibold" style={{ color: G }}>Python</span><span className="ml-1 text-[#6B7280]">+ ML</span></>,
                    pos: 'absolute -right-5 top-10',
                    yAnim: [-8, 0, -8],
                  },
                  {
                    content: <><span className="font-mono font-semibold" style={{ color: '#155F61' }}>Power BI</span><span className="ml-1 text-[#6B7280]">Dev</span></>,
                    pos: 'absolute -left-5 bottom-10',
                    yAnim: [8, 0, 8],
                  },
                  {
                    content: <span className="font-mono text-green-700 font-semibold">🟢 Open to Work</span>,
                    pos: 'absolute -top-2 left-10',
                    yAnim: [-5, 0, -5],
                  },
                ].map(({ content, pos, yAnim }, i) => (
                  <motion.div key={i}
                    animate={{ y: yAnim }}
                    transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                    className={`${pos} z-20 px-3 py-1.5 rounded-xl text-xs shadow-lg`}
                    style={{
                      background: 'rgba(255,255,255,0.90)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(15,61,62,0.14)',
                      boxShadow: '0 4px 16px rgba(15,61,62,0.10)',
                    }}>
                    {content}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior:'smooth' })}>
            <span className="text-xs font-mono tracking-widest text-[#9CA3AF]">SCROLL</span>
            <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.5, repeat:Infinity }}>
              <ArrowDown size={15} style={{ color:'rgba(15,61,62,0.5)' }}/>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Highlights ──────────────────────────────────────────── */}
      <section id="highlights" className="section-alt py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <motion.div key={h.label} initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="glass p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:G, boxShadow:'0 4px 14px rgba(15,61,62,0.22)' }}>
                  <h.icon size={20} className="text-white"/>
                </div>
                <div>
                  <p className="font-display font-semibold text-[#111827] mb-0.5">{h.label}</p>
                  <p className="text-sm text-[#6B7280]">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="py-14 bg-white" ref={ref}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity:0, y:18 }} animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ delay:i*0.1+0.2 }}
                className="glass text-center py-8 px-4">
                <p className="font-display font-bold text-4xl gradient-text mb-1">
                  {inView && <CountUp end={s.value} duration={2} />}{s.suffix}
                </p>
                <p className="text-sm text-[#6B7280]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-alt py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="glass p-12 text-center max-w-2xl mx-auto">
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color:G }}>Ready to Collaborate</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#111827] mb-4">
              Let's Turn Data into <span className="gradient-text">Decisions</span>
            </h2>
            <p className="text-base mb-8 text-[#6B7280]">
              Looking for a data-driven team member? I'm available for internships, full-time roles, and freelance projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => onNavigate('/contact')} className="btn-green">
                <Mail size={17}/> Get In Touch
              </button>
              <button onClick={() => onNavigate('/projects')} className="btn-outline">
                View Projects <ChevronRight size={16}/>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
