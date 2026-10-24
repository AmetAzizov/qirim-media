"use client";

import React, { useState, useRef, useEffect } from "react";

interface CategorySelectProps {
  setCategory: (category: string) => void;
  value?: string;
}

const CategorySelect = ({ setCategory, value }: CategorySelectProps) => {
  const categoryList = [
    "Всі",
    "Права людини",
    "Війна",
    "Політика",
    "Культура",
    "Спорт",
    "Освіта",
    "Історія",
    "Економіка",
    "Екологія",
    "Суспільство",
    "Міжнародні новини",
  ] as const;

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value ?? "Всі");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setCategory(value);
    setIsOpen(false);
  };

  // Закриття при кліку поза компонентом
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
                                       }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xs" ref={wrapperRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between rounded-lg border border-gray-300 
          bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm
          hover:border-gray-400 focus:border-[#F0CA56] focus:ring-2 focus:ring-[#F0CA56]/30
          transition-all
        `}
      >
        <span>{selected}</span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`
            absolute z-10 mt-1 w-full rounded-lg border border-gray-200 
            bg-white shadow-lg ring-1 ring-black/5
            max-h-60 overflow-auto
                                      `}
        >
          {categoryList.map((item) => (
            <button
              key={item                }
              onClick={() => handleSelect(item)}
              className={`
                w-full px-4 py-2.5 text-left text-sm
                hover:bg-gray-50 focus:bg-gray-50
                ${item === selected ? "bg-[#F0CA56]/10 font-medium text-[#D4A017]" : "text-gray-900"}
              `}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
