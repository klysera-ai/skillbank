"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/skills", label: "Skills" },
  { href: "/taxonomy", label: "Taxonomy" },
  { href: "/roles", label: "Roles" },
  { href: "/about", label: "About" },
] as const;

export function Navbar(): React.ReactElement {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-navy-light bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/klysera.svg"
            alt="Klysera"
            width={140}
            height={32}
            className="h-7 w-auto"
            priority
          />
          <span className="text-[10px] tracking-[0.3em] text-body-muted">
            SKILL BANK
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
                isActive(href) ? "text-offwhite" : "text-body-muted hover:text-offwhite"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-offwhite transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block h-px w-5 bg-offwhite transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-offwhite transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-navy-light px-6 py-4 space-y-3">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
                isActive(href) ? "text-offwhite" : "text-body-muted hover:text-offwhite"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
