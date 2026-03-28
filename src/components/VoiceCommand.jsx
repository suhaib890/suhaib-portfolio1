import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, ChevronRight } from 'lucide-react';

// ─── Voice command → route mapping ───────────────────────────────────────────
const COMMANDS = [
  { patterns: ['home', 'go home', 'go to home', 'main', 'start'],               route: '/',               label: 'Home'           },
  { patterns: ['about', 'about me', 'go to about', 'who are you', 'who is'],    route: '/about',          label: 'About'          },
  { patterns: ['skill', 'skills', 'technologies', 'tech', 'show skills'],       route: '/skills',         label: 'Skills'         },
  { patterns: ['project', 'projects', 'work', 'portfolio', 'open project'],     route: '/projects',       label: 'Projects'       },
  { patterns: ['certif', 'certificate', 'certifications', 'credentials'],        route: '/certifications', label: 'Certifications' },
  { patterns: ['contact', 'contact me', 'reach', 'hire', 'get in touch'],       route: '/contact',        label: 'Contact'        },
  { patterns: ['scroll up', 'go up', 'top'],                                    action: 'scrollTop',      label: 'Scroll to Top'  },
  { patterns: ['scroll down', 'go down', 'bottom'],                             action: 'scrollBottom',   label: 'Scroll Down'    },
];

function matchCommand(transcript) {
  const lower = transcript.toLowerCase().trim();
  for (const cmd of COMMANDS) {
    if (cmd.patterns.some(p => lower.includes(p))) return cmd;
  }
  return null;
}

// ─── Ripple wave animation for active listening ───────────────────────────────
function ListeningWaves() {
  return (
    <div className="relative flex items-center justify-center w-6 h-6">
      {[0, 1, 2].map(i => (
        <motion.span key={i}
          className="absolute rounded-full"
          style={{ width: '100%', height: '100%', border: '2px solid #D4AF37', opacity: 0 }}
          animate={{ scale: [1, 2.2 + i * 0.4], opacity: [0.7, 0] }}
          transition={{ duration: 1.4, delay: i * 0.38, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      <Mic size={14} style={{ color: '#D4AF37' }} />
    </div>
  );
}

// ─── Bar visualizer ───────────────────────────────────────────────────────────
function AudioBars() {
  const heights = [3, 5, 8, 5, 10, 6, 4, 9, 5, 3];
  return (
    <div className="flex items-end gap-0.5 h-5">
      {heights.map((h, i) => (
        <motion.div key={i}
          className="w-1 rounded-full"
          style={{ background: '#D4AF37', minHeight: '3px' }}
          animate={{ height: [`${h}px`, `${h * (1.5 + Math.random())}px`, `${h}px`] }}
          transition={{ duration: 0.4 + i * 0.06, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VoiceCommand({ onNavigate }) {
  const [listening,   setListening]   = useState(false);
  const [transcript,  setTranscript]  = useState('');
  const [feedback,    setFeedback]    = useState('');
  const [feedbackType,setFeedbackType]= useState('');   // 'success' | 'error' | 'info'
  const [showPanel,   setShowPanel]   = useState(false);
  const [supported,   setSupported]   = useState(true);
  const [permDenied,  setPermDenied]  = useState(false);
  const recognitionRef = useRef(null);
  const feedbackTimer  = useRef(null);

  // ── Check browser support ──────────────────────────────────────────────────
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setSupported(false); return; }

    const rec = new SpeechRecognition();
    rec.continuous      = false;
    rec.interimResults  = true;
    rec.lang            = 'en-US';
    rec.maxAlternatives = 1;

    rec.onstart = () => setListening(true);
    rec.onend   = () => setListening(false);

    rec.onerror = (e) => {
      setListening(false);
      if (e.error === 'not-allowed' || e.error === 'permission-denied') {
        setPermDenied(true);
        showFeedback('Microphone access denied. Please allow mic in browser settings.', 'error');
      } else if (e.error === 'no-speech') {
        showFeedback("No speech detected. Try again!", 'info');
      } else if (e.error !== 'aborted') {
        showFeedback(`Error: ${e.error}`, 'error');
      }
    };

    rec.onresult = (e) => {
      let interim = '';
      let final   = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else                       interim += t;
      }
      const text = final || interim;
      setTranscript(text);

      if (final) {
        processCommand(final.trim());
      }
    };

    recognitionRef.current = rec;
    return () => { try { rec.abort(); } catch(_) {} };
  }, []);

  const showFeedback = (msg, type = 'info') => {
    setFeedback(msg);
    setFeedbackType(type);
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => { setFeedback(''); setTranscript(''); }, 3500);
  };

  const processCommand = useCallback((text) => {
    const cmd = matchCommand(text);
    if (!cmd) {
      showFeedback(`"${text}" — command not recognised. Try "Go to Projects"`, 'error');
      return;
    }
    if (cmd.action === 'scrollTop') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showFeedback('⬆️ Scrolled to top!', 'success');
    } else if (cmd.action === 'scrollBottom') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      showFeedback('⬇️ Scrolled to bottom!', 'success');
    } else if (cmd.route) {
      showFeedback(`✅ Navigating to ${cmd.label}...`, 'success');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: cmd.route }));
        if (onNavigate) onNavigate(cmd.route);
      }, 600);
    }
  }, [onNavigate]);

  const toggleListening = () => {
    if (!recognitionRef.current || !supported) return;
    if (listening) {
      recognitionRef.current.abort();
      setListening(false);
      setTranscript('');
    } else {
      setTranscript('');
      setFeedback('');
      try { recognitionRef.current.start(); }
      catch(e) { showFeedback('Could not start mic. Try again.', 'error'); }
    }
  };

  if (!supported) return null;

  const feedbackColors = {
    success: { bg: 'rgba(34,197,94,0.10)',   border: 'rgba(34,197,94,0.30)',   text: '#16a34a' },
    error:   { bg: 'rgba(239,68,68,0.09)',   border: 'rgba(239,68,68,0.28)',   text: '#dc2626' },
    info:    { bg: 'rgba(212,175,55,0.08)',  border: 'rgba(212,175,55,0.30)',  text: '#B8962E' },
  };
  const fc = feedbackColors[feedbackType] || feedbackColors.info;

  return (
    <>
      {/* ── Voice button — sits LEFT of the chatbot FAB ──────────────── */}
      <div className="fixed bottom-6 right-24 z-50 flex flex-col items-center gap-2">

        {/* Transcript / feedback pill — floats above */}
        <AnimatePresence>
          {(transcript || feedback) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{   opacity: 0, y: 10, scale: 0.92  }}
              className="rounded-2xl px-4 py-2.5 text-sm font-body shadow-lg max-w-[220px] text-center"
              style={feedback
                ? { background: fc.bg, border: `1px solid ${fc.border}`, color: fc.text }
                : { background: 'rgba(212,175,55,0.10)', border: '1px solid rgba(212,175,55,0.30)', color: '#B8962E' }}>
              {feedback || (
                <span className="flex items-center gap-2 justify-center">
                  <AudioBars />
                  <span className="font-mono text-xs truncate max-w-[130px]">{transcript || '...'}</span>
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mic button */}
        <motion.button
          onClick={toggleListening}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all"
          style={{
            background: listening ? '#111111' : '#FFFFFF',
            border: `2px solid ${listening ? '#D4AF37' : '#E5E7EB'}`,
            boxShadow: listening ? '0 8px 28px rgba(212,175,55,0.40)' : '0 4px 16px rgba(0,0,0,0.08)',
          }}
          title={listening ? 'Stop listening' : 'Voice command'}
        >
          {listening
            ? <ListeningWaves />
            : permDenied
            ? <MicOff size={20} style={{ color: '#9CA3AF' }} />
            : <Mic size={20} style={{ color: '#D4AF37' }} />
          }
          {/* Active ring */}
          {listening && (
            <motion.span animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl"
              style={{ border: '2px solid #D4AF37' }} />
          )}
        </motion.button>

        {/* Help toggle */}
        <motion.button
          onClick={() => setShowPanel(v => !v)}
          whileHover={{ scale: 1.06 }}
          className="text-xs font-mono transition-colors"
          style={{ color: '#9CA3AF' }}
          onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
          {showPanel ? 'Hide' : 'Commands'}
        </motion.button>
      </div>

      {/* ── Commands panel ──────────────────────────────────────────── */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{   opacity: 0, scale: 0.9,  y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="fixed bottom-28 right-24 z-50 rounded-2xl border border-[#E5E7EB] bg-white shadow-xl shadow-black/10 overflow-hidden"
            style={{ width: '220px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3F4F6]"
              style={{ background: 'rgba(212,175,55,0.06)' }}>
              <div className="flex items-center gap-2">
                <Volume2 size={14} style={{ color: '#D4AF37' }} />
                <p className="text-xs font-semibold font-mono" style={{ color: '#111111' }}>Voice Commands</p>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowPanel(false)}
                className="w-5 h-5 flex items-center justify-center" style={{ color: '#9CA3AF' }}>
                <X size={12} />
              </motion.button>
            </div>

            <div className="p-3 space-y-1 max-h-60 overflow-y-auto">
              {COMMANDS.filter(c => c.route || c.action === 'scrollTop').map((cmd) => (
                <motion.button key={cmd.label}
                  whileHover={{ x: 3 }}
                  onClick={() => { processCommand(cmd.patterns[0]); setShowPanel(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all group"
                  style={{ color: '#6B7280' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.07)'; e.currentTarget.style.color = '#111'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'inherit' }}>"{cmd.patterns[0]}"</p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: '#9CA3AF' }}>{cmd.label}</p>
                  </div>
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: '#D4AF37' }} />
                </motion.button>
              ))}
            </div>

            <div className="px-4 py-2.5 border-t border-[#F3F4F6]" style={{ background: 'rgba(212,175,55,0.04)' }}>
              <p className="text-xs font-mono text-center" style={{ color: '#9CA3AF' }}>
                Click 🎤 then speak any command
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
