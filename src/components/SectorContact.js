import React, { useState } from 'react';

export default function SectorContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('READY');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('SENDING');

    const subject = `Mobile Architecture Inquiry from ${formData.name}`;
    const body = `Hi Anik,\n\n${formData.message}\n\nSender Name: ${formData.name}\nSender Email: ${formData.email}`;
    const mailtoUrl = `mailto:aniklinkin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus('SENT');
    }, 500);
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
        maxWidth: '820px',
        padding: '90px 20px 30px 20px',
        maxHeight: 'calc(100vh - 65px)',
        overflowY: 'auto',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      <div className="editorial-card" style={{ padding: '36px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            DIRECT CONTACT // INQUIRIES
          </span>
          <a 
            href="mailto:aniklinkin@gmail.com"
            className="hud-monospace" 
            style={{ fontSize: '11px', textDecoration: 'none', color: 'var(--accent-primary)', fontWeight: '600' }}
          >
            aniklinkin@gmail.com
          </a>
        </div>

        <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.04em' }} className="headline-gradient">
          LET'S BUILD SOMETHING GREAT
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: '1.6' }}>
          Interested in bringing a mobile app vision to life, or building scalable cross-platform architectures? Send a message directly to <strong style={{ color: 'var(--text-primary)' }}>aniklinkin@gmail.com</strong>.
        </p>

        {status === 'READY' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>
                YOUR NAME
              </label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name..."
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.25s ease, background 0.25s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--border-hover)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-subtle)';
                }}
              />
            </div>

            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>
                YOUR EMAIL ADDRESS
              </label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.25s ease, background 0.25s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--border-hover)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-subtle)';
                }}
              />
            </div>

            {/* Message Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>
                YOUR MESSAGE
              </label>
              <textarea 
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share project details or ideas..."
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.25s ease, background 0.25s ease',
                  lineHeight: '1.5'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--border-hover)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-subtle)';
                }}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-editorial btn-primary"
              style={{
                padding: '16px',
                fontSize: '14px',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontWeight: 600,
                justifyContent: 'center',
                marginTop: '8px'
              }}
            >
              Send Direct Email (aniklinkin@gmail.com)
            </button>

          </form>
        )}

        {/* Loading state */}
        {status === 'SENDING' && (
          <div style={{ padding: '30px 0', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
              <div className="spinner" style={{ width: '24px', height: '24px', border: '2px solid var(--border-subtle)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span className="hud-monospace" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>
                Preparing Email Draft...
              </span>
            </div>
          </div>
        )}

        {/* Success / Sent State */}
        {status === 'SENT' && (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ display: 'inline-flex', position: 'relative', marginBottom: '16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-header)', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 'bold' }}>
              Email Client Launched
            </h3>
            
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '440px', margin: '0 auto 20px auto' }}>
              Your message draft for <strong style={{ color: 'var(--text-primary)' }}>aniklinkin@gmail.com</strong> has been opened in your default email client.
            </p>

            <button 
              onClick={handleReset}
              className="btn-editorial"
              style={{
                fontSize: '12px',
                padding: '10px 22px'
              }}
            >
              Send Another Inquiry
            </button>
          </div>
        )}

      </div>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .hud-contact-wrapper {
            padding-top: 80px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}