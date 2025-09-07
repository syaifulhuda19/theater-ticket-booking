// lib/fetchMovies.ts
export const fetchMovies = async (page = 1) => {
  try {
    const res = await fetch(`/api/movies?page=${page}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch movies");

    const json = await res.json();
    return json.data; // Ambil array movie dari respons
  } catch (err) {
    console.error(err);
    throw err;
  }
};
