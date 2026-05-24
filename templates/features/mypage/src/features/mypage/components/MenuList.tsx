import { useNavigate } from "react-router-dom";
import type { MenuItem } from "../types";

interface MenuListProps {
  title?: string;
  items: MenuItem[];
}

export function MenuList({ title, items }: MenuListProps) {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col">
      {title && (
        <p className="px-6 py-2 text-xs font-medium text-gray-400">{title}</p>
      )}
      {items.map((item) => (
        <button
          key={item.path}
          type="button"
          onClick={() => navigate(item.path)}
          className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 active:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            {item.icon && <span className="text-gray-500">{item.icon}</span>}
            <span className="text-sm text-gray-800">{item.label}</span>
          </div>
          <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ))}
    </section>
  );
}
