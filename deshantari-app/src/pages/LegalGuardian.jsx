import React, { useState } from 'react';
import { Shield, FileText, Phone, Grid, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../components/Badge';
import { motion, AnimatePresence } from 'framer-motion';

const DOCS = [
  { n: 'Passport',            num: 'A1234567',   exp: '2028-03-15', s: 'valid' },
  { n: 'Iqama (KSA)',         num: 'IQ-9821034', exp: '2026-05-04', s: 'expiring' },
  { n: 'Work Visa',           num: 'WV-00482',   exp: '2026-07-12', s: 'valid' },
  { n: 'Medical Certificate', num: 'MC-2025',    exp: '2025-12-01', s: 'expired' },
];

const STATUS = {
  valid:    { color: 'text-brand-green-600', bg: 'bg-brand-green-50', label: 'VALID',    variant: 'success' },
  expiring: { color: 'text-brand-gold-600',  bg: 'bg-brand-gold-50',  label: 'EXPIRING', variant: 'warning' },
  expired:  { color: 'text-brand-red-600',   bg: 'bg-brand-red-50',   label: 'EXPIRED',  variant: 'danger'  },
};

const SERVICES = [
  { icon: Shield,   title: 'Legal Guardian',  sub: 'Dedicated advisor for your rights',   color: 'text-blue-600',   bg: 'bg-blue-50' },
  { icon: FileText, title: 'Contract Review', sub: 'Verify your employment contract',     color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Phone,    title: 'Emergency Legal', sub: '24/7 hotline for urgent issues',      color: 'text-brand-red-600',   bg: 'bg-brand-red-50' },
  { icon: Grid,     title: 'Embassy Links',   sub: 'BD Embassy contacts & forms',         color: 'text-brand-green-600', bg: 'bg-brand-green-50' },
];

export const LegalGuardian = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex flex-col min-h-full bg-neutral-100">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-4 pt-4 pb-6 relative overflow-hidden shrink-0">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand-red-600/20" />
        <div className="relative z-10">
          <div className="font-display text-base text-white/70 mb-1">আপনার অধিকার রক্ষা করুন</div>
          <div className="text-[17px] font-extrabold text-white leading-snug mb-3">
            Legal Guardian<br />Always on your side
          </div>
          <button className="bg-white text-blue-700 border-none rounded-lg px-4 py-2 font-bold text-xs cursor-pointer active:scale-95 transition-transform">
            Talk to advisor
          </button>
        </div>
      </div>

      <div className="p-3.5 flex flex-col gap-3 pb-6">
        {/* Services grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {SERVICES.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.title} className={`rounded-xl p-3 cursor-pointer ${s.bg} active:scale-95 transition-transform`}>
                <div className={`mb-2 ${s.color}`}><Icon size={22} strokeWidth={1.5} /></div>
                <div className={`text-xs font-bold leading-snug ${s.color}`}>{s.title}</div>
                <div className="text-[10px] text-neutral-500 mt-1 leading-snug">{s.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Documents accordion */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-100">
            <span className="text-[13px] font-bold text-neutral-900">Documents</span>
            <Badge label="1 expiring" variant="warning" />
          </div>
          {DOCS.map((doc, i) => {
            const st = STATUS[doc.s];
            const isOpen = open === i;
            return (
              <div key={doc.n} className={i < DOCS.length - 1 ? 'border-b border-neutral-100' : ''}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-transparent border-none cursor-pointer text-left"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${st.bg} ${st.color}`}>
                    <FileText size={18} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-neutral-900">{doc.n}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">Exp: {doc.exp}</div>
                  </div>
                  <Badge label={st.label} variant={st.variant} />
                  {isOpen ? <ChevronUp size={14} className="text-neutral-300 ml-1" /> : <ChevronDown size={14} className="text-neutral-300 ml-1" />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-16 pr-4 pb-3">
                        <div className="text-[11px] text-neutral-400 mb-2">No. {doc.num}</div>
                        {doc.s === 'expiring' && (
                          <button className="bg-blue-600 text-white border-none rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer">Renew with Guardian</button>
                        )}
                        {doc.s === 'expired' && (
                          <button className="bg-brand-red-600 text-white border-none rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer">Urgent: Renew Now</button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
