// SendMoneyScreen.jsx — Remittance Flow (3 steps)

const SendMoneyScreen = ({ onBack }) => {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ recipient: '', amount: '', method: 'bKash', phone: '' });
  const [sent, setSent] = React.useState(false);

  const methods = [
    { id: 'bKash', label: 'bKash', color: '#E2136E' },
    { id: 'Nagad', label: 'Nagad', color: '#F7941D' },
    { id: 'Bank', label: 'Bank Transfer', color: '#1A56DB' },
    { id: 'Rocket', label: 'Rocket', color: '#8B5CF6' },
  ];

  const rate = 22.8;
  const amountNum = parseFloat((form.amount || '0').replace(/,/g, '')) || 0;
  const bdt = (amountNum * rate).toLocaleString('en-BD', { maximumFractionDigits: 0 });
  const fee = amountNum > 0 ? 15 : 0;

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const StepDot = ({ n }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: step >= n ? '#006400' : '#E0E0E0',
        color: step >= n ? 'white' : '#8C8C8C', fontWeight: 700, fontSize: 13
      }}>{step > n ? '✓' : n}</div>
      <span style={{ fontSize: 10, color: step >= n ? '#006400' : '#8C8C8C', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
        {n === 1 ? 'Recipient' : n === 2 ? 'Amount' : 'Confirm'}
      </span>
    </div>
  );

  if (sent) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F5F5F5', padding: 24, gap: 16 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E8F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#006400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A' }}>Transfer Sent!</div>
        <div style={{ fontSize: 14, color: '#5A5A5A', marginTop: 4 }}>SAR {form.amount} → ৳{bdt}</div>
        <div style={{ fontSize: 13, color: '#8C8C8C', marginTop: 6 }}>To {form.recipient} via {form.method}</div>
        <div style={{ marginTop: 6, display: 'inline-block', background: '#E8F5EC', color: '#006400', fontSize: 11, fontWeight: 600, padding: '3px 12px', borderRadius: 9999 }}>Ref: PB-{Math.floor(Math.random()*9000+1000)}</div>
      </div>
      <div style={{ fontSize: 13, color: '#5A5A5A', textAlign: 'center', background: 'white', borderRadius: 12, padding: '12px 16px', width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        Expected delivery: <strong style={{ color: '#006400' }}>within 2 hours</strong>
      </div>
      <button onClick={() => { setSent(false); setStep(1); setForm({ recipient: '', amount: '', method: 'bKash', phone: '' }); onBack(); }} style={{
        background: '#006400', color: 'white', border: 'none', borderRadius: 8, padding: '12px 32px',
        fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', width: '100%', marginTop: 8
      }}>Done</button>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F5F5F5', overflow: 'hidden' }}>
      {/* Stepper */}
      <div style={{ background: 'white', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <StepDot n={1} />
        <div style={{ height: 2, width: 40, background: step > 1 ? '#006400' : '#E0E0E0', margin: '0 4px 16px' }} />
        <StepDot n={2} />
        <div style={{ height: 2, width: 40, background: step > 2 ? '#006400' : '#E0E0E0', margin: '0 4px 16px' }} />
        <StepDot n={3} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 14 }}>Who are you sending to?</div>
              <Field label="Recipient Name" value={form.recipient} onChange={v => update('recipient', v)} placeholder="e.g. Rina Begum" />
              <div style={{ marginTop: 12 }}>
                <Field label="Mobile Number (Bangladesh)" value={form.phone} onChange={v => update('phone', v)} placeholder="017X XXXX XXXX" />
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#5A5A5A', marginBottom: 8 }}>Transfer Method</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {methods.map(m => (
                    <button key={m.id} onClick={() => update('method', m.id)} style={{
                      border: `2px solid ${form.method === m.id ? '#006400' : '#E0E0E0'}`,
                      background: form.method === m.id ? '#E8F5EC' : 'white',
                      borderRadius: 8, padding: '10px 8px', cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13,
                      color: form.method === m.id ? '#006400' : '#1A1A1A', transition: 'all 150ms'
                    }}>{m.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 14 }}>How much to send?</div>
              <Field label="Amount (SAR)" value={form.amount} onChange={v => update('amount', v)} placeholder="0.00" type="number" />
              <div style={{ marginTop: 16, background: '#E8F5EC', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#5A5A5A' }}>Exchange Rate</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>1 SAR = ৳{rate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#5A5A5A' }}>Transfer Fee</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>SAR {fee}</span>
                </div>
                <div style={{ height: 1, background: '#C8EDCF', margin: '8px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>Recipient gets</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: '#006400' }}>৳{bdt}</span>
                </div>
              </div>
              <div style={{ marginTop: 12, background: '#FEF7E8', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: '#C8881A' }}>
                ⚡ Fastest delivery via {form.method} — usually under 2 hours
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 14 }}>Confirm Transfer</div>
              {[
                ['Recipient', form.recipient || '—'],
                ['Mobile', form.phone || '—'],
                ['Method', form.method],
                ['Amount', `SAR ${form.amount || '0'}`],
                ['Recipient gets', `৳${bdt}`],
                ['Fee', `SAR ${fee}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 12, color: '#5A5A5A' }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#F5E6E9', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#CE1126' }}>
              By confirming, you agree to Probashi's transfer terms and conditions.
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: '12px 16px 16px', background: 'white', boxShadow: '0 -2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: 10 }}>
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)} style={{
            flex: 1, background: 'white', color: '#006400', border: '1.5px solid #006400',
            borderRadius: 8, padding: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer'
          }}>Back</button>
        )}
        <button onClick={() => { if (step < 3) setStep(s => s + 1); else setSent(true); }} style={{
          flex: 2, background: '#006400', color: 'white', border: 'none',
          borderRadius: 8, padding: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer'
        }}>{step === 3 ? 'Confirm & Send' : 'Continue'}</button>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5A5A5A', marginBottom: 6, fontFamily: 'Poppins, sans-serif' }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: 14, padding: '10px 12px',
        border: '1.5px solid #C8C8C8', borderRadius: 8, outline: 'none', color: '#1A1A1A',
        background: 'white', boxSizing: 'border-box'
      }}
      onFocus={e => { e.target.style.borderColor = '#006400'; e.target.style.boxShadow = '0 0 0 3px rgba(0,100,0,0.12)'; }}
      onBlur={e => { e.target.style.borderColor = '#C8C8C8'; e.target.style.boxShadow = 'none'; }}
    />
  </div>
);

Object.assign(window, { SendMoneyScreen });
