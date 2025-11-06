import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero({ lang }) {
  const t = {
    title: 'Muhammad Lutfi Firdaus',
    tagline: lang === 'id' ? 'AI Software Engineer & GenAI Enthusiast' : 'AI Software Engineer & GenAI Enthusiast',
    sub: lang === 'id' ? '“My coding partner is an AI.”' : '“My coding partner is an AI.”',
    viewProjects: lang === 'id' ? 'Lihat Proyek' : 'View Projects',
    downloadCV: lang === 'id' ? 'Unduh CV' : 'Download CV',
    contact: lang === 'id' ? 'Kontak' : 'Contact',
  };

  const avatar = 'https://github.com/lutfi238.png';

  return (
    <section id="home" className="relative">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 pt-10 md:pt-16 items-center">
        <div>
          <div className="flex items-center gap-4">
            <img src={avatar} alt="GitHub avatar" className="w-16 h-16 rounded-full ring-4 ring-blue-600/20" loading="lazy" />
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">{t.title}</h1>
              <p className="text-blue-600 font-medium mt-1">{t.tagline}</p>
            </div>
          </div>
          <p className="mt-6 text-gray-700 dark:text-gray-300 max-w-xl">
            {lang === 'id'
              ? 'Membangun produk dengan menggabungkan rekayasa perangkat lunak yang solid dan kekuatan model generatif. Fokus pada kecepatan, kualitas, dan kolaborasi open‑source.'
              : 'Building products by combining solid software engineering with the power of generative models. Focused on speed, quality, and open‑source collaboration.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98] transition">{t.viewProjects}</a>
            <a href="/cv.pdf" target="_blank" rel="noopener" className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition">{t.downloadCV}</a>
            <a href="#contact" className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">{t.contact}</a>
          </div>
        </div>
        <div className="relative h-[380px] md:h-[520px] rounded-xl overflow-hidden">
          <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-950/80" />
        </div>
      </div>
    </section>
  );
}
