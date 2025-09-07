"use client";

import "./globals.css";
import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Metadata is not exported here because this is a client component.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-900">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 w-full h-18 px-4 sm:px-6 py-3 flex justify-between items-center z-50 transition-colors duration-300 shadow-md ${
            scrolled ? "bg-gray-800 shadow-md" : "bg-transparent"
          }`}
        >
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-600">
            🎬 TiketBioskop
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden sm:block">
            <ul className="flex gap-6 text-lg font-medium">
              <li>
                <a
                  href="/beranda"
                  className="text-gray-200 font-medium hover:text-indigo-600"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="/bioskop"
                  className="text-gray-200 font-medium hover:text-indigo-600"
                >
                  Bioskop
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  className="text-gray-200 font-medium hover:text-indigo-600"
                >
                  Booking
                </a>
              </li>
              <li>
                <a
                  href="/profil"
                  className="text-gray-200 font-medium hover:text-indigo-600"
                >
                  Profil
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden p-2 text-white hover:text-indigo-600"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </header>

        {/* Sidebar Mobile */}
        <div
          className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Background Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar Panel */}
          <div
            className={`w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-600">
                🎬 TiketBioskop
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={28} className="text-gray-900" />
              </button>
            </div>
            <nav>
              <ul className="flex flex-col gap-4 text-lg font-medium">
                <li>
                  <a
                    href="/beranda"
                    className="text-gray-900 hover:text-indigo-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="/bioskop"
                    className="text-gray-900 hover:text-indigo-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Bioskop
                  </a>
                </li>
                <li>
                  <a
                    href="/profil"
                    className="text-gray-900 hover:text-indigo-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Profil
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Halaman dinamis */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-4 mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TiketBioskop. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
