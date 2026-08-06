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
      'Acquiring Event Horizon vector coordinates...',
      'Opening capsule launch bays...',
      'EJECTING COMMUNICATIONS PROBE INTO WORMHOLE...',
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
        maxWidth: '650px',
        padding: '95px 24px 30px 24px',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      <div className="hud-panel animate-fade-in" style={{ padding: '20px' }}>
        
        {/* Header Telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '10px', color: 'var(--color-cyan)' }} className="hud-monospace">
            COMMUNICATION_UPLINK // SEC_03 // EVENT_HORIZON
          </span>
          <span style={{ fontSize: '9px', color: 'var(--color-magenta)' }} className="hud-monospace">
            ANTENNA_BEACON: BROADCASTING
          </span>
        </div>

        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '6px', letterSpacing: '1px' }}>
          DISTRESS <span className="glow-text-magenta">BEACON</span> (CONTACT)
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
          Need custom software systems integrated? Launch an encrypted data capsule directly into the singularity.
        </p>

        {status === 'READY' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
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
                  borderRadius: '4px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--hud-border-cyan)'}
              />
            </div>

            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
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
                  borderRadius: '4px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--hud-border-cyan)'}
              />
            </div>

            {/* Message Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                MESSAGE_PAYLOAD (DETAILS)
              </label>
              <textarea 
                required
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Input mission coordinates, project specifications, or interstellar greetings..."
                style={{
                  background: 'rgba(2, 2, 8, 0.6)',
                  border: '1px solid var(--hud-border-cyan)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.2s ease'
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
                padding: '12px',
                fontSize: '12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                letterSpacing: '2px',
                marginTop: '6px'
              }}
            >
              LAUNCH_COMMUNICATION_PROBE
            </button>

          </form>
        )}

        {/* Loading / Launch state */}
        {status === 'SENDING' && (
          <div style={{ padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,0,127,0.2)', borderTopColor: 'var(--color-magenta)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span className="hud-monospace glow-text-magenta" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                EJECTING PROBE POD...
              </span>
            </div>
            
            <div 
              className="hud-monospace"
              style={{
                background: 'rgba(2, 2, 8, 0.8)',
                border: '1px solid rgba(255,0,127,0.3)',
                padding: '14px',
                fontSize: '10px',
                color: 'var(--color-magenta)',
                lineHeight: '1.6',
                height: '140px',
                overflowY: 'auto',
                borderRadius: '4px',
                textAlign: 'left'
              }}
            >
              {probeLogs.map((log, idx) => (
                <div key={idx} style={{ marginBottom: '2px' }}>{log}</div>
              ))}
            </div>
          </div>
        )}

        {/* Success / Sent State */}
        {status === 'SENT' && (
          <div className="animate-scale-in" style={{ textAlign: 'center', padding: '20px 10px' }}>
            {/* Visual Success radar target */}
            <div style={{ display: 'inline-flex', position: 'relative', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 255, 102, 0.1)', border: '2px solid var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="radar-ripple" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px solid var(--color-green)', borderRadius: '50%', animation: 'ripple 1.5s linear infinite' }} />
            </div>

            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-header)', color: '#fff', marginBottom: '8px', fontWeight: 'bold' }}>
              PROBE LAUNCHED SUCCESSFULLY
            </h3>
            
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5', maxWidth: '400px', margin: '0 auto 20px auto' }}>
              The communication capsule has breached the event horizon. Return signal routing established to <strong style={{ color: '#fff' }}>{formData.email}</strong>. Capt. Anik will return transmissions shortly.
            </p>

            <button 
              onClick={handleReset}
              className="hud-button"
              style={{
                fontSize: '10px',
                padding: '8px 16px',
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
