// ProfileScreen.jsx — User profile, documents, settings

const ProfileScreen = () => {
  const [tab, setTab] = React.useState('profile');

  const docs = [
    { name: 'Passport', number: 'A1234567', expiry: '2028-03-15', status: 'valid', daysLeft: 710 },
    { name: 'Iqama (KSA)', number: 'IQ-9821034', expiry: '2026-05-04', status: 'expiring', daysLeft: 14 },
    { name: 'Work Visa', number: 'WV-00482', expiry: '2026-07-12', status: 'valid', daysLeft: 83 },
    { name: 'Medical Certificate', number: 'MC-2025', expiry: '2025-12-01', status: 'expired', daysLeft: -140 },
  ];

  const statusStyle = (s) => ({
    valid: { bg: '#E8F5EC', color: '#006400', label: 'VALID' },
    expiring: { bg: '#FEF7E8', color: '#C8881A', label: 'EXPIRING' },
    expired: { bg: '#F5E6E9', color: '#CE1126', label: 'EXPIRED' },
  }[s]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F5F5F5', overflow: 'hidden' }}>
      {/* Profile Hero */}
      <div style={{ background: '#006400', padding: '20px 20px 28px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(206,17,38,0.15)' }} />
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#CE1126', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: 'white', flexShrink: 0 }}>R</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>Rafiqul Islam</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>Electrician · Riyadh, KSA</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,0.2)', color: 'white', padding: '3px 10px', borderRadius: 9999 }}>VERIFIED</span>
              <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(244,168,50,0.3)', color: '#F4A832', padding: '3px 10px', borderRadius: 9999 }}>3 YRS ABROAD</span>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, position: 'relative' }}>
          {[['SAR 4,280', 'Balance'], ['৳1.2L', 'Sent home'], ['12', 'Transfers']].map(([v, l]) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ background: 'white', display: 'flex', borderBottom: '1px solid #E0E0E0' }}>
        {[['profile', 'Profile'], ['docs', 'Documents'], ['settings', 'Settings']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, padding: '12px 0', border: 'none', background: 'none', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: tab === id ? 700 : 500,
            color: tab === id ? '#006400' : '#8C8C8C',
            borderBottom: tab === id ? '2.5px solid #006400' : '2.5px solid transparent',
          }}>{label}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {tab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Personal Info</div>
              {[['Full Name', 'Rafiqul Islam'], ['Date of Birth', '12 Mar 1990'], ['Nationality', '🇧🇩 Bangladeshi'], ['Mobile', '+966 55 123 4567'], ['Home District', 'Sylhet, BD']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 12, color: '#5A5A5A' }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Emergency Contact</div>
              {[['Name', 'Fatema Begum (Wife)'], ['Mobile', '+880 171 234 5678'], ['Address', 'Sylhet Sadar']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 12, color: '#5A5A5A' }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'docs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {docs.map(d => {
              const s = statusStyle(d.status);
              return (
                <div key={d.name} style={{ background: 'white', borderRadius: 12, padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 2 }}>{d.number} · Exp: {d.expiry}</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, padding: '3px 9px', borderRadius: 9999, flexShrink: 0 }}>{s.label}</span>
                </div>
              );
            })}
            <button style={{ background: '#E8F5EC', color: '#006400', border: '1.5px dashed #006400', borderRadius: 12, padding: 14, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Upload New Document
            </button>
          </div>
        )}

        {tab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Language', value: 'English / বাংলা', icon: '🌐' },
              { label: 'Notifications', value: 'On', icon: '🔔' },
              { label: 'PIN & Security', value: 'Enabled', icon: '🔒' },
              { label: 'Linked Bank Accounts', value: '2 accounts', icon: '🏦' },
              { label: 'Help & Support', value: '', icon: '💬' },
              { label: 'About Probashi', value: 'v2.4.1', icon: 'ℹ️' },
            ].map(item => (
              <div key={item.label} style={{ background: 'white', borderRadius: 12, padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{item.label}</span>
                <span style={{ fontSize: 12, color: '#8C8C8C' }}>{item.value}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8C8C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            ))}
            <button style={{ background: '#F5E6E9', color: '#CE1126', border: 'none', borderRadius: 12, padding: 14, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 4 }}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { ProfileScreen });
