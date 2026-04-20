// HomeScreen.jsx — Probashi Dashboard

const HomeScreen = ({ onNavigate }) => {
  const quickActions = [
    { id: 'send', label: 'Send Money', labelBn: 'টাকা পাঠান', color: '#006400', bg: '#E8F5EC',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
    { id: 'jobs', label: 'Find Jobs', labelBn: 'চাকরি খুঁজুন', color: '#1A56DB', bg: '#E8F0FE',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
    { id: 'docs', label: 'Documents', labelBn: 'কাগজপত্র', color: '#C8881A', bg: '#FEF7E8',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8881A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    { id: 'emergency', label: 'Emergency', labelBn: 'জরুরি সাহায্য', color: '#CE1126', bg: '#F5E6E9',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CE1126" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/></svg> },
  ];

  const transfers = [
    { name: 'Rina Begum', method: 'bKash', amount: '৳12,500', status: 'Delivered', statusColor: '#006400', statusBg: '#E8F5EC', date: 'Today' },
    { name: 'Karim Mia', method: 'Nagad', amount: '৳8,000', status: 'Processing', statusColor: '#C8881A', statusBg: '#FEF7E8', date: 'Yesterday' },
    { name: 'Fatema Khatun', method: 'Bank', amount: '৳25,000', status: 'Delivered', statusColor: '#006400', statusBg: '#E8F5EC', date: 'Apr 10' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F5F5F5' }}>
      {/* Balance Hero */}
      <div style={{ background: '#006400', padding: '20px 20px 32px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(206,17,38,0.18)' }} />
        <div style={{ position: 'absolute', bottom: -20, right: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Available Balance</div>
          <div style={{ color: 'white', fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>SAR 4,280</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>≈ ৳1,28,400</div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button onClick={() => onNavigate('send')} style={{
              background: 'white', color: '#006400', border: 'none', borderRadius: 8,
              padding: '9px 18px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Send Home
            </button>
            <button style={{
              background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)',
              borderRadius: 8, padding: '9px 16px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer'
            }}>Top Up</button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '0 16px', marginTop: -8 }}>
        <div style={{ background: 'white', borderRadius: 16, padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {quickActions.map(a => (
            <button key={a.id} onClick={() => onNavigate(a.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: 6, padding: '8px 4px'
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {a.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1A1A1A', textAlign: 'center', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>{a.label}</span>
              <span style={{ fontSize: 10, color: '#8C8C8C', fontFamily: 'Noto Sans Bengali, serif', lineHeight: 1.3, textAlign: 'center' }}>{a.labelBn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Alert Banner */}
      <div style={{ margin: '14px 16px 0', background: '#F5E6E9', borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CE1126" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#CE1126' }}>Iqama expires in 14 days</div>
          <div style={{ fontSize: 11, color: '#5A5A5A', marginTop: 2 }}>Renew your residence permit now to avoid penalties. <span style={{ color: '#CE1126', fontWeight: 600, cursor: 'pointer' }}>Renew →</span></div>
        </div>
      </div>

      {/* Job Suggestion */}
      <div style={{ margin: '14px 16px 0', background: 'white', borderRadius: 12, padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>New Job Match</span>
          <span onClick={() => onNavigate('jobs')} style={{ fontSize: 12, fontWeight: 600, color: '#006400', cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#E8F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#006400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>Construction Foreman</div>
            <div style={{ fontSize: 12, color: '#5A5A5A', marginTop: 2 }}>Al-Rashid Group · Dubai, UAE</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#F4A832', marginTop: 4 }}>AED 2,200/mo · Free accommodation</div>
          </div>
          <button onClick={() => onNavigate('jobs')} style={{ background: '#006400', color: 'white', border: 'none', borderRadius: 8, padding: '7px 12px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Apply</button>
        </div>
      </div>

      {/* Recent Transfers */}
      <div style={{ margin: '14px 16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>Recent Transfers</span>
          <span onClick={() => onNavigate('send')} style={{ fontSize: 12, fontWeight: 600, color: '#006400', cursor: 'pointer' }}>View all</span>
        </div>
        <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {transfers.map((t, i) => (
            <div key={i} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < transfers.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#E8F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#006400', flexShrink: 0 }}>
                {t.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 2 }}>{t.method} · {t.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{t.amount}</div>
                <span style={{ fontSize: 10, fontWeight: 600, background: t.statusBg, color: t.statusColor, padding: '2px 7px', borderRadius: 9999, marginTop: 3, display: 'inline-block' }}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { HomeScreen });
