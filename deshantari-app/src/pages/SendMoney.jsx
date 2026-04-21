import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export const SendMoney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ recipient: '', amount: '', method: 'bKash', phone: '' });
  const [isSent, setIsSent] = useState(false);

  const methods = ['bKash', 'Nagad', 'Bank Transfer', 'Rocket'];
  const rate = 32.4; // Slightly more realistic rate SAR to BDT
  const bdt = Math.round((parseFloat(form.amount) || 0) * rate).toLocaleString();

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  const handleSend = () => setIsSent(true);

  if (isSent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-green-50 flex items-center justify-center">
          <CheckCircle2 size={36} className="text-brand-green-600" />
        </div>
        <div className="text-center">
          <div className="text-xl font-extrabold text-neutral-900">Transfer Sent!</div>
          <div className="text-sm text-neutral-600 mt-1">SAR {form.amount} → ৳{bdt}</div>
          <div className="text-[13px] text-neutral-400 mt-1">To {form.recipient} via {form.method}</div>
        </div>
        <div className="bg-white rounded-xl p-3 w-full shadow-card text-[13px] text-neutral-600 text-center mt-2">
          Delivery: <strong className="text-brand-green-600">within 2 hours</strong>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="w-full bg-brand-green-600 text-white border-none rounded-lg p-3 font-bold text-sm cursor-pointer mt-4"
        >
          Back to Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      {/* Stepper Header */}
      <div className="bg-white py-4 flex items-center justify-center shadow-sm z-10 shrink-0">
        {[1, 2, 3].map((num, i) => (
          <React.Fragment key={num}>
            <div className="flex flex-col items-center gap-1 w-12">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${
                step >= num ? 'bg-brand-green-600 text-white' : 'bg-neutral-200 text-neutral-400'
              }`}>
                {step > num ? '✓' : num}
              </div>
              <span className={`text-[10px] font-semibold ${step >= num ? 'text-brand-green-600' : 'text-neutral-400'}`}>
                {num === 1 ? 'Recipient' : num === 2 ? 'Amount' : 'Confirm'}
              </span>
            </div>
            {i < 2 && (
              <div className={`h-[2px] w-8 rounded-full -mt-4 mx-1 ${step > num ? 'bg-brand-green-600' : 'bg-neutral-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Forms Area */}
      <div className="flex-1 overflow-x-hidden p-4 relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-xl p-4 shadow-card">
              <div className="text-[13px] font-bold text-neutral-900 mb-3.5">Who are you sending to?</div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Recipient Name</label>
              <input 
                className="w-full bg-white border-[1.5px] border-neutral-300 rounded-lg p-2.5 text-sm mb-3 focus:outline-none focus:border-brand-green-600 focus:ring-2 focus:ring-brand-green-600/20"
                placeholder="e.g. Rina Begum" 
                value={form.recipient} 
                onChange={e => setForm({...form, recipient: e.target.value})} 
              />
              
              <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Mobile (Bangladesh)</label>
              <input 
                className="w-full bg-white border-[1.5px] border-neutral-300 rounded-lg p-2.5 text-sm mb-4 focus:outline-none focus:border-brand-green-600 focus:ring-2 focus:ring-brand-green-600/20"
                placeholder="017X XXXX XXXX" type="tel"
                value={form.phone} 
                onChange={e => setForm({...form, phone: e.target.value})} 
              />
              
              <div className="text-xs font-semibold text-neutral-600 mb-2">Transfer Method</div>
              <div className="grid grid-cols-2 gap-2">
                {methods.map(m => (
                  <button 
                    key={m} 
                    onClick={() => setForm({...form, method: m})}
                    className={`p-2.5 rounded-lg border-2 text-[13px] font-semibold cursor-pointer ${
                      form.method === m ? 'border-brand-green-600 bg-brand-green-50 text-brand-green-600' : 'border-neutral-200 bg-white text-neutral-900'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-xl p-4 shadow-card">
              <div className="text-[13px] font-bold text-neutral-900 mb-3.5">How much to send?</div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Amount (SAR)</label>
              <input 
                className="w-full bg-white border-[1.5px] border-neutral-300 rounded-lg p-2.5 text-sm mb-4 focus:outline-none focus:border-brand-green-600 focus:ring-2 focus:ring-brand-green-600/20"
                placeholder="0.00" type="number"
                value={form.amount} 
                onChange={e => setForm({...form, amount: e.target.value})} 
              />

              <div className="bg-brand-green-50 rounded-xl p-3 border border-brand-green-100">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-neutral-600">Exchange Rate</span>
                  <span className="text-xs font-bold text-neutral-900">1 SAR = ৳{rate}</span>
                </div>
                <div className="h-px bg-brand-green-100 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-bold text-neutral-900">Recipient gets</span>
                  <span className="text-[15px] font-extrabold text-brand-green-600">৳{bdt}</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-xl p-4 shadow-card">
              <div className="text-[13px] font-bold text-neutral-900 mb-3">Confirm Transfer</div>
              
              <div className="flex flex-col">
                {[
                  ['Recipient', form.recipient || '—'],
                  ['Mobile', form.phone || '—'],
                  ['Method', form.method],
                  ['Amount', `SAR ${form.amount || '0'}`],
                  ['Gets', `৳${bdt}`]
                ].map(([k, v], i) => (
                  <div key={k} className={`flex justify-between py-2.5 ${i < 4 ? 'border-b border-neutral-50' : ''}`}>
                    <span className="text-xs text-neutral-500">{k}</span>
                    <span className={`text-xs font-bold ${k === 'Gets' ? 'text-brand-green-600 textsm' : 'text-neutral-900'}`}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="p-3 pb-4 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)] flex gap-2.5 shrink-0 z-20">
        {step > 1 && (
          <button 
            onClick={handleBack} 
            className="flex-1 bg-white text-brand-green-600 border-[1.5px] border-brand-green-600 rounded-lg p-3 font-semibold text-sm cursor-pointer"
          >
            Back
          </button>
        )}
        <button 
          onClick={step === 3 ? handleSend : handleNext} 
          disabled={step === 1 && !form.recipient}
          className={`flex-[2] text-white border-none rounded-lg p-3 font-bold text-sm transition-colors ${
            (step === 1 && !form.recipient) ? 'bg-neutral-300 cursor-not-allowed' : 'bg-brand-green-600 cursor-pointer hover:bg-brand-green-700'
          }`}
        >
          {step === 3 ? 'Confirm & Send' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
