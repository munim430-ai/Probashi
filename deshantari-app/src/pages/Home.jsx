import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Thermometer, Droplets, Wind, ShieldAlert } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────
const DEBT_PAID_PCT = 85;
const DREAM_PCT     = 20;
const DREAM_GOAL    = "Daughter's Education";

const PRAYERS = [
  { name: 'Fajr',    icon: '🌙', time: '4:45 AM',  mins: 4  * 60 + 45 },
  { name: 'Dhuhr',   icon: '☀️', time: '12:15 PM', mins: 12 * 60 + 15 },
  { name: 'Asr',     icon: '🌤️', time: '3:30 PM',  mins: 15 * 60 + 30 },
  { name: 'Maghrib', icon: '🌅', time: '6:20 PM',  mins: 18 * 60 + 20 },
  { name: 'Isha',    icon: '🌜', time: '7:50 PM',  mins: 19 * 60 + 50 },
];

// Rotates each day via day-of-year index
const HADITHS = [
  { text: 'The best of deeds in the sight of Allah is prayer performed on time.', source: 'Sahih Bukhari' },
  { text: 'Whoever prays Fajr is under the protection of Allah.', source: 'Sahih Muslim' },
  { text: 'He who performs the Fajr and Asr prayers will enter Paradise.', source: 'Bukhari & Muslim' },
  { text: 'Prayer is the pillar of religion.', source: 'Al-Bayhaqi' },
  { text: 'Pray as you have seen me praying.', source: 'Sahih Bukhari' },
  { text: 'The first thing one will be asked about on Judgement Day is prayer.', source: 'Ibn Majah' },
  { text: 'Between man and polytheism is the abandonment of prayer.', source: 'Sahih Muslim' },
  { text: 'Make use of five before five: youth before old age, health before sickness, wealth before poverty, free time before preoccupation, and life before death.', source: 'Al-Hakim' },
];

// Static heat data — Riyadh (swap city for user location later)
const HEAT = {
  location: 'Riyadh, Saudi Arabia',
  temp: 42,
  feelsLike: 49,
  humidity: 18,
  uvIndex: 11,
  wind: 14,
  risk: 'EXTREME',           // 'MODERATE' | 'HIGH' | 'EXTREME'
  avoidWindow: '11 AM – 4 PM',
  hydration: 'Drink 500 ml every hour',
  tips: [
    { icon: '🚫', text: 'Avoid direct outdoor work 11 AM – 4 PM' },
    { icon: '💧', text: 'Drink water before you feel thirsty' },
    { icon: '👷', text: 'Wear light, loose-fitting clothing' },
    { icon: '🏥', text: 'Nearest clinic: King Fahd Hospital' },
  ],
};

const RISK = {
  MODERATE: { label: 'Moderate',  color: '#D97706', bg: '#FFFBEB', track: '#FDE68A', pct: 38 },
  HIGH:     { label: 'High Risk', color: '#DC2626', bg: '#FEF2F2', track: '#FCA5A5', pct: 68 },
  EXTREME:  { label: 'EXTREME',   color: '#7C3AED', bg: '#F5F3FF', track: '#C4B5FD', pct: 100 },
};

// ─────────────────────────────────────────────────────────────────────
// HOOKS & HELPERS
// ─────────────────────────────────────────────────────────────────────
function useVillageSync() {
  const [sync, setSync] = useState({ time: '', weather: '🌧️ Raining', location: 'Cumilla' });
  useEffect(() => {
    const tick = () => {
      const bd   = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
      const h    = bd.getHours();
      const m    = bd.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12  = (h % 12) || 12;
      setSync(prev => ({ ...prev, time: `${h12}:${m} ${ampm}` }));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return sync;
}

function getNextPrayerName() {
  const mins = new Date().getHours() * 60 + new Date().getMinutes();
  return (PRAYERS.find(p => p.mins > mins) ?? PRAYERS[0]).name;
}

function getDayKey(daysBack = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysBack);
  return `dlog_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
}

function calcWeekly()  { let t = 0; for (let i = 0; i < 7;                    i++) t += parseFloat(localStorage.getItem(getDayKey(i)) || 0); return t; }
function calcMonthly() { let t = 0; for (let i = 0; i < new Date().getDate(); i++) t += parseFloat(localStorage.getItem(getDayKey(i)) || 0); return t; }

function getDailyHadith() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86_400_000);
  return HADITHS[dayOfYear % HADITHS.length];
}

// ─────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────
export const Home = () => {
  const village  = useVillageSync();
  const debtDone = DEBT_PAID_PCT >= 100;
  const hadith   = getDailyHadith();
  const risk     = RISK[HEAT.risk];

  // Prayer
  const [nextPrayer, setNextPrayer] = useState(getNextPrayerName);
  useEffect(() => {
    const id = setInterval(() => setNextPrayer(getNextPrayerName()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Hours log
  const [hoursInput, setHoursInput] = useState('');
  const [todayHrs,   setTodayHrs]   = useState(() => parseFloat(localStorage.getItem(getDayKey(0)) || 0));
  const [weeklyHrs,  setWeeklyHrs]  = useState(calcWeekly);
  const [monthlyHrs, setMonthlyHrs] = useState(calcMonthly);
  const [saved,      setSaved]      = useState(false);

  const logHours = () => {
    const v = parseFloat(hoursInput);
    if (isNaN(v) || v < 0 || v > 24) return;
    localStorage.setItem(getDayKey(0), v);
    setTodayHrs(v);
    setWeeklyHrs(calcWeekly());
    setMonthlyHrs(calcMonthly());
    setHoursInput('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const dailyOT  = Math.max(0, todayHrs  - 8);
  const weeklyOT = Math.max(0, weeklyHrs - 48);

  return (
    <div className="flex flex-col pb-6">

      {/* ══════════════════════════════════════════════
          1. HERO — Wallet + Village Sync + Debt Bridge
      ══════════════════════════════════════════════ */}
      <div
        className="px-5 pt-4 pb-7 relative overflow-hidden shrink-0"
        style={{ background: 'linear-gradient(145deg,#005229 0%,#006837 55%,#007a40 100%)', boxShadow:'0 4px 24px rgba(0,104,55,0.35)' }}
      >
        {/* River-delta watermark */}
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full"
          style={{ opacity:0.06, pointerEvents:'none' }}
          viewBox="0 0 375 200" preserveAspectRatio="xMidYMid slice">
          <path d="M0 140 Q40 110 80 130 Q120 150 160 120 Q200 90 240 115 Q280 140 320 100 Q350 75 375 95 L375 200 L0 200Z" fill="white"/>
          <path d="M0 160 Q60 145 110 155 Q170 165 220 145 Q270 125 320 140 Q350 150 375 135 L375 200 L0 200Z" fill="white" style={{opacity:0.5}}/>
          <ellipse cx="300" cy="60" rx="50" ry="30" fill="white"/>
          <ellipse cx="80"  cy="40" rx="35" ry="20" fill="white"/>
        </svg>
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{background:'rgba(255,255,255,0.05)'}}/>
        <div className="absolute bottom-3 right-[-20px] w-20 h-20 rounded-full" style={{background:'rgba(255,255,255,0.04)'}}/>

        <div className="relative z-10">
          {/* Village Sync */}
          <div className="flex items-center gap-1 mb-3">
            <MapPin size={11} style={{color:'rgba(255,255,255,0.75)',flexShrink:0}}/>
            <span style={{fontSize:'11px',color:'rgba(255,255,255,0.80)',fontWeight:500,letterSpacing:'0.01em'}}>
              {village.location}&nbsp;&nbsp;•&nbsp;&nbsp;{village.time}&nbsp;&nbsp;•&nbsp;&nbsp;{village.weather}
            </span>
          </div>

          {/* Balance */}
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.68)',fontWeight:500,marginBottom:'2px'}}>Available Balance</div>
          <div style={{fontSize:'36px',color:'white',fontWeight:800,lineHeight:1,letterSpacing:'-0.02em',marginBottom:'2px'}}>SAR 4,280</div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.50)',marginBottom:'14px'}}>≈ ৳1,28,400</div>

          {/* Debt-to-Dream Bridge */}
          <div>
            <div className="flex justify-between items-center" style={{marginBottom:'5px'}}>
              <span style={{fontSize:'11px',color:'rgba(255,255,255,0.85)',fontWeight:600}}>
                {debtDone ? `🌟 Dream Goal: ${DREAM_GOAL}` : `Migration Debt: ${DEBT_PAID_PCT}% Paid`}
              </span>
              <span style={{fontSize:'11px',color:'rgba(255,255,255,0.55)',fontWeight:500}}>
                {debtDone ? `${DREAM_PCT}%` : `${DEBT_PAID_PCT}/100`}
              </span>
            </div>
            <div style={{height:'8px',borderRadius:'99px',background:'rgba(255,255,255,0.15)',position:'relative',overflow:'hidden'}}>
              {debtDone ? (
                <div style={{position:'absolute',inset:0,width:`${DREAM_PCT}%`,borderRadius:'99px',background:'linear-gradient(90deg,#F4A832,#FFD700,#F4A832)',backgroundSize:'200% 100%',animation:'shimmer 2s linear infinite',boxShadow:'0 0 8px rgba(244,168,50,0.75)'}}/>
              ) : (
                <div style={{position:'absolute',inset:0,width:`${DEBT_PAID_PCT}%`,borderRadius:'99px',background:'linear-gradient(90deg,#e05555 0%,#34c759 100%)',boxShadow:'0 0 10px rgba(52,199,89,0.5)',transition:'width 1.2s cubic-bezier(0.4,0,0.2,1)'}}/>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}`}</style>

      {/* ══════════════════════════════════════════════
          2. DAILY HOURS LOG
      ══════════════════════════════════════════════ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-card p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Clock size={15} strokeWidth={2.5} style={{color:'#006837'}}/>
            <span className="text-[13px] font-bold text-neutral-900">Daily Hours Log</span>
          </div>
          <div className="flex gap-1.5">
            {dailyOT  > 0 && <span style={{fontSize:'10px',fontWeight:700,padding:'2px 8px',borderRadius:'99px',background:'#FEF3C7',color:'#B45309'}}>Day +{dailyOT}h OT</span>}
            {weeklyOT > 0 && <span style={{fontSize:'10px',fontWeight:700,padding:'2px 8px',borderRadius:'99px',background:'#FEE2E2',color:'#B91C1C'}}>Week +{weeklyOT.toFixed(1)}h OT</span>}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: 'Today',      value: todayHrs   > 0 ? `${todayHrs}h`              : '—' },
            { label: 'This Week',  value: weeklyHrs  > 0 ? `${weeklyHrs.toFixed(1)}h`  : '—', ot: weeklyOT  > 0 },
            { label: 'This Month', value: monthlyHrs > 0 ? `${monthlyHrs.toFixed(1)}h` : '—' },
          ].map(({ label, value, ot }) => (
            <div key={label} className="rounded-xl p-2.5 text-center" style={{background:'#F5F5F5'}}>
              <div style={{fontSize:'10px',color:'#8C8C8C',marginBottom:'2px'}}>{label}</div>
              <div style={{fontSize:'15px',fontWeight:800,color:'#1A1A1A',lineHeight:1}}>{value}</div>
              {ot && <div style={{fontSize:'9px',fontWeight:700,color:'#B45309',marginTop:'3px'}}>Overtime!</div>}
            </div>
          ))}
        </div>

        {/* Input row */}
        <div className="flex gap-2 items-center">
          <input
            id="hours-log-input"
            type="number" min="0" max="24" step="0.5"
            value={hoursInput}
            onChange={e => setHoursInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && logHours()}
            placeholder="Hours worked today (e.g. 9.5)"
            style={{flex:1,borderRadius:'12px',border:'1.5px solid #E0E0E0',padding:'8px 12px',fontSize:'13px',color:'#1A1A1A',outline:'none',fontFamily:'inherit',transition:'border-color 0.2s'}}
            onFocus={e => e.target.style.borderColor='#006837'}
            onBlur ={e => e.target.style.borderColor='#E0E0E0'}
          />
          <button
            id="hours-log-btn"
            onClick={logHours}
            style={{borderRadius:'12px',padding:'8px 18px',fontWeight:700,fontSize:'13px',cursor:'pointer',border:'none',background:saved?'#34c759':'#006837',color:'white',minWidth:'70px',boxShadow:'0 2px 8px rgba(0,104,55,0.25)',transition:'background 0.3s'}}
          >
            {saved ? '✓ Saved' : 'Log'}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. NAMAZ WAQT + DYNAMIC HADITH
      ══════════════════════════════════════════════ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-card p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span style={{fontSize:'16px'}}>🕌</span>
            <span className="text-[13px] font-bold text-neutral-900">Namaz Waqt</span>
          </div>
          <span style={{fontSize:'10px',color:'#8C8C8C',fontWeight:500}}>Riyadh · Static</span>
        </div>

        {/* Prayer cards */}
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {PRAYERS.map(p => {
            const isNext = p.name === nextPrayer;
            return (
              <div key={p.name}
                className="flex flex-col items-center rounded-xl py-2.5 px-1 transition-all"
                style={isNext
                  ? { background:'linear-gradient(160deg,#005229,#007a40)', boxShadow:'0 4px 14px rgba(0,104,55,0.32)' }
                  : { background:'#F5F5F5' }
                }
              >
                <span style={{fontSize:'15px',marginBottom:'3px'}}>{p.icon}</span>
                <span style={{fontSize:'10px',fontWeight:isNext?700:600,color:isNext?'white':'#1A1A1A',textAlign:'center'}}>{p.name}</span>
                <span style={{fontSize:'9px',fontWeight:500,marginTop:'2px',color:isNext?'rgba(255,255,255,0.78)':'#8C8C8C'}}>{p.time}</span>
                {isNext && (
                  <span style={{fontSize:'8px',fontWeight:700,marginTop:'5px',padding:'1px 6px',borderRadius:'99px',background:'rgba(255,255,255,0.22)',color:'white'}}>Next</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Hadith of the Day */}
        <div style={{borderTop:'1px solid #F0F0F0',paddingTop:'12px'}}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span style={{fontSize:'13px'}}>📿</span>
            <span style={{fontSize:'10px',fontWeight:700,color:'#006837',letterSpacing:'0.03em',textTransform:'uppercase'}}>Hadith of the Day</span>
          </div>
          <p style={{fontSize:'12px',color:'#2E2E2E',lineHeight:1.6,fontStyle:'italic',margin:'0 0 4px 0'}}>
            "{hadith.text}"
          </p>
          <p style={{fontSize:'10px',color:'#8C8C8C',fontWeight:600,margin:0}}>— {hadith.source}</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          4. SOCHETONATA — HEALTH & HEAT SAFETY SHIELD
      ══════════════════════════════════════════════ */}
      <div className="mx-4 mt-4 rounded-2xl shadow-card overflow-hidden" style={{background:'white'}}>

        {/* Top banner — risk colour */}
        <div className="px-4 py-3 flex items-center justify-between"
          style={{background:risk.bg, borderBottom:`2px solid ${risk.color}20`}}>
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} strokeWidth={2.5} style={{color:risk.color,flexShrink:0}}/>
            <div>
              <div style={{fontSize:'13px',fontWeight:800,color:'#1A1A1A'}}>Sochetonata Safety Shield</div>
              <div style={{fontSize:'10px',color:'#5A5A5A',marginTop:'1px'}}>📍 {HEAT.location}</div>
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'10px',fontWeight:700,color:risk.color,textTransform:'uppercase',letterSpacing:'0.04em'}}>{risk.label}</div>
            <div style={{fontSize:'10px',color:'#8C8C8C',marginTop:'1px'}}>Heat Risk</div>
          </div>
        </div>

        <div className="p-4">
          {/* Temperature row */}
          <div className="flex items-end gap-3 mb-3">
            <div>
              <div style={{fontSize:'42px',fontWeight:900,lineHeight:1,color:'#1A1A1A'}}>{HEAT.temp}°</div>
              <div style={{fontSize:'11px',color:'#8C8C8C',marginTop:'2px'}}>Feels like {HEAT.feelsLike}°C</div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-1.5 pb-1">
              {[
                { icon: <Droplets size={13}/>, label: 'Humidity', val: `${HEAT.humidity}%`,   color:'#3B82F6' },
                { icon: <Wind      size={13}/>, label: 'Wind',     val: `${HEAT.wind} km/h`,  color:'#6366F1' },
                { icon: <Thermometer size={13}/>, label: 'UV Index', val: `${HEAT.uvIndex}`,  color:'#EF4444' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-2 text-center" style={{background:'#F5F5F5'}}>
                  <div style={{color:s.color,display:'flex',justifyContent:'center',marginBottom:'2px'}}>{s.icon}</div>
                  <div style={{fontSize:'12px',fontWeight:800,color:'#1A1A1A'}}>{s.val}</div>
                  <div style={{fontSize:'9px',color:'#8C8C8C'}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk gauge bar */}
          <div style={{marginBottom:'14px'}}>
            <div className="flex justify-between items-center" style={{marginBottom:'5px'}}>
              <span style={{fontSize:'11px',fontWeight:600,color:'#5A5A5A'}}>Heat Danger Level</span>
              <span style={{fontSize:'11px',fontWeight:700,color:risk.color}}>{risk.label}</span>
            </div>
            <div style={{height:'8px',borderRadius:'99px',background:'#F0F0F0',position:'relative',overflow:'hidden'}}>
              <div style={{
                position:'absolute',inset:0,
                width:`${risk.pct}%`,
                borderRadius:'99px',
                background:`linear-gradient(90deg,#34c759,#F59E0B,${risk.color})`,
                boxShadow:`0 0 10px ${risk.color}66`,
                transition:'width 1s ease',
              }}/>
            </div>
            <div className="flex justify-between" style={{marginTop:'3px'}}>
              {['Safe','Moderate','High','Extreme'].map(l => (
                <span key={l} style={{fontSize:'8px',color:'#BCBCBC',fontWeight:500}}>{l}</span>
              ))}
            </div>
          </div>

          {/* Avoid window alert */}
          <div className="flex items-center gap-2 rounded-xl p-2.5 mb-3"
            style={{background:`${risk.color}12`,border:`1px solid ${risk.color}30`}}>
            <span style={{fontSize:'16px'}}>⚠️</span>
            <div>
              <div style={{fontSize:'11px',fontWeight:700,color:risk.color}}>Avoid Outdoor Work: {HEAT.avoidWindow}</div>
              <div style={{fontSize:'10px',color:'#5A5A5A',marginTop:'1px'}}>{HEAT.hydration}</div>
            </div>
          </div>

          {/* Safety tips */}
          <div>
            <div style={{fontSize:'10px',fontWeight:700,color:'#5A5A5A',textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:'8px'}}>Safety Tips</div>
            <div className="flex flex-col gap-1.5">
              {HEAT.tips.map((tip, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{background:'#F5F5F5'}}>
                  <span style={{fontSize:'13px',flexShrink:0}}>{tip.icon}</span>
                  <span style={{fontSize:'11px',color:'#2E2E2E'}}>{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
