"use client";
import { useState } from "react";

export default function SearchBar({
  onSearch,
  placeholder,
}: {
  onSearch: (query: string) => void;
  placeholder: string;
}) {
  const [value, setValue] = useState("");

  return (
    <input
      type="search"
      placeholder={placeholder}
      className="w-full max-w-3xl mb-6 px-4 py-2 rounded border border-gray-300 dark:bg-black/40 dark:text-white"
      value={value}
      onChange={e => {
        setValue(e.target.value);
        onSearch(e.target.value);
      }}
      aria-label={placeholder}
    />
  );
}