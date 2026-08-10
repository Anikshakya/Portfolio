import React, { useState } from 'react';

export default function SectorContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('READY'); // READY, SENDING, SENT
  const [probeLogs, setProbeLogs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('SENDING');
    setProbeLogs([]);

    const logSteps = [
      'Encapsulating transmission payload...',
      'Encrypting data packets with SHA-512...',
      'Acquiring uplink vector coordinates...',
      'Opening secure channel...',
      'Transmitting handshake data...',
      'SIGNAL STRENGTH: 99.8% - UPLINK SYNCHRONIZED.'
    ];

    logSteps.forEach((log, index) => {
      setTimeout(() => {
        setProbeLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
        if (index === logSteps.length - 1) {
          setTimeout(() => {
            setStatus('SENT');
          }, 800);
        }
      }, (index + 1) * 600);
    });
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('READY');
    setProbeLogs([]);
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '800px',
        padding: '100px 24px 40px 24px',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      <div className="hud-panel animate-fade-in" style={{ padding: '32px' }}>
        
        {/* Header Telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-cyan)' }} className="hud-monospace">
            COMMUNICATION_UPLINK // SEC_03 // CONTACT_GRID
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-magenta)' }} className="hud-monospace">
            ANTENNA_BEACON: BROADCASTING
          </span>
        </div>

        <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '10px', letterSpacing: '1px' }}>
          DISTRESS <span className="glow-text-magenta">BEACON</span> (CONTACT)
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '28px', lineHeight: '1.6' }}>
          Need custom software systems integrated? Send a secure message and I’ll respond as soon as possible.
        </p>

        {status === 'READY' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="hud-monospace" style={{ fontSize: '12px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                SENDER_IDENTIFICATION (NAME)
              </label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your transmission signature..."
                style={{
                  background: 'rgba(2, 2, 8, 0.6)',
                  border: '1px solid var(--hud-border-cyan)',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--hud-border-cyan)'}
              />
            </div>

            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="hud-monospace" style={{ fontSize: '12px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                RETURN_UPLINK_FREQUENCY (EMAIL)
              </label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="comms-channel@galaxy.com"
                style={{
                  background: 'rgba(2, 2, 8, 0.6)',
                  border: '1px solid var(--hud-border-cyan)',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--hud-border-cyan)'}
              />
            </div>

            {/* Message Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="hud-monospace" style={{ fontSize: '12px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                MESSAGE_PAYLOAD (DETAILS)
              </label>
              <textarea 
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Input mission coordinates, project specifications, or interstellar greetings..."
                style={{
                  background: 'rgba(2, 2, 8, 0.6)',
                  border: '1px solid var(--hud-border-cyan)',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.2s ease',
                  lineHeight: '1.5'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--hud-border-cyan)'}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="hud-button-magenta"
              style={{
                padding: '16px',
                fontSize: '14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                letterSpacing: '2px',
                marginTop: '10px'
              }}
            >
              LAUNCH_COMMUNICATION_PROBE
            </button>

          </form>
        )}

        {/* Loading / Launch state */}
        {status === 'SENDING' && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="spinner" style={{ width: '28px', height: '28px', border: '3px solid rgba(255,0,127,0.2)', borderTopColor: 'var(--color-magenta)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span className="hud-monospace glow-text-magenta" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                EJECTING PROBE POD...
              </span>
            </div>
            
            <div 
              className="hud-monospace"
              style={{
                background: 'rgba(2, 2, 8, 0.8)',
                border: '1px solid rgba(255,0,127,0.3)',
                padding: '18px',
                fontSize: '12px',
                color: 'var(--color-magenta)',
                lineHeight: '1.8',
                height: '180px',
                overflowY: 'auto',
                borderRadius: '6px',
                textAlign: 'left'
              }}
            >
              {probeLogs.map((log, idx) => (
                <div key={idx} style={{ marginBottom: '4px' }}>{log}</div>
              ))}
            </div>
          </div>
        )}

        {/* Success / Sent State */}
        {status === 'SENT' && (
          <div className="animate-scale-in" style={{ textAlign: 'center', padding: '30px 10px' }}>
            {/* Visual Success radar target */}
            <div style={{ display: 'inline-flex', position: 'relative', marginBottom: '24px' }}>
              <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: 'rgba(0, 255, 102, 0.1)', border: '2px solid var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="radar-ripple" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px solid var(--color-green)', borderRadius: '50%', animation: 'ripple 1.5s linear infinite' }} />
            </div>

            <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-header)', color: '#fff', marginBottom: '12px', fontWeight: 'bold' }}>
              PROBE LAUNCHED SUCCESSFULLY
            </h3>
            
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 28px auto' }}>
              Your message is on its way. Confirmation sent to <strong style={{ color: '#fff' }}>{formData.email}</strong>. Capt. Anik will reply shortly.
            </p>

            <button 
              onClick={handleReset}
              className="hud-button"
              style={{
                fontSize: '12px',
                padding: '12px 24px',
                borderColor: 'var(--color-cyan)'
              }}
            >
              RESET_TRANSMISSION_PORT
            </button>
          </div>
        )}

      </div>
      
      {/* Dynamic spinner / radar animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}