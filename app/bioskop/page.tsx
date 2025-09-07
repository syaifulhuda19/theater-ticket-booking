"use client";

import { useEffect, useState } from "react";
import { fetchMovies } from "@/lib/fetchmovies";
import { Movie } from "@/types/movies";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newMovies = await fetchMovies(page);
      setMovies((prev) => [...prev, ...newMovies]);
      setPage((prev) => prev + 1);

      if (newMovies.length === 0) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Daftar Film</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.movie_id} className="border p-2">
            <img src={movie.poster_path} alt={movie.original_title} />
            <h2>{movie.original_title}</h2>
            <p>Rating: {movie.vote_average}</p>
            <p>{movie.adult ? "18+" : "Semua umur"}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMovies}
          disabled={loading}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
