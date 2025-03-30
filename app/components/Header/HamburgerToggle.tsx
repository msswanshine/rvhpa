export default function HamburgerIcon({
  className,
  isOpen,
  setIsOpen,
}: {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const lineClasses =
    "menu-line h-[2px] bg-white group-hover:bg-gold group-focus:bg-gold transition-all duration-300 origin-center";

  return (
    <div className={className}>
      <button
        className={`menu-toggle relative z-10 p-2 pr-0`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        title="Menu Toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`menu-toggle-lines group flex h-5 w-7 flex-col justify-between sm:h-6 sm:w-8 ${isOpen ? "active" : ""}`}
        >
          <span
            className={`${lineClasses} ${isOpen ? "translate-y-[9px] rotate-45 sm:translate-y-[11px]" : ""}`}
          ></span>
          <span
            className={`${lineClasses} ${isOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`${lineClasses} ${isOpen ? "-translate-y-[9px] -rotate-45 sm:-translate-y-[11px]" : ""}`}
          ></span>
        </div>
      </button>
    </div>
  );
}
