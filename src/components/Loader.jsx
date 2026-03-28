import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  return (
    <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5, delay: 2.0 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#FFFFFF' }}>
      <div className="flex flex-col items-center gap-6">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}
          className="relative">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl"
            style={{ background: '#0F3D3E' }}>
            <span className="font-display font-bold text-2xl text-white relative z-10">SA</span>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl"
              style={{ border: '2px solid transparent', borderTopColor: '#E6F4F1', borderRightColor: 'rgba(230,244,241,0.3)' }} />
          </div>
          <div className="absolute inset-0 rounded-2xl blur-2xl opacity-30" style={{ background: '#0F3D3E' }} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-44">
          <div className="h-[2px] rounded-full overflow-hidden" style={{ background: '#E6F4F1' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
              className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #0F3D3E, #155F61, #0F3D3E)' }} />
          </div>
          <p className="text-center mt-2 text-xs font-mono tracking-widest" style={{ color: '#9CA3AF' }}>LOADING...</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
