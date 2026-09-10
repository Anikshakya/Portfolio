import React, { useState } from 'react';

export default function SectorContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('READY'); // READY, SENDING, SENT

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('SENDING');

    const subject = `Portfolio Inquiry from ${formData.name}`;

    const body = `Hi Anik,

I’m reaching out through your website.

${formData.message}

Best regards,
${formData.name}
${formData.email}`;

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
        justifyContent: 'space-between',
        width: '100%',
        minHeight: '100vh',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box',
        paddingTop: '50px'
      }}
    >
      {/* Centered Main Contact Panel Container */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', width: '100%', boxSizing: 'border-box' }}>
        <div
          className="hud-panel animate-fade-in"
          style={{
            padding: '16px 20px',
            width: '100%',
            maxWidth: '650px',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '10.5px', color: 'var(--color-cyan)' }} className="hud-monospace">
                GET IN TOUCH // CONTACT
              </span>
              {/* <a
                href="mailto:aniklinkin@gmail.com"
                className="hud-monospace glow-text-magenta contact-header-link"
                style={{ fontSize: '10px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', padding: '6px 12px', border: '1px solid var(--color-magenta)', borderRadius: '4px' }}
              >
                EMAIL: aniklinkin@gmail.com ↗
              </a> */}
            </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '6px', letterSpacing: '1px' }}>
            GET IN <span className="glow-text-magenta">TOUCH</span>
          </h2>
          <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', marginBottom: '14px', lineHeight: '1.4' }}>
            Have a project in mind or want to collaborate? Fill out the form below or send an email directly to <a href="mailto:aniklinkin@gmail.com" className="inline-email-link" style={{ color: 'var(--color-cyan)', textDecoration: 'none', fontWeight: 600 }}><strong style={{ color: 'var(--color-cyan)' }}>aniklinkin@gmail.com</strong></a>.
          </p>

          {/* Socials & Direct Contacts Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            {[
              { label: 'PHONE', value: '+977 9863021878', href: 'tel:+9779863021878' },
              { label: 'EMAIL', value: 'aniklinkin@gmail.com', href: 'mailto:aniklinkin@gmail.com' },
              { label: 'LINKEDIN', value: 'Anik Shakya', href: 'https://www.linkedin.com/in/anik-shakya-67141b192/' },
              { label: 'INSTAGRAM', value: '@anik_shakya_', href: 'https://www.instagram.com/anik_shakya_' },
            ].map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hud-panel contact-card-link"
                style={{
                  padding: '8px 10px',
                  textDecoration: 'none',
                  borderColor: 'rgba(0, 240, 255, 0.2)',
                  display: 'block',
                  cursor: 'pointer',
                }}
              >
                <span className="hud-monospace contact-label" style={{ display: 'block', color: 'var(--color-cyan)', fontSize: '8.5px', letterSpacing: '1px', marginBottom: '2px', transition: 'all 0.2s ease' }}>
                  {contact.label} ↗
                </span>
                <span className="contact-value" style={{ color: '#fff', fontSize: '11px', wordBreak: 'break-word', transition: 'all 0.2s ease', fontWeight: 500 }}>
                  {contact.value}
                </span>
              </a>
            ))}
          </div>

          {/* Form Section */}
          {status === 'READY' && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name..."
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(2, 2, 8, 0.6)',
                      border: '1px solid var(--hud-border-cyan)',
                      borderRadius: '4px',
                      padding: '10px 12px',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--hud-border-cyan)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                    YOUR EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(2, 2, 8, 0.6)',
                      border: '1px solid var(--hud-border-cyan)',
                      borderRadius: '4px',
                      padding: '10px 12px',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--hud-border-cyan)'}
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                  TRANSMISSION MESSAGE
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message, inquiry or project specs..."
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'rgba(2, 2, 8, 0.6)',
                    border: '1px solid var(--hud-border-cyan)',
                    borderRadius: '4px',
                    padding: '10px 12px',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '80px',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--hud-border-cyan)'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="hud-button glow-box-magenta"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderColor: 'var(--color-magenta)',
                  color: 'var(--color-magenta)',
                  background: 'rgba(255, 0, 127, 0.08)',
                  borderRadius: '4px',
                  marginTop: '4px',
                  textAlign: 'center'
                }}
              >
                TRANSMIT MESSAGE
              </button>

            </form>
          )}

          {status === 'SENDING' && (
            <div style={{ padding: '24px 0', textAlign: 'center' }}>
              <div className="hud-monospace glow-text-cyan" style={{ fontSize: '13px', letterSpacing: '1px', marginBottom: '12px' }}>
                INITIALIZING TRANSMISSION...
              </div>
              <div style={{ display: 'inline-block', width: '28px', height: '28px', border: '3px solid var(--color-cyan)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          )}

          {status === 'SENT' && (
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', position: 'relative', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0, 255, 102, 0.1)', border: '2px solid var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-header)', color: '#fff', marginBottom: '6px', fontWeight: 'bold' }}>
                EMAIL CLIENT OPENED
              </h3>

              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.4', maxWidth: '400px', margin: '0 auto 16px auto' }}>
                Your message was prepared for <strong style={{ color: 'var(--color-cyan)' }}>aniklinkin@gmail.com</strong>.
              </p>

              <button
                onClick={handleReset}
                className="hud-button"
                style={{
                  width: '100%',
                  fontSize: '11px',
                  padding: '10px 14px',
                  borderColor: 'var(--color-cyan)'
                }}
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          )}

        </div>
      </div>

      {/* FULL WIDTH WEB FOOTER */}
      <footer
        style={{
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          padding: '12px 24px',
          borderTop: '1px solid rgba(0, 240, 255, 0.3)',
          background: 'rgba(2, 2, 10, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          marginTop: 'auto'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            paddingBottom: '10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Identity & Location */}
          <div>
            <h3
              style={{
                fontSize: '1.15rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 2px 0',
                letterSpacing: '1px'
              }}
            >
              ANIK <span className="glow-text-cyan">SHAKYA</span>
            </h3>
            <span
              className="hud-monospace glow-text-cyan"
              style={{ fontSize: '9.5px', display: 'block', marginBottom: '2px' }}
            >
              FLUTTER & CROSS-PLATFORM DEVELOPER
            </span>
            <span
              className="hud-monospace"
              style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Naghbahal, Lalitpur, Nepal</span>
            </span>
          </div>

          {/* Direct Contact Methods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span className="hud-monospace" style={{ fontSize: '8.5px', color: 'var(--color-cyan)', letterSpacing: '1px', fontWeight: 'bold' }}>
              DIRECT CONTACT
            </span>
            <a
              href="mailto:aniklinkin@gmail.com"
              className="hud-monospace inline-email-link"
              style={{ fontSize: '10.5px', color: '#ffffff', textDecoration: 'none' }}
            >
              ✉️ aniklinkin@gmail.com
            </a>
            <a
              href="tel:+9779863021878"
              className="hud-monospace inline-email-link"
              style={{ fontSize: '10.5px', color: '#ffffff', textDecoration: 'none' }}
            >
              📞 +977 9863021878
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span className="hud-monospace" style={{ fontSize: '8.5px', color: 'var(--color-magenta)', letterSpacing: '1px', fontWeight: 'bold' }}>
              SOCIAL NETWORKS
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { name: 'GitHub', href: 'https://github.com/AnikShakya', color: 'var(--color-cyan)' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anik-shakya-67141b192/', color: 'var(--color-magenta)' },
                { name: 'Instagram', href: 'https://www.instagram.com/anik_shakya_', color: 'var(--color-amber)' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-monospace footer-social-btn"
                  style={{
                    padding: '3px 8px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: link.color,
                    border: `1px solid ${link.color}`,
                    borderRadius: '4px',
                    textDecoration: 'none',
                    background: 'rgba(2, 2, 12, 0.6)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {link.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Telemetry Bar */}
        <div
          style={{
            maxWidth: '1240px',
            margin: '8px auto 0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '8.5px',
            color: 'var(--color-text-muted)'
          }}
          className="hud-monospace"
        >
          <span>© 2026 ANIK SHAKYA // ALL SYSTEMS OPERATIONAL</span>
          <span style={{ color: 'var(--color-green)' }}>● SYSTEM STATUS: ONLINE</span>
        </div>
      </footer>

      {/* Dynamic animations, link hover effects & mobile styles */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .contact-card-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .contact-card-link:hover {
          border-color: var(--color-cyan) !important;
          background: rgba(0, 240, 255, 0.12) !important;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.18) !important;
        }

        .contact-card-link:hover .contact-label {
          color: #ffffff !important;
          letter-spacing: 1.5px !important;
        }

        .contact-card-link:hover .contact-value {
          color: var(--color-cyan) !important;
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.8) !important;
        }

        .contact-header-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-shadow: 0 0 10px rgba(255, 0, 127, 0.18);
        }

        .footer-social-btn:hover {
          background: rgba(0, 240, 255, 0.15) !important;
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.4) !important;
          transform: translateY(-2px);
          color: #ffffff !important;
        }

        .contact-header-link:hover {
          background: rgba(255, 0, 127, 0.15) !important;
          box-shadow: 0 0 15px rgba(255, 0, 127, 0.5) !important;
          transform: translateY(-2px) scale(1.03);
          color: #ffffff !important;
        }

        .inline-email-link {
          transition: all 0.2s ease !important;
        }

        .inline-email-link:hover {
          color: #ffffff !important;
          text-shadow: 0 0 10px var(--color-cyan) !important;
          text-decoration: underline !important;
        }

        @media (max-width: 768px) {
          .hud-contact-wrapper {
            padding-top: 55px !important;
            padding-left: 10px !important;
            padding-right: 10px !important;
            padding-bottom: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}