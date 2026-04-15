import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-netflix-dark flex flex-col items-center justify-center text-center px-4">
      <div className="text-netflix-red font-bold text-2xl mb-8 tracking-tight">CINEMALIX</div>
      <h1 className="text-white font-bold text-6xl sm:text-8xl mb-4">404</h1>
      <p className="text-gray-400 text-lg mb-2">Lost your way?</p>
      <p className="text-gray-500 text-sm mb-8 max-w-sm">
        Sorry, we can't find that page. You'll find lots to explore on the home screen.
      </p>
      <Link
        href="/browse"
        className="bg-white text-black font-bold px-8 py-3 rounded text-sm hover:bg-gray-200 transition-colors"
      >
        Cinemalix Home
      </Link>
    </div>
  );
}
