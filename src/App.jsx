import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader        from './components/Loader';
import Navbar        from './components/Navbar';
import Footer        from './components/Footer';
import ChatBot       from './components/ChatBot';
import VoiceCommand  from './components/VoiceCommand';
import Home           from './pages/Home';
import About          from './pages/About';
import Skills         from './pages/Skills';
import Projects       from './pages/Projects';
import Certifications from './pages/Certifications';
import Contact        from './pages/Contact';

const routes = {
  '/':               Home,
  '/about':          About,
  '/skills':         Skills,
  '/projects':       Projects,
  '/certifications': Certifications,
  '/contact':        Contact,
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [path,    setPath]    = useState('/');

  useEffect(() => {
    const handler = (e) => {
      setPath(e.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  const navigate = (p) => {
    setPath(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PageComponent = routes[path] || Home;

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar currentPath={path} />

          <main className="min-h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{   opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <PageComponent onNavigate={navigate} />
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer onNavigate={navigate} />

          {/* AI features — voice LEFT, chat RIGHT */}
          <VoiceCommand />
          <ChatBot />
        </motion.div>
      )}
    </>
  );
}
