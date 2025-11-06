import React, { useState } from 'react';
import { Github, Mail, Send, Phone } from 'lucide-react';

export default function Contact({ lang }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const t = {
    title: lang === 'id' ? 'Kontak' : 'Contact',
    name: lang === 'id' ? 'Nama' : 'Name',
    email: 'Email',
    message: lang === 'id' ? 'Pesan' : 'Message',
    send: lang === 'id' ? 'Kirim' : 'Send',
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      // Use Formspree fallback (works without backend) — replace with internal endpoint if available
      const res = await fetch('https://formspree.io/f/mayrzyqe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (e) {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">{t.title}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={onSubmit} className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t.name}</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t.email}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t.message}</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                required
              />
            </div>
            <button
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98] transition disabled:opacity-60"
              type="submit"
            >
              <Send className="w-4 h-4" /> {status === 'loading' ? 'Mengirim…' : t.send}
            </button>
            {status === 'success' && <p className="text-green-600">Terima kasih! Pesan terkirim.</p>}
            {status === 'error' && <p className="text-red-600">Maaf, terjadi kesalahan. Coba lagi.</p>}
          </div>
        </form>
        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Terhubung</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <a href="https://github.com/lutfi238" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-blue-600">
                <Github className="w-5 h-5" /> github.com/lutfi238
              </a>
            </li>
            <li className="inline-flex items-center gap-2"><Mail className="w-5 h-5" /> email@example.com</li>
            <li className="inline-flex items-center gap-2"><Phone className="w-5 h-5" /> +62 8xx‑xxxx‑xxxx</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
