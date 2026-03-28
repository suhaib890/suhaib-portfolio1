import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import { person } from '../data/portfolioData';
const G = '#0F3D3E';

const socials = [
  { icon:Github,   label:'GitHub',   handle:'suhaib890',       href:person.github,           color:G       },
  { icon:Linkedin, label:'LinkedIn', handle:'suhaib-ashraf01', href:person.linkedin,          color:'#0077B5' },
  { icon:Mail,     label:'Email',    handle:person.email,      href:`mailto:${person.email}`, color:G       },
];

export default function Contact() {
  const [form,    setForm]    = useState({ name:'', email:'', subject:'', message:'' });
  const [errors,  setErrors]  = useState({});
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                    e.name    = 'Name is required';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email   = 'Valid email required';
    if (!form.subject.trim())                 e.subject = 'Subject is required';
    if (form.message.trim().length < 10)      e.message = 'Message must be at least 10 characters';
    return e;
  };

  const submit = ev => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

  const inputCls = field =>
    `w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all font-body ` +
    `bg-[#F8FAFC] text-[#374151] placeholder-[#9CA3AF] ` +
    (errors[field] ? 'border-red-400' : 'border-[#E5E7EB]');

  return (
    <div className="page-enter">
      <div className="section-alt pt-32 pb-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color:G }}>Get In Touch</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#111827] mb-4">Contact Me</h1>
          <p className="text-lg max-w-xl mx-auto text-[#6B7280]">Let's talk data, opportunities, or just say hello!</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Info panel */}
            <div className="lg:col-span-2 space-y-7">
              <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
                <h2 className="font-display font-bold text-2xl text-[#111827] mb-2">Let's Build Something Together</h2>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  Whether you're looking for a Data Analyst, an AI/ML enthusiast, or just want to discuss data — my inbox is always open.
                </p>
              </motion.div>

              <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
                className="space-y-3">
                {[
                  { icon:Mail,  text:person.email, href:`mailto:${person.email}` },
                  { icon:Phone, text:person.phone, href:`tel:${person.phone}`    },
                  { icon:MapPin,text:'India 🇮🇳',   href:null                    },
                ].map(({ icon:Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background:G, boxShadow:'0 4px 12px rgba(15,61,62,0.22)' }}>
                      <Icon size={15} className="text-white"/>
                    </div>
                    {href
                      ? <a href={href} className="text-sm transition-colors text-[#6B7280]"
                          onMouseEnter={e => e.currentTarget.style.color=G}
                          onMouseLeave={e => e.currentTarget.style.color='#6B7280'}>{text}</a>
                      : <span className="text-sm text-[#6B7280]">{text}</span>}
                  </div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
                className="space-y-3">
                <p className="text-xs font-mono tracking-widest uppercase text-[#9CA3AF]">Find Me On</p>
                {socials.map(({ icon:Icon, label, handle, href, color }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer" whileHover={{ x:5 }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border bg-white shadow-sm group transition-all"
                    style={{ borderColor:'#E5E7EB' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='rgba(15,61,62,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='#E5E7EB'}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background:`${color}12`, border:`1px solid ${color}28` }}>
                      <Icon size={15} style={{ color }}/>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111827] group-hover:text-[#0F3D3E] transition-colors">{label}</p>
                      <p className="text-xs font-mono text-[#9CA3AF]">{handle}</p>
                    </div>
                    <span className="ml-auto text-sm text-[#D1D5DB]">→</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Form */}
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              className="lg:col-span-3 glass p-8">
              {sent ? (
                <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background:G, boxShadow:'0 8px 24px rgba(15,61,62,0.28)' }}>
                    <CheckCircle size={32} className="text-white"/>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#111827]">Message Sent! 🎉</h3>
                  <p className="text-sm text-[#6B7280]">Thanks for reaching out. I'll reply within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name:'',email:'',subject:'',message:'' }); }}
                    className="mt-2 text-sm font-mono transition-colors" style={{ color:G }}
                    onMouseEnter={e => e.currentTarget.style.color='#155F61'}
                    onMouseLeave={e => e.currentTarget.style.color=G}>
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider mb-1.5 text-[#9CA3AF]">YOUR NAME</label>
                      <input type="text" value={form.name}
                        onChange={e => { setForm({...form,name:e.target.value}); setErrors({...errors,name:''}); }}
                        onFocus={e => { if(!errors.name) e.target.style.borderColor=G; }}
                        onBlur={e  => { if(!errors.name) e.target.style.borderColor='#E5E7EB'; }}
                        placeholder="Your Full Name" className={inputCls('name')}/>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-wider mb-1.5 text-[#9CA3AF]">EMAIL</label>
                      <input type="email" value={form.email}
                        onChange={e => { setForm({...form,email:e.target.value}); setErrors({...errors,email:''}); }}
                        onFocus={e => { if(!errors.email) e.target.style.borderColor=G; }}
                        onBlur={e  => { if(!errors.email) e.target.style.borderColor='#E5E7EB'; }}
                        placeholder="your@email.com" className={inputCls('email')}/>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-wider mb-1.5 text-[#9CA3AF]">SUBJECT</label>
                    <input type="text" value={form.subject}
                      onChange={e => { setForm({...form,subject:e.target.value}); setErrors({...errors,subject:''}); }}
                      onFocus={e => { if(!errors.subject) e.target.style.borderColor=G; }}
                      onBlur={e  => { if(!errors.subject) e.target.style.borderColor='#E5E7EB'; }}
                      placeholder="Data Analyst Opportunity / Collaboration" className={inputCls('subject')}/>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-wider mb-1.5 text-[#9CA3AF]">MESSAGE</label>
                    <textarea rows={5} value={form.message}
                      onChange={e => { setForm({...form,message:e.target.value}); setErrors({...errors,message:''}); }}
                      onFocus={e => { if(!errors.message) e.target.style.borderColor=G; }}
                      onBlur={e  => { if(!errors.message) e.target.style.borderColor='#E5E7EB'; }}
                      placeholder={`Hi Suhaib, I'd like to discuss a Data Analyst role...`}
                      className={`${inputCls('message')} resize-none`}/>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale:1.02, boxShadow:'0 12px 36px rgba(15,61,62,0.26)' }}
                    whileTap={{ scale:0.97 }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 font-semibold rounded-xl text-white transition-all disabled:opacity-70"
                    style={{ background:`linear-gradient(135deg, ${G}, #155F61)` }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.background='linear-gradient(135deg,#155F61,#1a7577)')}
                    onMouseLeave={e => !loading && (e.currentTarget.style.background=`linear-gradient(135deg,${G},#155F61)`)}>
                    {loading
                      ? <><motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"/> Sending...</>
                      : <><Send size={16}/> Send Message</>}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
