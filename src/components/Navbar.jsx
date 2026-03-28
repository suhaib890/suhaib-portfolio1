import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/portfolioData';

export default function Navbar({ currentPath = '/' }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active,     setActive]     = useState(currentPath);

  useEffect(() => {
    setActive(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (path) => {
    setActive(path);
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const G = '#0F3D3E';

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? {} : { background: 'transparent' }}
      >
        {/* Glass surface when scrolled */}
        {scrolled && <div className="absolute inset-0 nav-glass" />}

        <div className="relative max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.button whileHover={{ scale: 1.04 }} onClick={() => navigate('/')}
            className="font-display font-bold text-xl focus:outline-none z-10">
            <span className="gradient-text">Suhaib</span>
            <span className="font-mono text-sm ml-1" style={{ color: '#9CA3AF' }}>.dev</span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5 z-10">
            {navLinks.map(link => {
              const isActive = active === link.path;
              return (
                <button key={link.path} onClick={() => navigate(link.path)}
                  className="relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none"
                  style={{ color: isActive ? G : '#6B7280' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#111827'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#6B7280'; }}
                >
                  {isActive && (
                    <motion.span layoutId="navPill" className="absolute inset-0 rounded-xl"
                      style={{ background: 'rgba(15,61,62,0.08)', border: '1px solid rgba(15,61,62,0.18)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                  )}
                  <span className="relative font-semibold">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:block z-10">
            <button onClick={() => navigate('/contact')} className="btn-green text-sm py-2.5 px-6">
              Hire Me
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 rounded-xl z-10 focus:outline-none transition-colors"
            style={{ color: '#6B7280', background: mobileOpen ? 'rgba(15,61,62,0.07)' : 'transparent' }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{   opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[66px] left-4 right-4 z-40 p-5 rounded-2xl border shadow-xl"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
              borderColor: 'rgba(15,61,62,0.12)', boxShadow: '0 16px 48px rgba(15,61,62,0.12)' }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(link => {
                const isActive = active === link.path;
                return (
                  <button key={link.path} onClick={() => navigate(link.path)}
                    className="text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={isActive
                      ? { color: '#0F3D3E', background: 'rgba(15,61,62,0.08)', border: '1px solid rgba(15,61,62,0.15)' }
                      : { color: '#6B7280' }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111827'; }}}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}}>
                    {link.label}
                  </button>
                );
              })}
              <button onClick={() => navigate('/contact')} className="btn-green mt-2 justify-center text-sm">
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
