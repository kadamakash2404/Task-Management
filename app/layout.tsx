import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex bg-[#0f172a] text-white">
        {/* SIDEBAR */}
        <nav className="w-[240px] min-h-screen bg-[#1e293b] flex flex-col p-6 gap-6">
          <h1 className="text-2xl font-bold">My App</h1>

          <Link href="/" className="text-lg hover:text-cyan-400 transition">
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-lg hover:text-cyan-400 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/about"
            className="text-lg hover:text-cyan-400 transition"
          >
            About
          </Link>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
