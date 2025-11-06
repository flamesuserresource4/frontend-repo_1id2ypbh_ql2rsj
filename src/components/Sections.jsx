import React, { useEffect, useMemo, useState } from 'react';
import { Github, Star, ExternalLink, ArrowRight } from 'lucide-react';

const GH_USER = 'lutfi238';

function SectionTitle({ children, id }) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
      {children}
    </h2>
  );
}

export function About({ lang }) {
  const text = useMemo(() => ({
    title: lang === 'id' ? 'Tentang' : 'About',
    body:
      lang === 'id'
        ? 'Saya fokus pada software engineering dan generative AI. Senang berkontribusi pada open‑source dan kolaborasi lintas tim untuk membangun solusi nyata.'
        : 'I focus on software engineering and generative AI. I love contributing to open‑source and collaborating to build real solutions.',
  }), [lang]);

  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-16">
      <SectionTitle>Tentang</SectionTitle>
      <p className="text-gray-700 dark:text-gray-300 max-w-3xl">{text.body}</p>
    </section>
  );
}

export function Skills({ lang }) {
  const items = [
    { label: 'Python', icon: '🐍' },
    { label: 'JavaScript', icon: '🟨' },
    { label: 'React', icon: '⚛️' },
    { label: 'Node.js', icon: '🟩' },
    { label: 'HTML5', icon: '🧱' },
    { label: 'CSS3', icon: '🎨' },
  ];
  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 py-16">
      <SectionTitle>Skill</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="text-2xl" aria-hidden>{it.icon}</div>
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{it.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">Belajar & eksplorasi: AI/LLM tooling, prompt engineering.</p>
    </section>
  );
}

function RepoCard({ repo }) {
  return (
    <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 p-4 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 line-clamp-1">
          {repo.name}
        </a>
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/40 dark:border-blue-800/40">
          <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3 min-h-[3.75rem]">{repo.description || '—'}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
          {repo.language || 'Markdown'}
        </span>
        <div className="flex items-center gap-2">
          {repo.homepage && (
            <a className="inline-flex items-center gap-1 hover:text-blue-600" href={repo.homepage} target="_blank" rel="noreferrer">
              Live Demo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <a className="inline-flex items-center gap-1 hover:text-blue-600" href={repo.html_url} target="_blank" rel="noreferrer">
            Source <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError('');
        const headers = { 'Accept': 'application/vnd.github+json' };
        const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`, { signal: controller.signal, headers });
        if (!res.ok) throw new Error('GitHub API error');
        const data = await res.json();
        const sortScore = (r) => (r.stargazers_count || 0) * 2 + (r.forks_count || 0) + (r.watchers_count || 0);
        const top = [...data]
          .sort((a, b) => sortScore(b) - sortScore(a))
          .slice(0, 6);
        setRepos(top);
        localStorage.setItem('gh_cache', JSON.stringify({ at: Date.now(), data: top }));
      } catch (e) {
        const cache = localStorage.getItem('gh_cache');
        if (cache) {
          try {
            const parsed = JSON.parse(cache);
            setRepos(parsed.data || []);
          } catch {}
        } else {
          setError('Gagal memuat repositori.');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-16">
      <SectionTitle>Proyek</SectionTitle>
      {loading && <p className="text-gray-600 dark:text-gray-400">Memuat repositori…</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {repos.map((r) => <RepoCard key={r.id} repo={r} />)}
      </div>
      <div className="mt-6">
        <a href={`https://github.com/${GH_USER}?tab=repositories`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
          Lihat semua repositori <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section id="stats" className="max-w-6xl mx-auto px-4 py-16">
      <SectionTitle>Statistik</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-6">
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${GH_USER}&show_icons=true&theme=transparent&title_color=3b82f6&icon_color=3b82f6`}
          alt="GitHub Stats"
          loading="lazy"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800"
        />
        <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GH_USER}&layout=compact&theme=transparent&title_color=3b82f6`}
          alt="Top Languages"
          loading="lazy"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800"
        />
      </div>
    </section>
  );
}

export function Blog() {
  const posts = [
    {
      title: 'Membangun workflow AI untuk coding harian',
      slug: 'workflow-ai-untuk-coding-harian',
      excerpt: 'Bagaimana menggabungkan model LLM, otomatisasi, dan alat bantu untuk mempercepat proses pengembangan.',
      date: '2025-01-01',
    },
    {
      title: 'Catatan eksperimen LLM',
      slug: 'catatan-eksperimen-llm',
      excerpt: 'Ringkasan pembelajaran dari eksperimen prompt engineering dan evaluasi model.',
      date: '2025-01-08',
    },
  ];
  return (
    <section id="blog" className="max-w-6xl mx-auto px-4 py-16">
      <SectionTitle>Tulisan</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.title}</h3>
            <p className="text-sm text-gray-500">{new Date(p.date).toLocaleDateString('id-ID')}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
