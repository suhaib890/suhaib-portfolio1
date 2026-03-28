import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, RotateCcw, Key } from 'lucide-react';

// ── Portfolio context injected into every prompt ─────────────────────────────
const SYSTEM_PROMPT = `You are Suhaib Ashraf's personal AI portfolio assistant. Answer questions concisely and helpfully about Suhaib. Here is his profile:

NAME: Suhaib Ashraf
TITLE: Aspiring Data Analyst | AI/ML Learner
EMAIL: ashrafsuhaib674@gmail.com
PHONE: +91 9795478165
GITHUB: https://github.com/suhaib890
LINKEDIN: https://www.linkedin.com/in/suhaib-ashraf01
LOCATION: India

BIO: Suhaib is an aspiring Data Analyst and AI/ML learner with hands-on experience in Python, SQL, Power BI, and Machine Learning. Passionate about working with data, building intelligent systems, and solving real-world problems using data-driven approaches. Quick learner, highly motivated, focused on building a strong career in data analytics and AI.

SKILLS: Python (82%), SQL (88%), Power BI (80%), Machine Learning (72%), Data Analysis (85%), Excel (90%)
TECH STACK: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Tableau, PostgreSQL, Jupyter, VS Code, Git/GitHub, Google Colab

PROJECTS:
1. Sales Performance Dashboard — Power BI dashboard analyzing 2M+ sales records (Power BI, SQL, Excel)
2. Customer Churn Predictor — Python ML model with 89% accuracy (Python, Scikit-learn, Pandas)
3. E-Commerce SQL Analytics — Complex CTEs and window functions analysis (SQL, PostgreSQL)
4. COVID-19 Data Visualization — Global tracking across 150+ countries (Python, Matplotlib, Plotly)
5. HR Analytics Report — Attrition analysis and workforce planning (Excel, Power BI, DAX)

CERTIFICATIONS: Google Data Analytics, Microsoft Power BI, Python for Data Science (IBM), SQL for Data Science (UC Davis), Machine Learning Specialization (DeepLearning.AI), Data Visualization with Tableau

EDUCATION: BCA from Galgotias University (2021–2024), CGPA 8.4/10

STATUS: Actively looking for Data Analyst / AI-ML roles.

Keep answers short (2-4 sentences max). Be friendly and professional. If asked something unrelated to Suhaib's portfolio, politely redirect to portfolio topics.`;

// ── Suggested quick questions ─────────────────────────────────────────────────
const SUGGESTIONS = [
  'What are Suhaib\'s top skills?',
  'Tell me about his projects',
  'How can I contact Suhaib?',
  'What certifications does he have?',
  'Is he open to work?',
];

// ── Fallback responses (used if no API key) ───────────────────────────────────
const FALLBACK = {
  skill:   '🐍 Suhaib\'s top skills are Python (82%), SQL (88%), Power BI (80%), Machine Learning (72%), and Data Analysis (85%). He also works with Pandas, NumPy, Scikit-learn, and Tableau.',
  project: '🚀 Suhaib has built 5 projects: Sales Performance Dashboard (Power BI), Customer Churn Predictor (ML, 89% accuracy), E-Commerce SQL Analytics, COVID-19 Visualization, and HR Analytics Report.',
  contact: '📬 Reach Suhaib at ashrafsuhaib674@gmail.com or +91 9795478165. Connect on LinkedIn: linkedin.com/in/suhaib-ashraf01 or GitHub: github.com/suhaib890',
  cert:    '🏆 Suhaib holds 6 certifications: Google Data Analytics, Microsoft Power BI, Python for Data Science (IBM), SQL (UC Davis), Machine Learning (DeepLearning.AI), and Tableau.',
  hire:    '✅ Yes! Suhaib is actively seeking Data Analyst and AI/ML roles. Send a message via the Contact page or email ashrafsuhaib674@gmail.com directly.',
  edu:     '🎓 Suhaib completed BCA from Galgotias University (2021–2024) with a CGPA of 8.4/10, specializing in Data Science & AI/ML.',
  default: '👋 I\'m Suhaib\'s AI assistant! Ask me about his skills, projects, certifications, education, or how to contact him.',
};

function getFallback(msg) {
  const l = msg.toLowerCase();
  if (l.match(/skill|python|sql|power|tech|know/))       return FALLBACK.skill;
  if (l.match(/project|work|built|dashboard|churn/))     return FALLBACK.project;
  if (l.match(/contact|email|phone|reach|linkedin/))     return FALLBACK.contact;
  if (l.match(/cert|certif|course|coursera/))            return FALLBACK.cert;
  if (l.match(/hire|job|open|available|opport/))         return FALLBACK.hire;
  if (l.match(/edu|degree|university|college|bca|study/))return FALLBACK.edu;
  return FALLBACK.default;
}

// ── Main ChatBot component ────────────────────────────────────────────────────
export default function ChatBot() {
  const [open,       setOpen]       = useState(false);
  const [messages,   setMessages]   = useState([
    { role: 'assistant', content: "Hi! 👋 I'm Suhaib's AI assistant. Ask me anything about his skills, projects, experience, or contact details!" }
  ]);
  const [input,      setInput]      = useState('');
  const [loading,    setLoading]    = useState(false);
  const [apiKey,     setApiKey]     = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft,   setKeyDraft]   = useState('');
  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  // ── Call Anthropic API ──────────────────────────────────────────────────────
  const callClaude = useCallback(async (userMessage, history) => {
    const msgs = history
      .filter(m => m.role !== 'system')
      .map(m => ({ role: m.role, content: m.content }));
    msgs.push({ role: 'user', content: userMessage });

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: msgs,
      }),
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data.content?.[0]?.text || 'Sorry, I could not generate a response.';
  }, []);

  // ── Send message ────────────────────────────────────────────────────────────
  const send = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      let reply;
      if (apiKey) {
        // Use real Claude API with user-provided key
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 350,
            system: SYSTEM_PROMPT,
            messages: [...messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0).map(m => ({ role: m.role, content: m.content })), { role: 'user', content: msg }],
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        reply = data.content?.[0]?.text || getFallback(msg);
      } else {
        // Use smart keyword-based fallback
        await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
        reply = getFallback(msg);
      }
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('ChatBot error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: getFallback(msg) }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, apiKey, messages]);

  const clearChat = () => setMessages([{
    role: 'assistant',
    content: "Chat cleared! 👋 Ask me anything about Suhaib's skills, projects, or experience."
  }]);

  const saveKey = () => {
    setApiKey(keyDraft.trim());
    setShowKeyInput(false);
    setKeyDraft('');
  };

  return (
    <>
      {/* ── Floating trigger ───────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
        style={{ background: open ? '#111111' : '#D4AF37' }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = '#B8962E'; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = open ? '#111111' : '#D4AF37'; }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} className="text-white" /></motion.div>
            : <motion.div key="chat" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }}><MessageCircle size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
        {/* AI sparkle badge */}
        {!open && (
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center"
          >
            <Sparkles size={10} style={{ color: '#D4AF37' }} />
          </motion.span>
        )}
      </motion.button>

      {/* ── Chat window ────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.85, y: 20  }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.45 }}
            className="fixed bottom-24 right-6 z-50 rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-2xl shadow-black/12 bg-white flex flex-col"
            style={{ width: '340px', height: '520px' }}
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0 border-b border-[#E5E7EB]"
              style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(247,231,181,0.12))' }}>
              <div className="relative">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(212,175,55,0.18)', border: '1px solid rgba(212,175,55,0.32)' }}>
                  <Bot size={17} style={{ color: '#D4AF37' }} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-display text-[#111111] flex items-center gap-1.5">
                  Suhaib's AI Assistant
                  <span className="text-xs px-1.5 py-0.5 rounded-md font-mono"
                    style={{ background: 'rgba(212,175,55,0.15)', color: '#B8962E' }}>
                    {apiKey ? 'GPT' : 'AI'}
                  </span>
                </p>
                <p className="text-xs truncate" style={{ color: '#9CA3AF' }}>
                  {loading ? 'Thinking...' : 'Ask me about Suhaib'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setShowKeyInput(v => !v)} title="Add API Key"
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[#F3F4F6]"
                  style={{ color: apiKey ? '#D4AF37' : '#9CA3AF' }}>
                  <Key size={13} />
                </button>
                <button onClick={clearChat} title="Clear chat"
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[#F3F4F6]"
                  style={{ color: '#9CA3AF' }}>
                  <RotateCcw size={13} />
                </button>
                <button onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[#F3F4F6]"
                  style={{ color: '#9CA3AF' }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── API Key input (collapsible) ─────────────────────── */}
            <AnimatePresence>
              {showKeyInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{   height: 0, opacity: 0 }}
                  className="overflow-hidden flex-shrink-0"
                >
                  <div className="px-4 py-3 border-b border-[#E5E7EB]" style={{ background: '#FAFAFA' }}>
                    <p className="text-xs font-mono mb-2" style={{ color: '#6B7280' }}>
                      Enter Anthropic API key for real AI responses (optional)
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={keyDraft}
                        onChange={e => setKeyDraft(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveKey()}
                        placeholder="sk-ant-api03-..."
                        className="flex-1 rounded-lg px-3 py-2 text-xs border outline-none"
                        style={{ borderColor: '#E5E7EB', background: '#fff', color: '#374151' }}
                        onFocus={e => e.target.style.borderColor = '#D4AF37'}
                        onBlur={e  => e.target.style.borderColor = '#E5E7EB'}
                      />
                      <button onClick={saveKey}
                        className="px-3 py-2 rounded-lg text-xs font-semibold"
                        style={{ background: '#D4AF37', color: '#111111' }}>
                        Save
                      </button>
                    </div>
                    {apiKey && (
                      <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: '#16A34A' }}>
                        ✓ API key active — using real Claude AI
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Messages area ──────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll" style={{ background: '#FAFAFA' }}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {/* Bot avatar */}
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mb-0.5"
                      style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.25)' }}>
                      <Bot size={11} style={{ color: '#D4AF37' }} />
                    </div>
                  )}
                  <div
                    className="max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed"
                    style={m.role === 'user'
                      ? { background: '#D4AF37', color: '#111', borderRadius: '14px 14px 3px 14px', fontWeight: 500 }
                      : { background: '#fff', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '14px 14px 14px 3px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }
                    }
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.25)' }}>
                    <Bot size={11} style={{ color: '#D4AF37' }} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl flex gap-1.5 items-center"
                    style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '14px 14px 14px 3px' }}>
                    {[0,1,2].map(i => (
                      <motion.div key={i}
                        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.65, delay: i * 0.15, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#D4AF37' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Suggestions ────────────────────────────────────── */}
            {messages.length <= 2 && !loading && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0 border-t border-[#F3F4F6]"
                style={{ background: '#FAFAFA' }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border whitespace-nowrap flex-shrink-0 transition-all font-mono"
                    style={{ borderColor: 'rgba(212,175,55,0.28)', background: 'rgba(212,175,55,0.06)', color: '#B8962E' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.06)'; }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input bar ──────────────────────────────────────── */}
            <div className="px-3 py-3 border-t border-[#E5E7EB] flex gap-2 flex-shrink-0 bg-white">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask about Suhaib..."
                disabled={loading}
                className="flex-1 rounded-xl px-3.5 py-2.5 text-sm border outline-none transition-colors disabled:opacity-60"
                style={{ background: '#FAFAFA', borderColor: '#E5E7EB', color: '#374151' }}
                onFocus={e => e.target.style.borderColor = '#D4AF37'}
                onBlur={e  => e.target.style.borderColor = '#E5E7EB'}
              />
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-50"
                style={{ background: input.trim() ? '#D4AF37' : '#F3F4F6', color: input.trim() ? '#fff' : '#9CA3AF' }}
                onMouseEnter={e => { if (input.trim()) e.currentTarget.style.background = '#B8962E'; }}
                onMouseLeave={e => { if (input.trim()) e.currentTarget.style.background = '#D4AF37'; }}
              >
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
