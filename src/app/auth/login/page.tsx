'use client';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') router.replace('/browse');
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setError('Incorrect email or password.');
    else router.replace('/browse');
  };

  const fillDemo = () => {
    setEmail('demo@cinemalix.com');
    setPassword('demo1234');
  };

  if (status === 'loading') return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            'url(https://assets.nflxext.com/ffe/siteui/vlv3/9db4acf2-7066-4a1e-87ff-5ae82abdd2eb/63f0db4f-5b68-4908-9c76-da8e79569600/AU-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      <div className="absolute top-0 left-0 right-0 px-6 sm:px-12 py-5">
        <span className="font-bold text-netflix-red text-2xl sm:text-3xl tracking-tight">
          CINEMALIX
        </span>
      </div>
      <div className="relative bg-black/75 rounded-md px-6 sm:px-12 py-10 w-full max-w-md mx-4">
        <h1 className="text-white font-bold text-2xl sm:text-3xl mb-6">Sign In</h1>
        <button
          type="button"
          onClick={fillDemo}
          className="w-full text-left bg-gray-800/80 border border-gray-600 rounded p-3 mb-5 hover:bg-gray-700/80 transition-colors group"
        >
          <div className="text-xs text-gray-400 mb-1">Demo account — click to fill</div>
          <div className="text-sm text-gray-300 font-mono">demo@cinemalix.com / demo1234</div>
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full bg-gray-700 text-white rounded px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-gray-400"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-gray-700 text-white rounded px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-gray-400"
            />
          </div>

          {error && (
            <div className="bg-netflix-red/20 border border-netflix-red/50 rounded p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-netflix-red hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded text-base transition-colors mt-2"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          New to Cinemalix?{' '}
          <button
            onClick={fillDemo}
            className="text-white font-semibold hover:underline cursor-pointer"
          >
            Use demo account
          </button>
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 py-5 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Cinemalix. Portfolio project — not a real streaming service.
      </div>
    </div>
  );
}
