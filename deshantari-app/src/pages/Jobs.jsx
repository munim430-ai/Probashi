import React, { useState } from 'react';
import { Search, Briefcase, ChevronLeft } from 'lucide-react';
import { Badge } from '../components/Badge';

const JOBS = [
  { id: 1, title: 'Electrician', company: 'Al-Rashid Group', location: 'Riyadh, KSA', salary: 'SAR 1,800/mo', contract: '2yr', acc: true, food: true, verified: true },
  { id: 2, title: 'Construction Foreman', company: 'Dubai Build Co.', location: 'Dubai, UAE', salary: 'AED 2,200/mo', contract: '3yr', acc: true, food: false, verified: true },
  { id: 3, title: 'Housekeeping Staff', company: 'Grand Hyatt KL', location: 'KL, Malaysia', salary: 'MYR 1,400/mo', contract: '2yr', acc: true, food: true, verified: false },
  { id: 4, title: 'Factory Operator', company: 'Samsung Electronics', location: 'Johor, Malaysia', salary: 'MYR 1,600/mo', contract: '2yr', acc: true, food: false, verified: true },
];

export const Jobs = () => {
  const [sel, setSel] = useState(null);
  const [applied, setApplied] = useState(new Set());

  if (sel !== null) {
    const j = JOBS.find(x => x.id === sel);
    const isApplied = applied.has(j.id);
    
    return (
      <div className="flex flex-col h-full bg-neutral-100 pb-20">
        <button 
          onClick={() => setSel(null)}
          className="m-4 mt-3 bg-white border-none rounded-lg p-2.5 flex items-center gap-2 cursor-pointer font-sans text-[13px] font-semibold text-neutral-600 shadow-sm w-fit active:scale-95 transition-transform"
        >
          <ChevronLeft size={18} strokeWidth={2.5} /> Back
        </button>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="bg-brand-green-600 rounded-2xl p-5 mb-4 shadow-sm relative overflow-hidden">
             <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mb-3 relative z-10">
               <Briefcase size={24} />
             </div>
             <div className="text-xl font-extrabold text-white relative z-10">{j.title}</div>
             <div className="text-sm text-white/75 mt-1 relative z-10">{j.company}</div>
             <div className="text-[13px] text-white/60 mt-0.5 relative z-10">{j.location}</div>
             <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-card">
            {[
              ['Salary', j.salary],
              ['Contract', j.contract],
              ['Accommodation', j.acc ? '✓ Provided' : '✗ Not included'],
              ['Food', j.food ? '✓ Provided' : '✗ Not included']
            ].map(([k, v], idx) => (
              <div key={k} className={`flex justify-between py-2 ${idx < 3 ? 'border-b border-neutral-50' : ''}`}>
                <span className="text-xs text-neutral-500">{k}</span>
                <span className={`text-xs font-bold ${v.startsWith('✓') ? 'text-brand-green-600' : v.startsWith('✗') ? 'text-brand-red-600' : 'text-neutral-900'}`}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)] fixed bottom-0 left-0 right-0 md:absolute rounded-b-[44px]">
          <button 
            onClick={() => setApplied(s => new Set([...s, j.id]))}
            className={`w-full border-none rounded-lg p-3 font-bold text-sm cursor-pointer transition-colors ${
              isApplied ? 'bg-brand-green-50 text-brand-green-600 border-[1.5px] border-brand-green-600' : 'bg-brand-green-600 text-white hover:bg-brand-green-700'
            }`}
          >
            {isApplied ? '✓ Application Submitted' : 'Apply Now'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <div className="bg-white p-3 shadow-sm z-10 shrink-0">
        <div className="flex gap-2 items-center bg-neutral-100 rounded-lg py-2 px-3">
          <Search size={18} className="text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search jobs…" 
            className="bg-transparent border-none outline-none text-sm w-full text-neutral-900 placeholder:text-neutral-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 pt-3">
        <div className="text-xs text-neutral-400 font-semibold mb-2.5 px-1">{JOBS.length} jobs found</div>
        
        {JOBS.map(j => (
          <div 
            key={j.id} 
            onClick={() => setSel(j.id)}
            className="bg-white rounded-xl p-3.5 shadow-card cursor-pointer mb-2.5 active:scale-[0.98] transition-transform"
          >
            <div className="flex gap-3 items-start">
              <div className="w-11 h-11 rounded-lg bg-brand-green-50 flex items-center justify-center shrink-0">
                <Briefcase className="text-brand-green-600" size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold text-neutral-900">{j.title}</span>
                  {j.verified && <Badge label="VERIFIED" variant="success" />}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">{j.company} · {j.location}</div>
                <div className="text-[13px] font-bold text-brand-gold-500 mt-1.5">{j.salary}</div>
                
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <Badge label={`${j.contract} contract`} variant="default" />
                  {j.acc && <Badge label="Accommodation" variant="success" />}
                  {j.food && <Badge label="Food" variant="warning" />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
