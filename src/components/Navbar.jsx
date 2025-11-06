import React, { useEffect, useMemo, useState } from 'react';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';

const sections = [
  { id: 'home', label: 'Beranda' },
  { id: 'about', label: 'Tentang' },
  { id: 'skills', label: 'Skill' },
  { id: 'projects', label: 'Proyek' },
  { id: 'stats', label: 'Statistik' },
  { id: 'blog', label: 'Tulisan' },
  { id: 'contact', label: 'Kontak' },
];

export default function Navbar({ lang, setLang }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  const labels = useMemo(() => ({
    Beranda: lang === 'id' ? 'Beranda' : 'Home',
    Tentang: lang === 'id' ? 'Tentang' : 'About',
    Skill: lang === 'id' ? 'Skill' : 'Skills',
    Proyek: lang === 'id' ? 'Proyek' : 'Projects',
    Statistik: lang === 'id' ? 'Statistik' : 'Stats',
    Tulisan: lang === 'id' ? 'Tulisan' : 'Posts',
    Kontak: lang === 'id' ? 'Kontak' : 'Contact',
  }), [lang]);

  useEffect(() => {
    const root = window.document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (t) => {
      const isDark = t === 'dark' || (t === 'system' && media.matches);
      root.classList.toggle('dark', isDark);
    };
    applyTheme(theme);
    const listener = () => theme === 'system' && applyTheme('system');
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  useEffect(() => {
    const handler = () => {
      let current = 'home';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = s.id;
          break;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = sections.map((s) => (
    <a
      key={s.id}
      href={`#${s.id}`}
      onClick={() => setOpen(false)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active === s.id
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white'
      }`}
    >
      {labels[s.label]}
    </a>
  ));

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-2 rounded">Skip to content</a>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
          <span>Muhammad Lutfi Firdaus</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">{navItems}</nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle language"
            onClick={() => setLang((p) => (p === 'id' ? 'en' : 'id'))}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            aria-label="Toggle theme"
            onClick={() => {
              const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
              setTheme(next);
              localStorage.setItem('theme', next);
            }}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            title={`Theme: ${theme}`}
          >
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : theme === 'light' ? <Sun className="w-5 h-5" /> : <>
              <Sun className="w-5 h-5" />
            </>}
          </button>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 pb-4 flex flex-col gap-2">
          {navItems}
        </div>
      )}
    </header>
  );
}
