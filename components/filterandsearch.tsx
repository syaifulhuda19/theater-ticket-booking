"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

interface FilterSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function FilterAndSearch({
  search,
  setSearch,
}: FilterSearchProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Semua");

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  return (
    <div className="w-full max-w-2xl ml-2 mr-2 bg-white/80 backdrop-blur-md shadow-md rounded-full px-2 py-2 flex flex-wrap items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
      {/* Ikon search & input */}
      <div className="flex items-center gap-2 flex-1 min-w-[180px]">
        <input
          type="text"
          placeholder="Cari film, bioskop, atau jadwal..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          value={search ?? ""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter & Search */}
      <div className="relative flex items-center gap-2">
        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="bg-white shadow rounded-full px-3 py-2 flex items-center hover:bg-gray-100 transition w-28 sm:w-48"
          >
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <span className="ml-2 text-sm text-gray-700 truncate overflow-hidden whitespace-nowrap">
              {selectedFilter}
            </span>
          </button>
          {filterOpen && (
            <div className="absolute left-0 mt-2 w-36 sm:w-48 bg-white rounded-lg shadow-lg z-30">
              {[
                "Semua",
                "Tayang hari ini",
                "Akan datang",
                "Segera berakhir",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => handleFilterSelect(item)}
                  className={`w-full text-gray-700 text-left px-4 py-2 hover:bg-gray-100 hover:text-indigo-500 transition ${
                    selectedFilter === item
                      ? "bg-gray-100 font-semibold text-indigo-600"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tombol cari */}
        <button className="px-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-medium whitespace-nowrap text-sm sm:px-4">
          <Search className="w-5 h-5 text-white-500" />
        </button>
      </div>
    </div>
  );
}
