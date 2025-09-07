"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch?: () => void; // opsional callback untuk tombol search
}

export default function SearchBar({
  search,
  setSearch,
  onSearch,
}: SearchBarProps) {
  return (
    <div className="flex-1 min-w-[180px] relative mr-6 ml-6">
      <input
        type="text"
        placeholder="Cari film, bioskop, atau jadwal..."
        className="w-full bg-white/80 backdrop-blur-md outline-none text-gray-700 placeholder-gray-400 px-4 py-2 rounded-full shadow-md pr-12"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
      />
      <button
        onClick={onSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
