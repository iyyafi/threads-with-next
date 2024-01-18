"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const sortmenu = [
  { label: "Hot", value: "hot" },
  { label: "New", value: "new" },
  { label: "Top", value: "top" },
];

export default function NavBar() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "hot";
  const isActive = (value) => {
    return sort === value;
  };
  return (
    <div
      id="navbarWrapper"
      className="flex flex-row items-center justify-between rounded border-b border-[#ccc] px-3 py-2.5"
    >
      <nav id="navbarBox" className="flex gap-1">
        {sortmenu.map((menu) => (
          <Link
            key={menu.value}
            href={{
              pathname: "/",
              query: { sort: menu.value },
            }}
            className={`rounded-full  text-sm py-2 px-4 ${
              isActive(menu.value)
                ? "bg-[#D2DADD] text-[#0F1A1C]"
                : "text-[#576F76]"
            }`}
          >
            {menu.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
