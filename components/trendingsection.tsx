// components/TrendingSection.tsx
"use client";

import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  image: string;
  views: number;
}

interface TrendingSectionProps {
  movies: Movie[];
}

const TrendingSection: FC<TrendingSectionProps> = ({ movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ambil top 10 berdasarkan views tertinggi
  const topMovies = [...movies].sort((a, b) => b.views - a.views).slice(0, 10);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // geser 80% lebar container
      const newScroll =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll(); // cek awal
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <section className="px-6 py-10 relative ofervlow-hidden">
      <h2 className="text-2xl font-bold mb-6">🔥 Trending Sekarang</h2>

      {/* Tombol kiri */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="grid grid-flow-col auto-cols-[120px] sm:auto-cols-[200px] md:auto-cols-[240px] gap-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pb-4 scroll-smooth overflow-hidden"
      >
        {topMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <div className="relative w-full h-25 sm:h-42 md:h-48 lg:h-60">
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="object-cover text-sm"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-ellipsis text-xs sm:text-sm md:text-base lg:text-lg">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-400">
                {movie.views.toLocaleString("id-ID")} views
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol kanan */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </section>
  );
};

export default TrendingSection;
