'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchInput({ initialValue }: { initialValue: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search titles, people, genres…"
        autoFocus
        className="w-full bg-gray-800 border border-gray-600 text-white rounded px-4 py-3 text-base focus:outline-none focus:border-white placeholder:text-gray-500"
      />
    </form>
  );
}
