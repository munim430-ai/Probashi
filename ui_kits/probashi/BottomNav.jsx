// BottomNav.jsx — Probashi Bottom Navigation

const NAV_ITEMS = [
  {
    id: 'home', label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#006400' : '#8C8C8C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    id: 'send', label: 'Send',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#006400' : '#8C8C8C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    )
  },
  {
    id: 'jobs', label: 'Jobs',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#006400' : '#8C8C8C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    )
  },
  {
    id: 'docs', label: 'Docs',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#006400' : '#8C8C8C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    )
  },
  {
    id: 'profile', label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#006400' : '#8C8C8C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )
  }
];

const BottomNav = ({ active, onNavigate }) => (
  <div style={{
    background: 'white', borderTop: '1px solid #E0E0E0',
    display: 'flex', flexShrink: 0,
    paddingBottom: 8,
  }}>
    {NAV_ITEMS.map(item => {
      const isActive = active === item.id;
      return (
        <button key={item.id} onClick={() => onNavigate(item.id)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 3, padding: '8px 0 4px', border: 'none', background: 'none', cursor: 'pointer'
        }}>
          {item.icon(isActive)}
          <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, color: isActive ? '#006400' : '#8C8C8C', fontFamily: 'Poppins, sans-serif' }}>
            {item.label}
          </span>
          {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#006400' }} />}
        </button>
      );
    })}
  </div>
);

Object.assign(window, { BottomNav, NAV_ITEMS });
