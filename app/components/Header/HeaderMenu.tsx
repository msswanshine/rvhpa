import { Link } from "@remix-run/react";
import { useEffect } from "react";

export default function HeaderMenu({ isOpen }: { isOpen: boolean }) {
  useEffect(() => {
    if (isOpen) {
      const firstLink = document.querySelector("nav a") as HTMLElement;
      firstLink?.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-20 overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "pointer-events-auto opacity-95" : "pointer-events-none opacity-0"}`}
      style={{
        background:
          "linear-gradient(to bottom right, #4A90E2 0%, #D4AF37 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <nav
        aria-label="Main menu"
        className={`mx-auto max-w-6xl px-4 pt-5 transition-all duration-500 md:px-10 md:pt-10 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
      >
        <ul className="flex flex-col gap-1 md:gap-4">
          {menuItems.map((item, index) => (
            <li
              key={`main-menu-item-${index}`}
              className={`transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
            >
              <Link
                to={item.href}
                className="font-optima-std h-full w-full py-2 text-2xl text-white transition-colors hover:text-gold md:py-4 md:text-5xl"
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="block w-full">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const menuItems = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "What I Do",
    href: "#what-i-do",
  },
  {
    label: "Contact Me",
    href: "#contact",
  },
];
