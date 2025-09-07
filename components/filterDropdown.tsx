"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

interface FilterDropdownProps {
  filter: string;
  setFilter: (value: string) => void;
  options?: string[];
}

export default function FilterDropdown({
  filter,
  setFilter,
  options,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const items = options || [
    "Semua",
    "Tayang hari ini",
    "Akan datang",
    "Segera berakhir",
  ];

  const handleSelect = (value: string) => {
    setFilter(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-white shadow rounded-full px-3 py-2 flex items-center hover:bg-gray-100 transition w-28 sm:w-48"
      >
        <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
        <span className="ml-2 text-sm text-gray-700 truncate">{filter}</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-36 sm:w-48 bg-white rounded-lg shadow-lg z-30">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className={`w-full text-gray-700 text-left px-4 py-2 hover:bg-gray-100 hover:text-indigo-500 transition ${
                filter === item
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
  );
}
