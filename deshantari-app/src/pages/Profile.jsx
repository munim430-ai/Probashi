import React, { useState } from 'react';
import { Badge } from '../components/Badge';
import { FileText, ChevronRight, Globe, Bell, Lock, HelpCircle, Info } from 'lucide-react';
import clsx from 'clsx';

const DOCS = [
  { n: 'Passport',            num: 'A1234567',   exp: '2028-03-15', s: 'valid'    },
  { n: 'Iqama (KSA)',         num: 'IQ-9821034', exp: '2026-05-04', s: 'expiring' },
  { n: 'Medical Certificate', num: 'MC-2025',    exp: '2025-12-01', s: 'expired'  },
];
const ST = { 
  valid:    { color: 'text-brand-green-600', bg: 'bg-brand-green-50', label: 'VALID' }, 
  expiring: { color: 'text-brand-gold-600',  bg: 'bg-brand-gold-50',  label: 'EXPIRING' }, 
  expired:  { color: 'text-brand-red-600',   bg: 'bg-brand-red-50',   label: 'EXPIRED' } 
};

export const Profile = () => {
  const [tab, setTab] = useState('profile');

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <div className="bg-brand-green-600 px-5 pt-5 pb-7 relative overflow-hidden shrink-0">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-red-600/15" />
        
        <div className="flex gap-3.5 items-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-brand-red-600 flex items-center justify-center text-2xl font-extrabold text-white shrink-0 shadow-sm border-2 border-white/20">
            R
          </div>
          <div>
            <div className="text-lg font-extrabold text-white">Rafiqul Islam</div>
            <div className="text-[13px] text-white/75 mt-0.5">Electrician · Riyadh, KSA</div>
            <div className="flex gap-1.5 mt-2">
              <Badge label="VERIFIED" className="bg-white/15 text-white" />
              <Badge label="3 YRS ABROAD" className="bg-brand-gold-500/20 text-brand-gold-500" />
            </div>
          </div>
        </div>
        
        <div className="mt-5 grid grid-cols-3 gap-2 relative z-10">
          {[
            ['SAR 4.2k', 'Balance'],
            ['৳1.2L', 'Sent home'],
            ['12', 'Transfers']
          ].map(([v, l]) => (
            <div key={l} className="bg-white/10 rounded-xl p-2.5 text-center">
              <div className="text-[15px] font-extrabold text-white leading-tight">{v}</div>
              <div className="text-[10px] text-white/65 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white flex border-b border-neutral-200 shrink-0">
        {[
          ['profile', 'Profile'],
          ['docs', 'Documents'],
          ['settings', 'Settings']
        ].map(([id, label]) => (
          <button 
            key={id} 
            onClick={() => setTab(id)}
            className={clsx(
              "flex-1 py-3 border-none bg-transparent cursor-pointer font-sans text-[13px] transition-colors border-b-[2.5px]",
              tab === id ? 'font-bold text-brand-green-600 border-brand-green-600' : 'font-medium text-neutral-400 border-transparent'
            )}
          >
            {label}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'profile' && (
          <div className="bg-white rounded-xl p-4 shadow-card">
            {[
              ['Full Name', 'Rafiqul Islam'],
              ['Date of Birth', '12 Mar 1990'],
              ['Nationality', '🇧🇩 Bangladeshi'],
              ['Mobile', '+966 55 123 4567'],
              ['Home District', 'Sylhet, BD']
            ].map(([k, v], idx) => (
              <div key={k} className={`flex justify-between py-2 ${idx < 4 ? 'border-b border-neutral-50' : ''}`}>
                <span className="text-xs text-neutral-500">{k}</span>
                <span className="text-xs font-semibold text-neutral-900">{v}</span>
              </div>
            ))}
          </div>
        )}
        
        {tab === 'docs' && (
          <div className="flex flex-col gap-2.5">
            {DOCS.map(d => {
              const style = ST[d.s];
              return (
                <div key={d.n} className="bg-white rounded-xl p-3 shadow-card flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${style.bg} ${style.color}`}>
                    <FileText size={18} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-neutral-900 leading-tight">{d.n}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">Exp: {d.exp}</div>
                  </div>
                  <Badge label={style.label} className={`${style.bg} ${style.color}`} />
                </div>
              );
            })}
          </div>
        )}
        
        {tab === 'settings' && (
          <div className="flex flex-col gap-2">
            {[
              [Globe, 'Language', 'English / বাংলা'],
              [Bell, 'Notifications', 'On'],
              [Lock, 'PIN & Security', 'Enabled'],
              [HelpCircle, 'Help & Support', ''],
              [Info, 'About', 'v2.4.1']
            ].map(([Icon, label, val]) => (
              <div key={label} className="bg-white rounded-xl p-3.5 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-neutral-50">
                <Icon size={20} className="text-neutral-500" strokeWidth={1.5} />
                <span className="flex-1 text-sm font-semibold text-neutral-900">{label}</span>
                <span className="text-xs text-neutral-400">{val}</span>
                <ChevronRight size={16} className="text-neutral-300" />
              </div>
            ))}
            <button className="bg-brand-red-50 text-brand-red-600 border-none rounded-xl p-3.5 font-bold text-sm cursor-pointer mt-2 hover:bg-brand-red-100 transition-colors">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
