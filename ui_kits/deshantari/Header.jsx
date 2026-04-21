// Header.jsx — Deshantari App Header
// Export to window for cross-script use

const Header = ({ title, showBack, onBack, notifCount = 0, avatarInitial = 'R' }) => {
  return (
    <div style={{
      background: '#006400',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      minHeight: 56,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {showBack ? (
          <button onClick={onBack} style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
            width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', flexShrink: 0
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 17, height: 17, borderRadius: '50%', background: '#CE1126' }} />
            </div>
            <span style={{ color: 'white', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>Deshantari</span>
          </div>
        )}
        {showBack && <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>{title}</span>}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{
          position: 'relative', background: 'rgba(255,255,255,0.15)', border: 'none',
          borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', color: 'white'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {notifCount > 0 && (
            <span style={{
              position: 'absolute', top: -2, right: -2, background: '#CE1126', color: 'white',
              fontSize: 9, fontWeight: 700, minWidth: 16, height: 16, borderRadius: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #006400'
            }}>{notifCount}</span>
          )}
        </button>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: '#CE1126',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 13
        }}>{avatarInitial}</div>
      </div>
    </div>
  );
};

Object.assign(window, { Header });
