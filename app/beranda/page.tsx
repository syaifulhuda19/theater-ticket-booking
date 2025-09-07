"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import FilterAndSearch from "../../components/filterandsearch";
import TrendingSection from "../../components/trendingsection";

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    image: "/images/avengers.jpg",
    views: 12456,
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    image: "/images/spiderman.jpg",
    views: 9873,
  },
  {
    id: 3,
    title: "Oppenheimer",
    image: "/images/oppenheimer.jpg",
    views: 15632,
  },
  {
    id: 4,
    title: "Barbie",
    image: "/images/barbie.jpg",
    views: 8421,
  },
  {
    id: 5,
    title: "Guardians of the Galaxy Vol. 3",
    image: "/images/guardians.jpg",
    views: 11234,
  },
  {
    id: 6,
    title: "John Wick: Chapter 4",
    image: "/images/johnwick.jpg",
    views: 13456,
  },
  {
    id: 7,
    title: "The Batman",
    image: "/images/batman.jpg",
    views: 7654,
  },
  {
    id: 8,
    title: "Dune: Part Two",
    image: "/images/dune2.jpg",
    views: 14321,
  },
  {
    id: 9,
    title: "Black Panther: Wakanda Forever",
    image: "/images/wakanda.jpg",
    views: 12567,
  },
  {
    id: 10,
    title: "Doctor Strange in the Multiverse of Madness",
    image: "/images/doctorstrange.jpg",
    views: 13987,
  },
  {
    id: 11,
    title: "Thor: Love and Thunder",
    image: "/images/thor.jpg",
    views: 11876,
  },
  {
    id: 12,
    title: "Shang-Chi and the Legend of the Ten Rings",
    image: "/images/shangchi.jpg",
    views: 10456,
  },
  {
    id: 13,
    title: "Eternals",
    image: "/images/eternals.jpg",
    views: 8765,
  },
  {
    id: 14,
    title: "The Flash",
    image: "/images/flash.jpg",
    views: 9687,
  },
  {
    id: 15,
    title: "Aquaman and the Lost Kingdom",
    image: "/images/aquaman2.jpg",
    views: 9321,
  },
  {
    id: 16,
    title: "Wonder Woman 1984",
    image: "/images/wonderwoman.jpg",
    views: 7523,
  },
  {
    id: 17,
    title: "Suicide Squad",
    image: "/images/suicidesquad.jpg",
    views: 8543,
  },
  {
    id: 18,
    title: "Deadpool 2",
    image: "/images/deadpool2.jpg",
    views: 12765,
  },
  {
    id: 19,
    title: "Logan",
    image: "/images/logan.jpg",
    views: 11221,
  },
  {
    id: 20,
    title: "Venom: Let There Be Carnage",
    image: "/images/venom2.jpg",
    views: 9865,
  },
  {
    id: 21,
    title: "Captain Marvel",
    image: "/images/captainmarvel.jpg",
    views: 10987,
  },
  {
    id: 22,
    title: "Iron Man 3",
    image: "/images/ironman3.jpg",
    views: 13245,
  },
  {
    id: 23,
    title: "Avengers: Infinity War",
    image: "/images/infinitywar.jpg",
    views: 17865,
  },
  {
    id: 24,
    title: "Ant-Man and the Wasp: Quantumania",
    image: "/images/antman3.jpg",
    views: 8743,
  },
  {
    id: 25,
    title: "Captain America: Civil War",
    image: "/images/civilwar.jpg",
    views: 14356,
  },
  {
    id: 26,
    title: "The Incredible Hulk",
    image: "/images/hulk.jpg",
    views: 7265,
  },
  {
    id: 27,
    title: "Guardians of the Galaxy Vol. 2",
    image: "/images/guardians2.jpg",
    views: 11234,
  },
  {
    id: 28,
    title: "Black Widow",
    image: "/images/blackwidow.jpg",
    views: 9543,
  },
  {
    id: 29,
    title: "Captain America: The Winter Soldier",
    image: "/images/wintersoldier.jpg",
    views: 12876,
  },
  {
    id: 30,
    title: "Avengers: Age of Ultron",
    image: "/images/ultron.jpg",
    views: 15678,
  },
  {
    id: 31,
    title: "The Dark Knight",
    image: "/images/darkknight.jpg",
    views: 18976,
  },
  {
    id: 32,
    title: "The Dark Knight Rises",
    image: "/images/darkknightrises.jpg",
    views: 15432,
  },
  {
    id: 33,
    title: "Man of Steel",
    image: "/images/superman.jpg",
    views: 11245,
  },
  {
    id: 34,
    title: "Justice League",
    image: "/images/justiceleague.jpg",
    views: 9732,
  },
  {
    id: 35,
    title: "Zack Snyder's Justice League",
    image: "/images/snydercut.jpg",
    views: 12897,
  },
  {
    id: 36,
    title: "The Amazing Spider-Man",
    image: "/images/amazingspiderman.jpg",
    views: 8543,
  },
  {
    id: 37,
    title: "The Amazing Spider-Man 2",
    image: "/images/amazingspiderman2.jpg",
    views: 9321,
  },
  {
    id: 38,
    title: "Spider-Man: Into the Spider-Verse",
    image: "/images/spiderverse.jpg",
    views: 14654,
  },
  {
    id: 39,
    title: "Spider-Man: Across the Spider-Verse",
    image: "/images/acrossspiderverse.jpg",
    views: 15789,
  },
  {
    id: 40,
    title: "Morbius",
    image: "/images/morbius.jpg",
    views: 6743,
  },
  {
    id: 41,
    title: "Fantastic Four",
    image: "/images/fantastic4.jpg",
    views: 7564,
  },
  {
    id: 42,
    title: "X-Men: Days of Future Past",
    image: "/images/xmen.jpg",
    views: 11876,
  },
  {
    id: 43,
    title: "X-Men: Apocalypse",
    image: "/images/xmenapocalypse.jpg",
    views: 9876,
  },
  {
    id: 44,
    title: "X-Men: Dark Phoenix",
    image: "/images/darkphoenix.jpg",
    views: 8432,
  },
  {
    id: 45,
    title: "Deadpool",
    image: "/images/deadpool.jpg",
    views: 13456,
  },
  {
    id: 46,
    title: "Wolverine",
    image: "/images/wolverine.jpg",
    views: 9543,
  },
  {
    id: 47,
    title: "The Matrix Resurrections",
    image: "/images/matrix4.jpg",
    views: 10234,
  },
  {
    id: 48,
    title: "The Matrix Revolutions",
    image: "/images/matrix3.jpg",
    views: 9843,
  },
  {
    id: 49,
    title: "The Matrix Reloaded",
    image: "/images/matrix2.jpg",
    views: 11234,
  },
  {
    id: 50,
    title: "The Matrix",
    image: "/images/matrix1.jpg",
    views: 14567,
  },
];

export default function BerandaPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [mounted, setMounted] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const [search, setSearch] = useState<string>("");
  // Removed unused filterOpen and selectedFilter state

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  // Removed unused handleFilterSelect function
  return (
    <main className="w-full relative">
      {mounted && (
        <div className="overflow-hidden relative" ref={emblaRef}>
          <div className="flex">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-[0_0_100%] relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[500px] object-cover"
                />
                {/* Overlay teks */}
                <div className="z-10 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h2 className="text-white text-3xl font-bold">
                    {movie.title}
                  </h2>
                </div>

                {/* Fading di bawah */}
                <div className="absolute bottom-0 left-0 right-0 h-100 bg-gradient-to-t from-black-400 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Tombol navigasi */}
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
      {/* Search Bar */}
      <div className="relative z-10 flex justify-center">
        <FilterAndSearch search={search} setSearch={setSearch} />
      </div>

      <TrendingSection movies={movies} />
    </main>
  );
}
