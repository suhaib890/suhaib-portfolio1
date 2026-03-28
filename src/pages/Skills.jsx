import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolioData';
const G = '#0F3D3E';

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  return (
    <div className="page-enter">
      <div className="section-alt pt-32 pb-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color:G }}>Expertise</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#111827] mb-4">Skills & Technologies</h1>
          <p className="text-lg max-w-xl mx-auto text-[#6B7280]">The tools I use to transform raw data into intelligent solutions</p>
        </div>
      </div>
      <section className="py-16 bg-white" ref={ref}>
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
          <div>
            <h3 className="font-display font-semibold text-[#111827] text-lg mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:G, boxShadow:'0 3px 10px rgba(15,61,62,0.22)' }}>
                <span className="text-xs text-white">⚡</span></span> Core Proficiencies
            </h3>
            <div className="space-y-5">
              {skills.core.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity:0, x:-18 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:i*0.09 }}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-sm font-semibold text-[#374151]">{s.name}</span>
                    </div>
                    <span className="text-sm font-mono font-bold" style={{ color:G }}>{s.level}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background:'#E6F4F1' }}>
                    <motion.div initial={{ width:0 }} animate={inView ? { width:`${s.level}%` } : {}}
                      transition={{ duration:1.1, delay:i*0.09+0.3, ease:'easeOut' }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ background:`linear-gradient(90deg, ${G}, #155F61, ${G})` }}>
                      <motion.div animate={{ x:['-100%','300%'] }}
                        transition={{ duration:2.2, delay:i*0.09+1.4, repeat:Infinity, ease:'linear' }}
                        className="absolute inset-y-0 w-1/4 bg-white/30 shimmer"/>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-[#111827] text-lg mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:G }}>
                <span className="text-xs text-white">🔧</span></span> Technical Stack
            </h3>
            {Object.entries(skills.technical).map(([cat, items], i) => (
              <motion.div key={cat} initial={{ opacity:0, y:18 }} animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ delay:i*0.1+0.2 }} className="glass p-5">
                <p className="text-xs font-mono font-bold uppercase tracking-wider mb-3" style={{ color:G }}>{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <motion.span key={item} whileHover={{ scale:1.07, y:-2 }}
                      className="px-3 py-1 rounded-lg text-xs font-mono border cursor-default transition-all"
                      style={{ background:'#F8FAFC', borderColor:'#E5E7EB', color:'#6B7280' }}
                      onMouseEnter={e => { e.currentTarget.style.background='rgba(15,61,62,0.07)'; e.currentTarget.style.borderColor='rgba(15,61,62,0.22)'; e.currentTarget.style.color=G; }}
                      onMouseLeave={e => { e.currentTarget.style.background='#F8FAFC'; e.currentTarget.style.borderColor='#E5E7EB'; e.currentTarget.style.color='#6B7280'; }}>
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-alt py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center font-mono text-xs tracking-widest uppercase mb-8 text-[#9CA3AF]">Tech I Work With</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['🐍 Python','🗄️ SQL','📊 Power BI','📗 Excel','🤖 Scikit-learn','📈 Tableau','🔬 Pandas','☁️ Google Colab','🐙 Git/GitHub','📉 NumPy','📌 Matplotlib','🔥 Seaborn'].map((item,i) => (
              <motion.div key={item} whileHover={{ scale:1.1, y:-4 }}
                animate={{ y:[0,-3,0] }} transition={{ duration:3, delay:i*0.22, repeat:Infinity, ease:'easeInOut' }}
                className="glass px-4 py-2.5 text-sm cursor-default shadow-sm text-[#6B7280]"
                onMouseEnter={e => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; e.currentTarget.style.background='rgba(15,61,62,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'; e.currentTarget.style.color='#6B7280'; e.currentTarget.style.background='rgba(255,255,255,0.65)'; }}>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
