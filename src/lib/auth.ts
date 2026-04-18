import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const DEMO_PROFILES = [
  { id: '1', name: 'Alex', email: 'demo@cinemalix.com', password: 'demo1234', avatar: '🎬' },
  { id: '2', name: 'Sarah', email: 'sarah@cinemalix.com', password: 'demo1234', avatar: '🍿' },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = DEMO_PROFILES.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );
        return user ?? null;
      },
    }),
  ],
  pages: { signIn: '/auth/login' },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.avatar = (user as any).avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).avatar = token.avatar;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'cinemalix-dev-secret',
};
