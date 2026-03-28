import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Target, Sparkles, TrendingUp, Code2, Github, Linkedin, Mail, Phone, MapPin, GraduationCap, BookOpen, School } from 'lucide-react';
import { person, stats, education } from '../data/portfolioData';

const G = '#0F3D3E';

const eduIcons = [GraduationCap, BookOpen, School];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="page-enter">
      {/* Page header */}
      <div className="section-alt pt-32 pb-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color:G }}>Who Am I</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#111827] mb-4">About Me</h1>
          <p className="text-lg max-w-xl mx-auto text-[#6B7280]">A data enthusiast on a mission to turn numbers into impact</p>
        </div>
      </div>

      {/* Bio + Avatar */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              className="flex justify-center">
              <div className="relative">

                {/* Outer glowing ring */}
                <div className="w-64 h-64 rounded-full p-[3px] relative"
                  style={{
                    background: 'conic-gradient(from 0deg, #0F3D3E 0%, #E6F4F1 30%, #0F3D3E 60%, #E6F4F1 80%, #0F3D3E 100%)',
                    animation: 'spinRing 14s linear infinite',
                  }}>
                  <div className="w-full h-full rounded-full bg-white" />
                </div>

                {/* Photo on top, inset */}
                <div className="absolute inset-[5px] rounded-full overflow-hidden profile-img-wrap img-glow"
                  style={{
                    border: '2px solid rgba(15,61,62,0.14)',
                    boxShadow: '0 8px 40px rgba(15,61,62,0.18), inset 0 0 0 1px rgba(255,255,255,0.4)',
                  }}>
                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(15,61,62,0.22), transparent)' }} />
                  {/* Name label at bottom */}
                  <div className="absolute bottom-3 left-0 right-0 z-20 text-center">
                    <span className="text-white text-xs font-mono font-semibold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(15,61,62,0.70)', backdropFilter: 'blur(8px)' }}>
                      Suhaib Ashraf
                    </span>
                  </div>
                  <img
                    src="/suhaib-profile.jpg"
                    alt="Suhaib Ashraf"
                    className="profile-img"
                  />
                </div>

                {/* Soft ambient glow */}
                <div className="absolute -inset-4 rounded-full -z-10 blur-2xl"
                  style={{ background: 'rgba(15,61,62,0.08)' }} />

                {/* Status badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full text-xs font-mono font-semibold shadow-lg whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(15,61,62,0.18)',
                    color: '#166534',
                  }}>
                  🟢 Open to Work
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="space-y-5">
              <h2 className="font-display font-bold text-2xl text-[#111827] mb-3">Hello, I'm {person.name} 👋</h2>
              <p className="text-base leading-relaxed text-[#6B7280]">{person.bio}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { icon:Mail,  text:person.email,  href:`mailto:${person.email}` },
                  { icon:Phone, text:person.phone,  href:`tel:${person.phone}` },
                  { icon:MapPin,text:person.location,href:null },
                ].map(({ icon:Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm"
                    style={{ borderColor:'rgba(15,61,62,0.18)', background:'rgba(15,61,62,0.04)' }}>
                    <Icon size={13} style={{ color:G }}/> 
                    {href ? <a href={href} className="text-[#374151]">{text}</a> : <span className="text-[#374151]">{text}</span>}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-1">
                {[
                  { icon:Github,   href:person.github },
                  { icon:Linkedin, href:person.linkedin },
                  { icon:Mail,     href:`mailto:${person.email}` },
                ].map(({ icon:Icon, href }, i) => (
                  <motion.a key={i} href={href} target="_blank" rel="noreferrer" whileHover={{ scale:1.12, y:-2 }}
                    className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center transition-all"
                    style={{ borderColor:'#E5E7EB', color:'#9CA3AF' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='#E5E7EB'; e.currentTarget.style.color='#9CA3AF'; }}>
                    <Icon size={16}/>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="section-alt py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              { icon:Target,    title:'Career Objective', text:'To leverage data analytics, AI, and machine learning to deliver impactful insights and build intelligent systems that drive real-world decisions.' },
              { icon:Sparkles,  title:'Who I Am',         text:'An aspiring Data Analyst with hands-on experience in Python, SQL, Power BI, and ML — passionate about turning messy datasets into meaningful narratives.' },
              { icon:TrendingUp,title:'What Drives Me',   text:"The moment a model learns from data and makes a smart prediction. I'm relentlessly curious about AI and how it's reshaping our world." },
            ].map((c,i) => (
              <motion.div key={c.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.12 }} className="glass p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background:G, boxShadow:'0 4px 14px rgba(15,61,62,0.22)' }}>
                  <c.icon size={18} className="text-white"/>
                </div>
                <h3 className="font-display font-semibold text-[#111827] mb-2">{c.title}</h3>
                <p className="text-sm leading-relaxed text-[#6B7280]">{c.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick info */}
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="glass p-6 max-w-2xl mx-auto" ref={ref}>
            <h3 className="font-display font-semibold text-[#111827] mb-4 flex items-center gap-2">
              <Code2 size={16} style={{ color:G }}/> Quick Info
            </h3>
            {[
              ['Name',     person.name],
              ['Email',    person.email],
              ['Phone',    person.phone],
              ['Location', 'India 🇮🇳'],
              ['Degree',   'BCA – Galgotias University (Pursuing)'],
              ['Focus',    'Data Analytics & AI/ML'],
              ['Status',   '🟢 Actively Seeking Roles'],
            ].map(([k,v]) => (
              <div key={k} className="flex items-center justify-between py-2.5 border-b border-[#F3F4F6] last:border-0">
                <span className="text-sm font-mono text-[#9CA3AF]">{k}</span>
                <span className="text-sm font-body text-[#374151]">{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s,i) => (
              <motion.div key={s.label} initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ delay:i*0.1+0.2 }} className="glass text-center py-7">
                <p className="font-display font-bold text-4xl gradient-text mb-1">
                  {inView && <CountUp end={s.value} duration={2}/>}{s.suffix}
                </p>
                <p className="text-sm text-[#6B7280]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education Timeline ─────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">

          {/* Section header */}
          <div className="text-center mb-16">
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: G }}>Academic Journey</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#111827] mb-3">Education</h2>
            <p className="text-[#6B7280] max-w-md mx-auto text-base">
              My academic foundation in computing, data science, and artificial intelligence
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">

            {/* Vertical spine */}
            <div className="absolute left-[27px] top-6 bottom-6 w-[2px] rounded-full"
              style={{ background: 'linear-gradient(to bottom, #0F3D3E 0%, rgba(15,61,62,0.25) 60%, transparent 100%)' }} />

            <div className="space-y-6">
              {education.map((edu, i) => {
                const EduIcon = eduIcons[i] || GraduationCap;
                const isPursuing = edu.status === 'Pursuing';

                return (
                  <motion.div key={edu.id}
                    initial={{ opacity: 0, x: -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.18, duration: 0.55, ease: 'easeOut' }}
                    className="relative flex gap-5 items-start"
                  >
                    {/* Timeline icon dot */}
                    <div className="relative z-10 flex-shrink-0 mt-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: isPursuing
                            ? `linear-gradient(135deg, ${G}, #155F61)`
                            : 'linear-gradient(135deg, #155F61, #1a7577)',
                          boxShadow: isPursuing
                            ? '0 6px 20px rgba(15,61,62,0.32)'
                            : '0 4px 14px rgba(15,61,62,0.20)',
                        }}>
                        <EduIcon size={22} className="text-white" />
                      </div>
                      {/* Pulse ring on pursuing */}
                      {isPursuing && (
                        <motion.div
                          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{ border: '2px solid rgba(15,61,62,0.35)' }}
                        />
                      )}
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -3, boxShadow: '0 16px 48px rgba(15,61,62,0.12)' }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 rounded-2xl overflow-hidden"
                      style={{
                        background: isPursuing
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(230,244,241,0.40))'
                          : 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(12px)',
                        border: isPursuing
                          ? '1px solid rgba(15,61,62,0.22)'
                          : '1px solid rgba(15,61,62,0.10)',
                        boxShadow: isPursuing
                          ? '0 8px 32px rgba(15,61,62,0.09)'
                          : '0 4px 20px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Top accent bar */}
                      <div className="h-1 w-full"
                        style={{
                          background: isPursuing
                            ? `linear-gradient(90deg, ${G}, #155F61, rgba(15,61,62,0.2))`
                            : 'linear-gradient(90deg, #155F61, rgba(21,95,97,0.2))',
                        }} />

                      <div className="p-6">
                        {/* Row 1: degree + badges */}
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-bold text-[#111827] text-lg leading-tight mb-1">
                              {edu.degree}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-sm" style={{ color: G }}>
                                {edu.institution}
                              </p>
                              <span className="text-[#D1D5DB]">•</span>
                              <div className="flex items-center gap-1 text-xs text-[#9CA3AF] font-mono">
                                <MapPin size={11} />
                                {edu.location}
                              </div>
                            </div>
                          </div>

                          {/* Right badges */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            {/* Year pill */}
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-full"
                              style={{
                                background: isPursuing ? 'rgba(15,61,62,0.08)' : '#F0FDF4',
                                color: isPursuing ? G : '#166534',
                                border: isPursuing ? '1px solid rgba(15,61,62,0.20)' : '1px solid #BBF7D0',
                              }}>
                              📅 {edu.duration || edu.year}
                            </span>

                            {/* Status badge */}
                            {isPursuing ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                                style={{ background: '#DCFCE7', color: '#166534', border: '1px solid #86EFAC' }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Currently Pursuing
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                                style={{ background: 'rgba(15,61,62,0.07)', color: G, border: '1px solid rgba(15,61,62,0.18)' }}>
                                ✓ Completed
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px mb-4"
                          style={{ background: isPursuing ? 'rgba(15,61,62,0.10)' : '#F3F4F6' }} />

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-[#6B7280] mb-4">
                          {edu.description}
                        </p>

                        {/* Subjects / key topics */}
                        {edu.subjects && edu.subjects.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {edu.subjects.map(subj => (
                              <span key={subj}
                                className="text-xs font-mono px-2.5 py-1 rounded-lg"
                                style={{
                                  background: isPursuing ? 'rgba(15,61,62,0.06)' : '#F8FAFC',
                                  color: isPursuing ? G : '#6B7280',
                                  border: `1px solid ${isPursuing ? 'rgba(15,61,62,0.14)' : '#E5E7EB'}`,
                                }}>
                                {subj}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Footer row: passing year */}
                        <div className="flex items-center flex-wrap gap-3">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold"
                            style={{
                              background: isPursuing ? 'rgba(15,61,62,0.06)' : '#F8FAFC',
                              color: isPursuing ? G : '#374151',
                              border: `1px solid ${isPursuing ? 'rgba(15,61,62,0.14)' : '#E5E7EB'}`,
                            }}>
                            {isPursuing ? '🎯 Expected Year:' : '📅 Passing Year:'}&nbsp;
                            <span style={{ color: isPursuing ? G : '#111827' }}>
                              {edu.passingYear}
                            </span>
                          </div>
                          {edu.cgpa && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold"
                              style={{ background: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' }}>
                              ⭐ CGPA: {edu.cgpa}
                            </div>
                          )}
                          {edu.percentage && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold"
                              style={{ background: 'rgba(15,61,62,0.06)', color: G, border: '1px solid rgba(15,61,62,0.18)' }}>
                              📊 Score: {edu.percentage}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
