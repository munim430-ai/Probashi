// JobsScreen.jsx — Job listings + detail view

const JOBS = [
  { id: 1, title: 'Electrician', company: 'Al-Rashid Group', location: 'Riyadh, KSA', salary: 'SAR 1,800/mo', contract: '2yr', accommodation: true, food: true, verified: true, category: 'Construction', posted: '2 days ago' },
  { id: 2, title: 'Construction Foreman', company: 'Dubai Build Co.', location: 'Dubai, UAE', salary: 'AED 2,200/mo', contract: '3yr', accommodation: true, food: false, verified: true, category: 'Construction', posted: '3 days ago' },
  { id: 3, title: 'Housekeeping Staff', company: 'Grand Hyatt Kuala Lumpur', location: 'KL, Malaysia', salary: 'MYR 1,400/mo', contract: '2yr', accommodation: true, food: true, verified: false, category: 'Hospitality', posted: '1 week ago' },
  { id: 4, title: 'Factory Operator', company: 'Samsung Electronics', location: 'Johor, Malaysia', salary: 'MYR 1,600/mo', contract: '2yr', accommodation: true, food: false, verified: true, category: 'Manufacturing', posted: '5 days ago' },
  { id: 5, title: 'Security Guard', company: 'G4S Security', location: 'Abu Dhabi, UAE', salary: 'AED 1,500/mo', contract: '1yr', accommodation: true, food: true, verified: true, category: 'Security', posted: 'Today' },
];

const FILTERS = ['All', 'Construction', 'Hospitality', 'Manufacturing', 'Security'];

const JobsScreen = () => {
  const [filter, setFilter] = React.useState('All');
  const [selected, setSelected] = React.useState(null);
  const [applied, setApplied] = React.useState(new Set());

  const filtered = filter === 'All' ? JOBS : JOBS.filter(j => j.category === filter);

  if (selected) {
    const j = JOBS.find(x => x.id === selected);
    const isApplied = applied.has(j.id);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F5F5F5', overflow: 'hidden' }}>
        <button onClick={() => setSelected(null)} style={{
          margin: '14px 16px 0', background: 'white', border: 'none', borderRadius: 10, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
          fontSize: 13, fontWeight: 600, color: '#5A5A5A', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', width: 'fit-content'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to jobs
        </button>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 80px' }}>
          <div style={{ background: '#006400', borderRadius: 14, padding: '20px', marginBottom: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>{j.title}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{j.company}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{j.location}</div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>Job Details</div>
            {[
              ['Salary', j.salary], ['Contract', j.contract], ['Posted', j.posted],
              ['Accommodation', j.accommodation ? '✓ Provided' : '✗ Not included'],
              ['Food', j.food ? '✓ Provided' : '✗ Not included'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                <span style={{ fontSize: 12, color: '#5A5A5A' }}>{k}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: v.startsWith('✓') ? '#006400' : v.startsWith('✗') ? '#CE1126' : '#1A1A1A' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Requirements</div>
            {['Valid passport (6+ months)', 'Medical certificate', 'Good physical health', 'Previous experience preferred'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#006400', marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#5A5A5A', lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '12px 16px', background: 'white', boxShadow: '0 -2px 8px rgba(0,0,0,0.06)' }}>
          <button onClick={() => setApplied(s => new Set([...s, j.id]))} style={{
            width: '100%', background: isApplied ? '#E8F5EC' : '#006400', color: isApplied ? '#006400' : 'white',
            border: isApplied ? '1.5px solid #006400' : 'none', borderRadius: 8, padding: 13,
            fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer'
          }}>{isApplied ? '✓ Application Submitted' : 'Apply Now'}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F5F5F5', overflow: 'hidden' }}>
      <div style={{ background: 'white', padding: '12px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#F5F5F5', borderRadius: 10, padding: '9px 12px', marginBottom: 12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: 14, color: '#8C8C8C', fontFamily: 'Poppins, sans-serif' }}>Search jobs…</span>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? '#006400' : '#F5F5F5',
              color: filter === f ? 'white' : '#5A5A5A',
              border: 'none', borderRadius: 9999, padding: '6px 14px',
              fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 12,
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
            }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
        <div style={{ fontSize: 12, color: '#8C8C8C', marginBottom: 10 }}>{filtered.length} jobs found</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(j => (
            <div key={j.id} onClick={() => setSelected(j.id)} style={{ background: 'white', borderRadius: 12, padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#E8F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#006400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{j.title}</div>
                    {j.verified && <span style={{ fontSize: 9, fontWeight: 700, background: '#E8F5EC', color: '#006400', padding: '2px 7px', borderRadius: 9999 }}>VERIFIED</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#5A5A5A', marginTop: 2 }}>{j.company} · {j.location}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F4A832', marginTop: 6 }}>{j.salary}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, background: '#F5F5F5', color: '#5A5A5A', padding: '2px 8px', borderRadius: 9999 }}>{j.contract} contract</span>
                    {j.accommodation && <span style={{ fontSize: 10, fontWeight: 600, background: '#E8F5EC', color: '#006400', padding: '2px 8px', borderRadius: 9999 }}>Accommodation</span>}
                    {j.food && <span style={{ fontSize: 10, fontWeight: 600, background: '#FEF7E8', color: '#C8881A', padding: '2px 8px', borderRadius: 9999 }}>Food</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { JobsScreen });
