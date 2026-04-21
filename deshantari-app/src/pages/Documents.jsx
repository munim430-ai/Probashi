import React, { useState } from 'react';
import { FileText, Plus, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Badge } from '../components/Badge';
import { motion, AnimatePresence } from 'framer-motion';

const DOCS = [
  { n: 'Passport',            num: 'A1234567',   exp: '2028-03-15', s: 'valid',    issuer: 'Bangladesh Govt.' },
  { n: 'Iqama (KSA)',         num: 'IQ-9821034', exp: '2026-05-04', s: 'expiring', issuer: 'MOI Saudi Arabia' },
  { n: 'Work Visa',           num: 'WV-00482',   exp: '2026-07-12', s: 'valid',    issuer: 'KVAC Riyadh' },
  { n: 'Medical Certificate', num: 'MC-2025',    exp: '2025-12-01', s: 'expired',  issuer: 'GAMCA' },
  { n: 'Labour Contract',     num: 'LC-4490',    exp: '2027-01-20', s: 'valid',    issuer: 'Al-Rashid Group' },
];

const STATUS = {
  valid:    { color: 'text-brand-green-600', bg: 'bg-brand-green-50', label: 'VALID',    variant: 'success' },
  expiring: { color: 'text-brand-gold-600',  bg: 'bg-brand-gold-50',  label: 'EXPIRING', variant: 'warning' },
  expired:  { color: 'text-brand-red-600',   bg: 'bg-brand-red-50',   label: 'EXPIRED',  variant: 'danger'  },
};

export const Documents = () => {
  const [open, setOpen] = useState(null);

  const expiring = DOCS.filter(d => d.s === 'expiring' || d.s === 'expired').length;

  return (
    <div className="flex flex-col min-h-full bg-neutral-100">
      {/* Hero */}
      <div className="bg-brand-gold-500 px-4 pt-4 pb-6 relative overflow-hidden shrink-0">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/20" />
        <div className="relative z-10">
          <div className="font-display text-base text-white/70 mb-1">আপনার কাগজপত্র</div>
          <div className="text-[17px] font-extrabold text-white leading-snug mb-1">Your Documents</div>
          <div className="text-xs text-white/80">{DOCS.length} documents stored securely</div>
        </div>
      </div>

      <div className="p-3.5 pb-6 flex flex-col gap-3">
        {/* Alert */}
        {expiring > 0 && (
          <div className="bg-brand-red-50 rounded-xl p-3 flex gap-2.5 items-start">
            <AlertTriangle size={16} className="text-brand-red-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold text-brand-red-600">{expiring} document{expiring > 1 ? 's' : ''} need attention</div>
              <div className="text-[11px] text-neutral-600 mt-0.5">Renew expired or expiring documents to avoid issues.</div>
            </div>
          </div>
        )}

        {/* Documents List */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {DOCS.map((doc, i) => {
            const st = STATUS[doc.s];
            const isOpen = open === i;
            return (
              <div key={doc.n} className={i < DOCS.length - 1 ? 'border-b border-neutral-100' : ''}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 bg-transparent border-none cursor-pointer text-left"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${st.bg} ${st.color}`}>
                    <FileText size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-neutral-900 leading-tight">{doc.n}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">Exp: {doc.exp}</div>
                  </div>
                  <Badge label={st.label} variant={st.variant} />
                  <div className="ml-1 text-neutral-300">
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
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
                      <div className="pl-[52px] pr-4 pb-4 flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-1.5">
                          <div>
                            <div className="text-[10px] text-neutral-400 font-semibold">Document No.</div>
                            <div className="text-xs font-bold text-neutral-700">{doc.num}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-neutral-400 font-semibold">Issuer</div>
                            <div className="text-xs font-bold text-neutral-700">{doc.issuer}</div>
                          </div>
                        </div>
                        {doc.s === 'expiring' && (
                          <button className="bg-blue-600 text-white border-none rounded-lg px-3 py-2 text-xs font-bold cursor-pointer self-start">
                            Renew with Legal Guardian
                          </button>
                        )}
                        {doc.s === 'expired' && (
                          <button className="bg-brand-red-600 text-white border-none rounded-lg px-3 py-2 text-xs font-bold cursor-pointer self-start">
                            Urgent: Renew Now
                          </button>
                        )}
                        <button className="bg-neutral-100 text-neutral-600 border-none rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer self-start">
                          Download PDF
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Add Document */}
        <button className="bg-white border-2 border-dashed border-neutral-200 text-neutral-400 rounded-2xl p-4 flex items-center justify-center gap-2 font-bold text-sm cursor-pointer w-full hover:border-brand-green-400 hover:text-brand-green-600 transition-colors">
          <Plus size={18} /> Add Document
        </button>
      </div>
    </div>
  );
};
