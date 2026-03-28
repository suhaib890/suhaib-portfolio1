import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react';
import { person } from '../data/portfolioData';

export default function Footer({ onNavigate }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const G = '#0F3D3E';

  return (
    <footer className="relative" style={{ background: '#0F3D3E' }}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <p className="font-display font-bold text-2xl text-white mb-1">{person.name}</p>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.60)' }}>{person.title}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '260px' }}>
              Passionate about data, AI, and building intelligent systems that drive real-world impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-mono font-semibold tracking-widest uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.45)' }}>Quick Links</p>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {['Home','About','Skills','Projects','Certifications','Contact'].map(label => (
                <button key={label}
                  onClick={() => onNavigate && onNavigate(label === 'Home' ? '/' : `/${label.toLowerCase()}`)}
                  className="text-left text-sm transition-colors font-medium"
                  style={{ color: 'rgba(255,255,255,0.60)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.60)'}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono font-semibold tracking-widest uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.45)' }}>Get In Touch</p>
            <div className="space-y-3">
              {[
                { icon: Mail,   text: person.email,    href: `mailto:${person.email}` },
                { icon: Phone,  text: person.phone,    href: `tel:${person.phone}`    },
                { icon: MapPin, text: person.location, href: null                     },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <Icon size={13} style={{ color: 'rgba(255,255,255,0.70)' }} />
                  </div>
                  {href
                    ? <a href={href} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.60)' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.60)'}>{text}</a>
                    : <span className="text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>{text}</span>}
                </div>
              ))}

              {/* Social */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: Github,   href: person.github,              label: 'GitHub'   },
                  { icon: Linkedin, href: person.linkedin,             label: 'LinkedIn' },
                  { icon: Mail,     href: `mailto:${person.email}`,    label: 'Email'    },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.20)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                    title={label}>
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.40)' }}>
            © {new Date().getFullYear()} {person.name}. All rights reserved.
          </p>
          <p className="text-xs font-mono flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Built with <Heart size={11} style={{ color: '#E6F4F1' }} fill="#E6F4F1" /> using React + Vite + Tailwind
          </p>
          <motion.button onClick={scrollTop} whileHover={{ scale: 1.08, y: -2 }}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
            style={{ color: 'rgba(255,255,255,0.50)', border: '1px solid rgba(255,255,255,0.15)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.50)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}>
            <ArrowUp size={12} /> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
