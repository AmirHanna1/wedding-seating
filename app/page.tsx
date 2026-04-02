"use client";

import { useState } from "react";
import { guests } from "./guests";

export default function Home() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const results =
    normalizedQuery.length >= 2
      ? guests.filter((g) => {
          const full = `${g.firstName} ${g.lastName}`.toLowerCase();
          return (
            full.includes(normalizedQuery) ||
            g.firstName.toLowerCase().includes(normalizedQuery) ||
            g.lastName.toLowerCase().includes(normalizedQuery)
          );
        })
      : [];

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-16 sm:py-24">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="font-[family-name:var(--font-playfair)] text-dusty-blue text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
          Rita &amp; Amir&apos;s Wedding
        </h1>
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="block h-px w-12 bg-dusty-blue-light opacity-60" />
          <p className="font-[family-name:var(--font-cormorant)] text-dusty-blue-dark text-lg sm:text-xl tracking-wide">
            April 18th, 2026
          </p>
          <span className="block h-px w-12 bg-dusty-blue-light opacity-60" />
        </div>
        <p className="font-[family-name:var(--font-cormorant)] text-dusty-blue-dark/80 text-lg sm:text-xl mt-1 tracking-wide">
          El Gouna, Egypt
        </p>
      </header>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 mb-10">
        <span className="block h-px w-16 bg-dusty-blue-light/40" />
        <svg
          className="w-5 h-5 text-dusty-blue-light"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0" />
          <circle cx="12" cy="12" r="2" />
        </svg>
        <span className="block h-px w-16 bg-dusty-blue-light/40" />
      </div>

      {/* Search */}
      <div className="w-full max-w-md mb-10">
        <label
          htmlFor="guest-search"
          className="block text-center font-[family-name:var(--font-cormorant)] text-dusty-blue-dark text-xl mb-4 font-medium"
        >
          Find Your Seat
        </label>
        <input
          id="guest-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your name..."
          className="w-full px-5 py-3 rounded-full border border-dusty-blue-light/50 bg-white
                     text-center font-[family-name:var(--font-cormorant)] text-lg text-dusty-blue-dark
                     placeholder:text-dusty-blue-light/70
                     focus:outline-none focus:ring-2 focus:ring-dusty-blue/40 focus:border-dusty-blue
                     transition-all duration-200"
        />
      </div>

      {/* Results */}
      <div className="w-full max-w-md">
        {normalizedQuery.length >= 2 && results.length === 0 && (
          <p className="text-center font-[family-name:var(--font-cormorant)] text-dusty-blue-dark/60 text-lg">
            No guests found — please check the spelling and try again.
          </p>
        )}

        {results.length > 0 && (
          <ul className="space-y-3">
            {results.map((guest, i) => (
              <li
                key={`${guest.firstName}-${guest.lastName}-${i}`}
                className="flex items-center justify-between px-6 py-4
                           bg-dusty-blue-50 rounded-xl border border-dusty-blue-100"
              >
                <span className="font-[family-name:var(--font-cormorant)] text-dusty-blue-dark text-lg font-semibold">
                  {guest.firstName} {guest.lastName}
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-dusty-blue text-base font-medium capitalize">
                  {guest.table}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
