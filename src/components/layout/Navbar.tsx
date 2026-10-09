"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/cars?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/cars");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/30 shadow-xs">
      <div className="h-20 max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-6">
        {/* Brand & Search */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-2xl text-primary tracking-tight">MORENT</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden xl:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20 shadow-xs">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search high-performance luxury fleet..."
              className="bg-transparent border-0 outline-none text-on-surface placeholder:text-outline text-xs w-64"
            />
            <kbd className="text-[10px] text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded font-mono">
              ↵
            </kbd>
          </form>
        </div>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low p-1.5 rounded-full border border-outline-variant/20">
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-surface-container-high transition-all"
          >
            Filoyu Keşfet
          </Link>
          <Link
            href="/cars"
            className="px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-surface-container-high transition-all"
          >
            Araç Kataloğu
          </Link>
          <Link
            href="/cars?category=Sport,Electric"
            className="px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-surface-container-high transition-all"
          >
            VIP Rezervasyon
          </Link>
        </nav>

        {/* Right Section / Auth */}
        <div className="flex items-center gap-3">
          <Link
            href="/cars"
            aria-label="Favorites"
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-xs border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-3 pl-2">
              <Link
                href="/orders"
                aria-label="Siparişlerim"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-xs border border-outline-variant/20"
              >
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              </Link>
              <div className="relative rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary-container">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Profil"}
                    className="w-8 h-8 rounded-full object-cover block"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs uppercase">
                    {session.user.name ? session.user.name.charAt(0) : "U"}
                  </div>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-on-surface leading-tight">
                  {session.user.name}
                </p>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-[11px] text-primary hover:underline cursor-pointer"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-container text-on-primary transition-all shadow-sm"
              >
                Join VIP
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
