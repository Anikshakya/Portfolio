import React, { useState } from 'react';

export default function SectorContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('READY'); // READY, SENDING, SENT

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('SENDING');

    // Trigger mailto link directly to aniklinkin@gmail.com
    const subject = `Portfolio Message from ${formData.name}`;
    const body = `Hi Anik,\n\n${formData.message}\n\nSender Name: ${formData.name}\nSender Email: ${formData.email}`;
    const mailtoUrl = `mailto:aniklinkin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus('SENT');
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('READY');
  };

  return (
    <div 
      className="hud-contact-wrapper"
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
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-cyan)' }} className="hud-monospace">
            GET IN TOUCH // CONTACT
          </span>
          <a 
            href="mailto:aniklinkin@gmail.com"
            className="hud-monospace glow-text-magenta" 
            style={{ fontSize: '11px', textDecoration: 'none', fontWeight: 'bold' }}
          >
            EMAIL: aniklinkin@gmail.com
          </a>
        </div>

        <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '10px', letterSpacing: '1px' }}>
          GET IN <span className="glow-text-magenta">TOUCH</span>
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '28px', lineHeight: '1.6' }}>
          Have a project in mind or want to collaborate? Fill out the form below or send an email directly to <strong style={{ color: 'var(--color-cyan)' }}>aniklinkin@gmail.com</strong>.
        </p>

        {status === 'READY' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="hud-monospace" style={{ fontSize: '12px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                YOUR NAME
              </label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name..."
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
                YOUR EMAIL ADDRESS
              </label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
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
                YOUR MESSAGE
              </label>
              <textarea 
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here..."
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
                letterSpacing: '1px',
                marginTop: '10px'
              }}
            >
              SEND EMAIL TO ANIKLINKIN@GMAIL.COM
            </button>

          </form>
        )}

        {/* Loading state */}
        {status === 'SENDING' && (
          <div style={{ padding: '30px 0', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
              <div className="spinner" style={{ width: '28px', height: '28px', border: '3px solid rgba(255,0,127,0.2)', borderTopColor: 'var(--color-magenta)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span className="hud-monospace glow-text-magenta" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                OPENING YOUR MAIL CLIENT...
              </span>
            </div>
          </div>
        )}

        {/* Success / Sent State */}
        {status === 'SENT' && (
          <div className="animate-scale-in" style={{ textAlign: 'center', padding: '24px 10px' }}>
            <div style={{ display: 'inline-flex', position: 'relative', marginBottom: '20px' }}>
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(0, 255, 102, 0.1)', border: '2px solid var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-header)', color: '#fff', marginBottom: '12px', fontWeight: 'bold' }}>
              EMAIL CLIENT OPENED
            </h3>
            
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 24px auto' }}>
              Your message was prepared for <strong style={{ color: 'var(--color-cyan)' }}>aniklinkin@gmail.com</strong>. You can also email me directly anytime.
            </p>

            <button 
              onClick={handleReset}
              className="hud-button"
              style={{
                fontSize: '12px',
                padding: '10px 20px',
                borderColor: 'var(--color-cyan)'
              }}
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        )}

      </div>
      
      {/* Dynamic spinner animations & mobile styles */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .hud-contact-wrapper {
            padding-top: 95px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}