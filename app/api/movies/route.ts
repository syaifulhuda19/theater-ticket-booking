// app/api/movies/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  try {
    const apiUrl = process.env.NEXT_PUBLIC_MOVIE_API;
    if (!apiUrl) throw new Error("Missing NEXT_PUBLIC_MOVIE_API in .env.local");

    const res = await fetch(`${apiUrl}?page=${page}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
