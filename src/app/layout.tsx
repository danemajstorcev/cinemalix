import type { Metadata } from 'next';
import { SessionProvider } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title:       { default: 'Cinemalix', template: '%s | Cinemalix' },
  description: 'Watch movies and TV shows online. Cinemalix — your personal cinema.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-netflix-dark text-white antialiased min-h-screen">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
