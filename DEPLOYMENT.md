# Cinemalix - Deployment Guide

## Quick Start for Development

```bash
npm install
npm run dev
```

## Production Deployment

### Prerequisites

1. **TMDB API Key** - Get from https://www.themoviedb.org/settings/api
2. **Environment Variables** - Set up `.env.local` or platform-specific env vars

### Environment Variables Required

```env
# Authentication
NEXTAUTH_URL=https://your-domain.com          # Your production domain
NEXTAUTH_SECRET=<generate-secure-secret>      # Generate: openssl rand -base64 32

# API Keys
TMDB_API_KEY=<your-tmdb-api-key>              # Required for movie data
NEXT_PUBLIC_TMDB_API_KEY=<your-tmdb-api-key>  # Same as above (for client)
```

### Generate Secure NextAuth Secret

```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

### Deployment Steps

#### Option 1: Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

#### Option 2: Self-Hosted

1. Build: `npm run build`
2. Start: `npm start`
3. Set NODE_ENV=production
4. Configure reverse proxy (Nginx/Apache)
5. Use process manager (PM2/systemd)

### Features

- ✅ Browse movies and TV shows
- ✅ Search functionality
- ✅ Movie details with cast/crew
- ✅ Personal watchlist (MyList)
- ✅ Demo authentication (Alex/demo1234 or Sarah/demo1234)
- ✅ Responsive design with Tailwind CSS

### Notes

- **Data**: Uses TMDB API + localStorage for MyList
- **Auth**: Demo credentials via NextAuth
- **Images**: Optimized from TMDB CDN
- **Styling**: Tailwind CSS with dark theme
