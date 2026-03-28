import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/portfolioData';
const G = '#0F3D3E';

export default function Projects() {
  return (
    <div className="page-enter">
      <div className="section-alt pt-32 pb-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color:G }}>My Work</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#111827] mb-4">Featured Projects</h1>
          <p className="text-lg max-w-xl mx-auto text-[#6B7280]">Real-world data problems solved with code and creativity</p>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p,i) => (
              <motion.div key={p.id} initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.09 }} whileHover={{ y:-7 }}
                className="group glass p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                    style={{ color:G, borderColor:'rgba(15,61,62,0.22)', background:'rgba(15,61,62,0.07)' }}>{p.tag}</span>
                  <div className="flex gap-2">
                    {[{ href:p.github,Icon:Github },{ href:p.demo,Icon:ExternalLink }].map(({ href,Icon },j) => (
                      <motion.a key={j} href={href} target="_blank" rel="noreferrer" whileHover={{ scale:1.15 }}
                        className="w-8 h-8 rounded-lg border bg-white flex items-center justify-center transition-all"
                        style={{ borderColor:'#E5E7EB', color:'#9CA3AF' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='#E5E7EB'; e.currentTarget.style.color='#9CA3AF'; }}>
                        <Icon size={13}/>
                      </motion.a>
                    ))}
                  </div>
                </div>
                <h3 className="font-display font-bold text-[#111827] text-base mb-2 group-hover:text-[#0F3D3E] transition-colors">{p.title}</h3>
                <p className="text-sm leading-relaxed mb-4 text-[#6B7280]">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tools.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-mono border bg-white"
                      style={{ borderColor:'#E5E7EB', color:'#6B7280' }}>{t}</span>
                  ))}
                </div>
                <motion.div initial={{ scaleX:0 }} whileHover={{ scaleX:1 }}
                  className="mt-4 h-px origin-left"
                  style={{ background:`linear-gradient(90deg, ${G}, transparent)` }} />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} className="flex justify-center mt-12">
            <motion.a href="https://github.com/suhaib890" target="_blank" rel="noreferrer" whileHover={{ scale:1.05 }} className="btn-outline">
              <Github size={16}/> View All on GitHub
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
