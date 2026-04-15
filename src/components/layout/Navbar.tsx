"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-8 lg:px-16",
        scrolled ? "bg-netflix-dark" : "bg-transparent",
      )}
    >
      {/* Top gradient for visibility */}
      {!scrolled && (
        <div className="absolute inset-0 netflix-gradient-top pointer-events-none" />
      )}

      <div className="relative flex items-center justify-between h-14 sm:h-16">
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/browse" className="flex-shrink-0">
            <span className="font-bold text-netflix-red text-xl sm:text-2xl tracking-tight select-none">
              CINEMALIX
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            {[
              { label: "Home", href: "/browse" },
              { label: "Movies", href: "/browse?type=movie" },
              { label: "TV Shows", href: "/browse?type=tv" },
              { label: "My List", href: "/mylist" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Right: Search + Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search */}
          <div className="flex items-center">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) setSearchOpen(false);
                  }}
                  placeholder="Titles, people, genres"
                  className="bg-black/80 border border-white text-white text-sm px-3 py-1.5 w-36 sm:w-52 focus:outline-none placeholder:text-gray-400"
                />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-gray-300 transition-colors p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Profile dropdown */}
          {session && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-1.5 group"
              >
                <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center text-sm font-bold">
                  {(session.user?.name?.[0] ?? "U").toUpperCase()}
                </div>
                <svg
                  className={clsx(
                    "w-4 h-4 text-white transition-transform hidden sm:block",
                    profileOpen && "rotate-180",
                  )}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-gray-700 py-2 rounded shadow-2xl">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <div className="text-sm font-semibold">
                      {session.user?.name}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {session.user?.email}
                    </div>
                  </div>
                  <Link
                    href="/mylist"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    My List
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/auth/login" });
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Sign out of Cinemalix
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 py-3 space-y-1 px-2">
          {[
            { label: "Home", href: "/browse" },
            { label: "Movies", href: "/browse?type=movie" },
            { label: "TV Shows", href: "/browse?type=tv" },
            { label: "My List", href: "/mylist" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
