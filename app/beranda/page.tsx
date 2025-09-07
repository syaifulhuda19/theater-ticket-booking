"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import SearchBar from "../../components/searchBar"; // import SearchBar
import TrendingSection from "../../components/trendingsection";
import { Movie } from "../../types/movies"; // pastikan interface Movie ada di sini

export default function BerandaPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [mounted, setMounted] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  // Fetch movies dari API
  const fetchMovies = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/movies?page=${pageNumber}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch movies");
      const json = await res.json();
      // json.data diasumsikan array Movie
      setMovies((prev) => [...prev, ...json.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <main className="w-full relative">
      {mounted && movies.length > 0 && (
        <div className="relative w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-[0_0_100%] relative h-[500px] sm:h-[600px] md:h-[700px]"
              >
                <img
                  src={movie.backdrop_path}
                  alt={movie.original_title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-120 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none">
                  <h2 className="mt-75 ml-4 text-white text-3xl font-bold">
                    {movie.original_title}
                  </h2>
                  <p className="w-180 mt-2 ml-4 text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
                    {movie.overview.length > 150
                      ? movie.overview.slice(0, 150) + "..."
                      : movie.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol scroll */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
          >
            ▶
          </button>
        </div>
      )}

      <div className="relative z-10 flex justify-center mt-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={() => {
            // Fungsi ini dijalankan ketika user klik tombol search atau tekan Enter
            console.log("Mencari:", search);
            // Bisa diarahkan ke halaman hasil search atau filter data di sini
          }}
        />
      </div>

      <TrendingSection movies={movies} />
    </main>
  );
}
