"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Service Board
      </h1>

      <div className="flex gap-6 items-center">

        {isLoggedIn ? (
          <>
            <Link href="/">Home</Link>
            <Link href="/jobs/new">Create Job</Link>
            <Link href="/profile">Profile</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

      </div>
    </nav>
  );
}