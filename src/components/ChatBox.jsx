import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const G = '#0F3D3E';
const defaultMessages = [{ from: 'bot', text: "Hi! I'm Suhaib's assistant. How can I help? 👋" }];
const replies = {
  skill:   'Suhaib is skilled in Python, SQL, Power BI, Machine Learning & Data Analysis! 📊',
  project: 'Suhaib has built 5+ projects — Sales Dashboard, Churn Predictor, SQL Analytics & more! 🚀',
  contact: `Reach Suhaib at ashrafsuhaib674@gmail.com or +91 9795478165 💌`,
  hire:    'Suhaib is actively looking for Data Analyst / AI-ML roles. Use the Contact page! 🎯',
  default: 'Explore the portfolio or reach out via the Contact page for more info 😊',
};
function getReply(msg) {
  const l = msg.toLowerCase();
  if (l.includes('skill') || l.includes('tech'))   return replies.skill;
  if (l.includes('project') || l.includes('work')) return replies.project;
  if (l.includes('contact') || l.includes('email') || l.includes('phone')) return replies.contact;
  if (l.includes('hire') || l.includes('job'))     return replies.hire;
  return replies.default;
}

export default function ChatBox() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const bottomRef               = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const msg = { from: 'user', text: input };
    setMessages(p => [...p, msg]);
    setInput('');
    setTyping(true);
    setTimeout(() => { setTyping(false); setMessages(p => [...p, { from: 'bot', text: getReply(msg.text) }]); }, 1100);
  };

  return (
    <>
      <motion.button onClick={() => setOpen(v => !v)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all"
        style={{ background: G, boxShadow: '0 8px 28px rgba(15,61,62,0.28)' }}
        onMouseEnter={e => e.currentTarget.style.background = '#155F61'}
        onMouseLeave={e => e.currentTarget.style.background = G}>
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"    initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90  }}><X            size={22} className="text-white"/></motion.div>
            : <motion.div key="chat" initial={{ rotate:  90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}><MessageCircle size={22} className="text-white"/></motion.div>
          }
        </AnimatePresence>
        {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"/>}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, scale:0.85, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.85, y:16 }}
            className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(15,61,62,0.12)', boxShadow:'0 20px 60px rgba(15,61,62,0.16)' }}>
            {/* Header */}
            <div className="px-4 py-3.5 flex items-center gap-3 border-b"
              style={{ background:'linear-gradient(135deg, rgba(15,61,62,0.07), rgba(230,244,241,0.40))', borderColor:'rgba(15,61,62,0.10)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: G, boxShadow:'0 4px 12px rgba(15,61,62,0.25)' }}>
                <Bot size={16} className="text-white"/>
              </div>
              <div>
                <p className="text-sm font-semibold font-display" style={{ color:'#111827' }}>Suhaib's Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>
                  <span className="text-xs" style={{ color:'#9CA3AF' }}>Online</span>
                </div>
              </div>
            </div>
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3" style={{ background:'#F8FAFC' }}>
              {messages.map((m,i) => (
                <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  className={`flex ${m.from==='user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                    style={m.from==='user'
                      ? { background:G, color:'#fff', borderRadius:'12px 12px 2px 12px' }
                      : { background:'#fff', color:'#374151', border:'1px solid rgba(15,61,62,0.10)', borderRadius:'12px 12px 12px 2px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-xl flex gap-1"
                    style={{ background:'#fff', border:'1px solid rgba(15,61,62,0.10)', borderRadius:'12px 12px 12px 2px' }}>
                    {[0,1,2].map(i => (
                      <motion.div key={i} animate={{ y:[0,-4,0] }} transition={{ duration:0.55, delay:i*0.13, repeat:Infinity }}
                        className="w-1.5 h-1.5 rounded-full" style={{ background:G }}/>
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef}/>
            </div>
            {/* Input */}
            <div className="p-3 flex gap-2 bg-white" style={{ borderTop:'1px solid rgba(15,61,62,0.08)' }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()}
                placeholder="Ask me anything..."
                className="flex-1 rounded-xl px-3 py-2 text-sm outline-none border transition-colors"
                style={{ background:'#F8FAFC', borderColor:'#E5E7EB', color:'#374151' }}
                onFocus={e => e.target.style.borderColor=G}
                onBlur={e  => e.target.style.borderColor='#E5E7EB'}/>
              <motion.button whileTap={{ scale:0.9 }} onClick={send}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ background:G }}
                onMouseEnter={e => e.currentTarget.style.background='#155F61'}
                onMouseLeave={e => e.currentTarget.style.background=G}>
                <Send size={14} className="text-white"/>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
