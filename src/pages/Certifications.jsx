import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, ExternalLink, X, Eye, Award,
  CheckCircle, ZoomIn, FileText, Calendar,
  Clock, User, Building2, Shield, ChevronLeft, ChevronRight
} from 'lucide-react';
import { certifications } from '../data/portfolioData';

const G = '#0F3D3E';

const catStyle = {
  'Networking':     { bg:'rgba(15,61,62,0.08)',  border:'rgba(15,61,62,0.22)',  text:G,          dot:'#0F3D3E' },
  'Data Analytics': { bg:'rgba(21,128,61,0.08)', border:'rgba(21,128,61,0.22)', text:'#166534',  dot:'#16a34a' },
  'Internship':     { bg:'rgba(124,58,237,0.07)', border:'rgba(124,58,237,0.2)', text:'#6d28d9', dot:'#7c3aed' },
  'Programming':    { bg:'rgba(15,61,62,0.08)',  border:'rgba(15,61,62,0.22)',  text:G,          dot:'#0F3D3E' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Full-screen PDF Modal with navigation between certificates
// ─────────────────────────────────────────────────────────────────────────────
function CertModal({ cert, certs, onClose, onNavigate }) {
  const idx     = certs.findIndex(c => c.id === cert.id);
  const hasPrev = idx > 0;
  const hasNext = idx < certs.length - 1;
  const cs      = catStyle[cert.category] || catStyle['Networking'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{   opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 md:p-6"
      style={{ background: 'rgba(5,20,20,0.82)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.90, y: 28 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{   opacity: 0, scale: 0.90, y: 28  }}
        transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
        className="relative w-full flex flex-col rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: '#ffffff', maxWidth: '860px', maxHeight: '94vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Modal header ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${G}, #155F61)` }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
              {cert.icon}
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-white text-sm leading-tight truncate">{cert.name}</p>
              <p className="text-xs font-mono mt-0.5 text-white/70">{cert.provider}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            {/* Nav: prev */}
            {hasPrev && (
              <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                onClick={() => onNavigate(certs[idx-1])}
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.20)' }}
                title="Previous">
                <ChevronLeft size={15} className="text-white" />
              </motion.button>
            )}
            {/* Nav: next */}
            {hasNext && (
              <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                onClick={() => onNavigate(certs[idx+1])}
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.20)' }}
                title="Next">
                <ChevronRight size={15} className="text-white" />
              </motion.button>
            )}
            {/* Counter */}
            <span className="text-xs font-mono text-white/60 px-2">{idx+1}/{certs.length}</span>

            {/* Download */}
            <motion.a href={cert.file} download whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background:'rgba(255,255,255,0.18)', color:'#fff', border:'1px solid rgba(255,255,255,0.28)' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.28)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.18)'}>
              <Download size={13} /> Download PDF
            </motion.a>

            {/* Close */}
            <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }} onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.20)', color:'#fff' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}>
              <X size={16} />
            </motion.button>
          </div>
        </div>

        {/* ── PDF viewer ───────────────────────────────────── */}
        <div className="relative flex-1 overflow-hidden" style={{ minHeight: '400px', background: '#F1F5F9' }}>
          {/* Open-in-new-tab hint */}
          <a href={cert.file} target="_blank" rel="noreferrer"
            className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ background:'rgba(255,255,255,0.92)', color:G, border:'1px solid rgba(15,61,62,0.18)', backdropFilter:'blur(8px)', boxShadow:'0 2px 8px rgba(0,0,0,0.10)' }}>
            <ZoomIn size={11} /> Open Full View
          </a>
          <iframe
            key={cert.id}
            src={`${cert.file}#view=FitH&toolbar=1&navpanes=0`}
            title={cert.name}
            className="w-full h-full border-0"
            style={{ minHeight: '460px' }}
          />
        </div>

        {/* ── Modal footer ─────────────────────────────────── */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-[#F3F4F6]"
          style={{ background:'linear-gradient(135deg, rgba(15,61,62,0.03), rgba(230,244,241,0.25))' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#6B7280]">
                <Calendar size={11} style={{ color:G }} /> {cert.date}
              </span>
              {cert.duration && (
                <span className="flex items-center gap-1.5 text-[#6B7280]">
                  <Clock size={11} style={{ color:G }} /> {cert.duration}
                </span>
              )}
              {cert.instructor && (
                <span className="flex items-center gap-1.5 text-[#6B7280]">
                  <User size={11} style={{ color:G }} /> {cert.instructor}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-[#6B7280]">
                <Building2 size={11} style={{ color:G }} /> {cert.platform}
              </span>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {cert.skills?.slice(0,3).map(s => (
                  <span key={s} className="text-xs font-mono px-2 py-0.5 rounded-md"
                    style={{ background:'rgba(15,61,62,0.07)', color:G, border:'1px solid rgba(15,61,62,0.13)' }}>
                    {s}
                  </span>
                ))}
              </div>
              {cert.verifyUrl && (
                <a href={cert.verifyUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                  style={{ color:'#166534', border:'1px solid #86EFAC', background:'#DCFCE7' }}
                  onMouseEnter={e => e.currentTarget.style.background='#BBF7D0'}
                  onMouseLeave={e => e.currentTarget.style.background='#DCFCE7'}>
                  <Shield size={11} /> Verify Certificate
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Certifications Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Certifications() {
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState('All');

  const categories = ['All', ...Array.from(new Set(certifications.map(c => c.category)))];
  const filtered   = filter === 'All' ? certifications : certifications.filter(c => c.category === filter);

  return (
    <div className="page-enter">
      {/* ── Header ── */}
      <div className="section-alt pt-32 pb-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color:G }}>Credentials</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#111827] mb-4">My Certifications</h1>
          <p className="text-lg max-w-xl mx-auto text-[#6B7280] mb-8">
            Real verified certificates — click <strong className="text-[#111827]">Preview</strong> to view the actual PDF,
            or <strong className="text-[#111827]">Download</strong> to save a copy
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <motion.button key={cat} onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={filter === cat
                  ? { background:G, color:'#fff', boxShadow:'0 4px 16px rgba(15,61,62,0.28)' }
                  : { background:'#fff', color:'#6B7280', border:'1px solid #E5E7EB' }}
                onMouseEnter={e => { if(filter!==cat){e.currentTarget.style.borderColor='rgba(15,61,62,0.30)';e.currentTarget.style.color=G;}}}
                onMouseLeave={e => { if(filter!==cat){e.currentTarget.style.borderColor='#E5E7EB';e.currentTarget.style.color='#6B7280';}}}>
                {cat}
                {cat !== 'All' && (
                  <span className="ml-2 text-xs opacity-60">
                    ({certifications.filter(c => c.category === cat).length})
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Certificate cards ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div layout className="grid sm:grid-cols-2 gap-7">
            <AnimatePresence mode="popLayout">
              {filtered.map((cert, i) => {
                const cs = catStyle[cert.category] || catStyle['Networking'];
                return (
                  <motion.div key={cert.id} layout
                    initial={{ opacity:0, y:24 }}
                    animate={{ opacity:1, y:0  }}
                    exit={{   opacity:0, scale:0.93 }}
                    transition={{ delay:i*0.08, duration:0.4 }}
                    className="group relative rounded-2xl overflow-hidden flex flex-col"
                    style={{
                      background:'rgba(255,255,255,0.97)',
                      backdropFilter:'blur(12px)',
                      border:'1px solid rgba(15,61,62,0.09)',
                      boxShadow:'0 4px 24px rgba(0,0,0,0.05)',
                      transition:'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow='0 20px 56px rgba(15,61,62,0.13)';
                      e.currentTarget.style.borderColor='rgba(15,61,62,0.20)';
                      e.currentTarget.style.transform='translateY(-5px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor='rgba(15,61,62,0.09)';
                      e.currentTarget.style.transform='translateY(0)';
                    }}
                  >
                    {/* Top gradient bar */}
                    <div className="h-1.5 w-full flex-shrink-0"
                      style={{ background:`linear-gradient(90deg, ${G}, #155F61, rgba(15,61,62,0.12))` }} />

                    {/* PDF thumbnail preview strip */}
                    <div
                      className="relative w-full overflow-hidden flex-shrink-0 cursor-pointer group/thumb"
                      style={{ height: '180px', background:'#F8FAFC' }}
                      onClick={() => setSelected(cert)}
                    >
                      <iframe
                        src={`${cert.file}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                        title={`${cert.name} preview`}
                        className="w-full pointer-events-none"
                        style={{
                          height:'400px',
                          transform:'scale(0.55)',
                          transformOrigin:'top center',
                          marginTop:'-8px',
                          border:'none',
                        }}
                        tabIndex={-1}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-250"
                        style={{ background:'rgba(15,61,62,0.55)', backdropFilter:'blur(2px)' }}>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ background:'rgba(255,255,255,0.18)', border:'2px solid rgba(255,255,255,0.35)' }}>
                            <Eye size={22} className="text-white" />
                          </div>
                          <span className="text-white text-sm font-semibold font-display">Click to Preview</span>
                        </div>
                      </div>
                      {/* Featured badge */}
                      {cert.featured && (
                        <div className="absolute top-3 left-3"
                          style={{ background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)', border:'1px solid rgba(15,61,62,0.16)', borderRadius:'8px', padding:'3px 8px' }}>
                          <span className="text-xs font-mono font-bold" style={{ color:G }}>✓ Verified</span>
                        </div>
                      )}
                      {/* Category badge */}
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
                          style={{ background:cs.bg, color:cs.text, border:`1px solid ${cs.border}`, backdropFilter:'blur(4px)' }}>
                          <span className="mr-1" style={{ color:cs.dot }}>●</span>
                          {cert.category}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Icon + title row */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-md"
                          style={{ background:`linear-gradient(135deg, ${G}, #155F61)`, boxShadow:'0 4px 14px rgba(15,61,62,0.25)' }}>
                          {cert.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-bold text-[#111827] text-sm leading-snug mb-0.5 group-hover:text-[#0F3D3E] transition-colors line-clamp-2">
                            {cert.name}
                          </h3>
                          <p className="text-xs font-semibold" style={{ color:G }}>{cert.provider}</p>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="flex items-center gap-1.5 text-xs font-mono text-[#9CA3AF]">
                          <Calendar size={11} style={{ color:G }} />{cert.date}
                        </span>
                        {cert.duration && (
                          <span className="flex items-center gap-1.5 text-xs font-mono text-[#9CA3AF]">
                            <Clock size={11} style={{ color:G }} />{cert.duration}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-xs font-mono text-[#9CA3AF]">
                          <Building2 size={11} style={{ color:G }} />{cert.platform}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                        {cert.skills?.map(s => (
                          <span key={s} className="text-xs font-mono px-2 py-0.5 rounded-md"
                            style={{ background:'rgba(15,61,62,0.06)', color:G, border:'1px solid rgba(15,61,62,0.12)' }}>
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* ── Action buttons ── */}
                      <div className="flex items-center gap-2 pt-4 border-t border-[#F3F4F6]">

                        {/* Preview — full width green */}
                        <motion.button
                          whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                          onClick={() => setSelected(cert)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
                          style={{ background:G, color:'#fff', boxShadow:'0 4px 14px rgba(15,61,62,0.24)' }}
                          onMouseEnter={e => { e.currentTarget.style.background='#155F61'; e.currentTarget.style.boxShadow='0 6px 20px rgba(15,61,62,0.32)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background=G; e.currentTarget.style.boxShadow='0 4px 14px rgba(15,61,62,0.24)'; }}>
                          <Eye size={14} /> Preview
                        </motion.button>

                        {/* Download — outline */}
                        <motion.a
                          href={cert.file} download
                          whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
                          style={{ color:G, border:'2px solid rgba(15,61,62,0.22)', background:'transparent' }}
                          onMouseEnter={e => { e.currentTarget.style.background='rgba(15,61,62,0.07)'; e.currentTarget.style.borderColor=G; }}
                          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(15,61,62,0.22)'; }}>
                          <Download size={14} /> Download
                        </motion.a>

                        {/* Verify icon button */}
                        {cert.verifyUrl ? (
                          <motion.a href={cert.verifyUrl} target="_blank" rel="noreferrer"
                            whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                            title="Verify Certificate"
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                            style={{ background:'#DCFCE7', color:'#166534', border:'1px solid #86EFAC' }}
                            onMouseEnter={e => e.currentTarget.style.background='#BBF7D0'}
                            onMouseLeave={e => e.currentTarget.style.background='#DCFCE7'}>
                            <Shield size={14} />
                          </motion.a>
                        ) : (
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background:'rgba(15,61,62,0.06)', color:'rgba(15,61,62,0.40)', border:'1px solid rgba(15,61,62,0.10)' }}>
                            <Award size={14} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* ── Stats strip ── */}
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value:'4',  label:'Total Certificates',  icon:'🏆' },
              { value:'2',  label:'Virtual Internships', icon:'💼' },
              { value:'1',  label:'Cisco Networking',    icon:'🌐' },
              { value:'1',  label:'Coursera Project',    icon:'📊' },
            ].map((s,i) => (
              <motion.div key={s.label}
                initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.08 }}
                className="text-center py-6 px-4 rounded-2xl"
                style={{ background:'linear-gradient(135deg, rgba(15,61,62,0.05), rgba(230,244,241,0.28))', border:'1px solid rgba(15,61,62,0.10)' }}>
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="font-display font-bold text-2xl mb-1" style={{ color:G }}>{s.value}</p>
                <p className="text-xs text-[#6B7280] font-mono">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Issued by ── */}
      <section className="section-alt py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-mono text-xs tracking-widest uppercase mb-6 text-[#9CA3AF]">Issued & Recognised By</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Cisco Networking Academy','Coursera Project Network','AICTE / Ministry of Education','EduSkills Academy','Microchip Technology Inc.','Galgotias University'].map((org,i) => (
              <motion.div key={org}
                initial={{ opacity:0, y:8 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background:'rgba(255,255,255,0.90)', backdropFilter:'blur(8px)', border:'1px solid rgba(15,61,62,0.10)', color:'#374151', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                {org}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-screen Modal ── */}
      <AnimatePresence>
        {selected && (
          <CertModal
            cert={selected}
            certs={filtered}
            onClose={() => setSelected(null)}
            onNavigate={(c) => setSelected(c)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
