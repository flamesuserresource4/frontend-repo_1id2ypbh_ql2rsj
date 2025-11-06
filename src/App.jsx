import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Skills, Projects, Stats, Blog } from './components/Sections';
import Contact from './components/Contact';

export default function App() {
  const [lang, setLang] = useState('id');

  useEffect(() => {
    document.title = 'Muhammad Lutfi Firdaus — AI Software Engineer & GenAI Enthusiast';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Portfolio modern Muhammad Lutfi Firdaus: AI Software Engineer & GenAI Enthusiast. Proyek, statistik GitHub, tulisan, dan kontak.');

    const pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://api.github.com';
    document.head.appendChild(pre);

    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'Muhammad Lutfi Firdaus — Portfolio');
    document.head.appendChild(ogTitle);

    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', 'https://github.com/lutfi238.png');
    document.head.appendChild(ogImage);

    const twitter = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitter.setAttribute('name', 'twitter:card');
    twitter.setAttribute('content', 'summary');
    document.head.appendChild(twitter);
  }, []);

  const year = new Date().getFullYear();

  return (
    <div id="main" className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Skills lang={lang} />
      <Projects />
      <Stats />
      <Blog />
      <Contact lang={lang} />
      <footer className="mt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 dark:text-gray-400">
          <p>© {year} Muhammad Lutfi Firdaus — Built with Flames & ❤️</p>
          <a className="hover:text-blue-600" href="/sitemap.xml">Sitemap</a>
        </div>
      </footer>
    </div>
  );
}
