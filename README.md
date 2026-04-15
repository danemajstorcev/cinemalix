# Cinemalix 🎬

A Netflix-inspired movie streaming application built with Next.js 15, React 19, and Tailwind CSS.

## Features ✨

- 🎬 Browse trending movies and TV shows
- 🔍 Search movies by title
- ⭐ View movie details with ratings, cast, and crew
- 📋 Personal watchlist (My List) with persistent storage
- 🎨 Netflix-inspired dark theme UI
- 📱 Fully responsive design
- 🔐 Secure authentication with NextAuth

## Demo Credentials

Use these credentials to log in:

- **Email**: `demo@cinemalix.com` or `sarah@cinemalix.com`
- **Password**: `demo1234`

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth 4
- **Data**: TMDB API
- **Storage**: Browser localStorage for MyList

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cinemalix

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your TMDB API key

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Setup

Get your TMDB API Key from: https://www.themoviedb.org/settings/api

**Required environment variables:**

```
TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
src/
├── app/              # Next.js app routes
│   ├── api/         # API routes (NextAuth)
│   ├── auth/        # Auth pages
│   ├── browse/      # Browse movies page
│   ├── movie/       # Movie detail page
│   ├── mylist/      # Watchlist page
│   └── search/      # Search page
├── components/      # Reusable React components
├── lib/            # Utilities (auth, API)
├── data/           # Mock data
└── types/          # TypeScript types
```

## License

MIT
