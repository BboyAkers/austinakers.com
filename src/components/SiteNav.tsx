import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';

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

  const linkClass = (path: string) =>
    `font-sans text-[13px] sm:text-[14px] font-normal cursor-pointer bg-transparent border-0 border-b pb-[2px] no-underline transition-colors duration-[120ms] ${isActive(path)
      ? 'text-white border-accent'
      : 'text-fg-2 border-transparent hover:text-white'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] h-16 flex items-center backdrop-blur-[12px] border-b transition-[background,border-color] duration-200 ${scrolled ? 'bg-bg-0/85 border-white/[0.06]' : 'bg-bg-0/60 border-transparent'
        }`}
    >
      <div className="max-w-[1100px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-10">
        <button
          onClick={() => navigate({ to: '/' })}
          className="bg-transparent border-none cursor-pointer flex items-center gap-[8px] sm:gap-[10px] p-0"
        >
          <span className="font-sans font-bold text-[15px] sm:text-[16px] text-white tracking-[-0.01em] whitespace-nowrap">
            Austin Akers
          </span>
          <span className="hidden sm:inline font-mono text-[11px] text-accent tracking-[0.06em] opacity-85">
            @harper
          </span>
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3 sm:gap-8">
          <button className={linkClass('/')} onClick={() => navigate({ to: '/' })}>
            Home
          </button>
          <button className={linkClass('/blog')} onClick={() => navigate({ to: '/blog' })}>
            Writing
          </button>
          <button className={linkClass('/cms')} onClick={() => navigate({ to: '/cms' })}>
            CMS
          </button>

          <a
            href="https://github.com/BboyAkers"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-[6px] no-underline"
          >
            <img src="/github-green.png" className="h-4 opacity-80" alt="GitHub" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] pt-12 pb-9 px-8 bg-bg-0">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between flex-wrap gap-5">
        <div>
          <div className="font-sans font-bold text-[15px] text-white">Austin Akers</div>
          <div className="font-mono text-[12px] text-fg-3 mt-1">
            <span className="text-fg-4">// </span>Software Engineer @ Harper
          </div>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/BboyAkers' },
            { label: 'Twitter', href: 'https://twitter.com/austinakers' },
            { label: 'Harper', href: 'https://harper.fast' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[13px] text-fg-3 no-underline transition-colors duration-[120ms] hover:text-fg-2"
            >
              {label}
            </a>
          ))}
          <span className="font-mono text-[12px] text-fg-4">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
