"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?keyword=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <nav className="border-b border-neutral-800 bg-neutral-950 px-6 py-4 text-neutral-200 backdrop-blur-md md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-xl font-extrabold tracking-tight text-transparent transition-opacity hover:opacity-90 md:text-2xl"
        >
          Service Board
        </Link>

        
        <form
          onSubmit={handleSearch}
          className="relative flex w-full items-center gap-2 sm:max-w-md"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search jobs..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 py-2 pl-4 pr-20 text-sm text-white placeholder-neutral-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-500 active:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-400 sm:gap-6">
          {isLoggedIn ? (
            <>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>

              <Link href="/jobs/new" className="transition-colors hover:text-white">
                Create Job
              </Link>

              <Link href="/profile" className="transition-colors hover:text-white">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="transition-colors hover:text-white">
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition-all hover:bg-neutral-200 active:scale-95"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}