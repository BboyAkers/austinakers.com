import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { accent } from '../theme';

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  const linkStyle = (path: string): React.CSSProperties => ({
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: isActive(path) ? '#fff' : '#a7b0bc',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '4px 0',
    paddingBottom: 2,
    textDecoration: 'none',
    transition: 'color 120ms ease',
    borderBottom: isActive(path) ? `1px solid ${accent}` : '1px solid transparent',
  });

  const hoverOn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#fff';
  };
  const hoverOff = (path: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive(path)) e.currentTarget.style.color = '#a7b0bc';
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      background: scrolled ? 'rgba(7,9,12,0.85)' : 'rgba(7,9,12,0.6)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
      transition: 'background 200ms ease, border-color 200ms ease',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        width: '100%',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 40,
      }}>
        <button
          onClick={() => navigate({ to: '/' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: 0 }}
        >
          <span style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: '-0.01em' }}>
            Austin Akers
          </span>
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: accent, letterSpacing: '0.06em', opacity: 0.85 }}>
            @harper
          </span>
        </button>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <button style={linkStyle('/')} onClick={() => navigate({ to: '/' })} onMouseEnter={hoverOn} onMouseLeave={hoverOff('/')}>
            Home
          </button>
          <button style={linkStyle('/blog')} onClick={() => navigate({ to: '/blog' })} onMouseEnter={hoverOn} onMouseLeave={hoverOff('/blog')}>
            Writing
          </button>
          <button style={linkStyle('/cms')} onClick={() => navigate({ to: '/cms' })} onMouseEnter={hoverOn} onMouseLeave={hoverOff('/cms')}>
            CMS
          </button>

          <a
            href="https://github.com/BboyAkers"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
          >
            <img src="/github-green.png" style={{ height: 16, opacity: 0.8 }} alt="GitHub" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 32px 36px', background: '#07090c' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff' }}>Austin Akers</div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#6b7380', marginTop: 4 }}>
            <span style={{ color: '#3f4752' }}>// </span>Software Engineer @ Harper
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {[
            { label: 'GitHub', href: 'https://github.com/BboyAkers' },
            { label: 'Twitter', href: 'https://twitter.com/austinakers' },
            { label: 'Harper', href: 'https://harper.fast' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 13, color: '#6b7380', textDecoration: 'none', transition: 'color 120ms' }}
               onMouseEnter={e => (e.currentTarget.style.color = '#a7b0bc')}
               onMouseLeave={e => (e.currentTarget.style.color = '#6b7380')}>
              {label}
            </a>
          ))}
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#3f4752' }}>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
