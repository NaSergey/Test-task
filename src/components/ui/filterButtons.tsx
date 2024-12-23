import React from "react";

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function FilterButton({ isActive, onClick, children }: FilterButtonProps) {
  return (
    <button
      className={`bg-white ${isActive ? "font-bold text-blue-500" : "text-gray-600"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
