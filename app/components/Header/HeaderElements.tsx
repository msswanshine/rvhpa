import { useEffect, useState } from "react";

import type { User } from "~/types/user";

import HamburgerToggle from "./HamburgerToggle";
import Header from "./Header";
import HeaderMenu from "./HeaderMenu";

export default function HeaderElements({ user }: { user: User | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header user={user} />
      <HeaderMenu isOpen={isOpen} />
      <div className={`absolute left-0 right-0 top-0 mx-auto w-full max-w-7xl`}>
        <div
          className={` ${isScrolled ? "fixed" : "absolute"} right-4 top-4 z-30 sm:right-10 sm:top-[28px]`}
        >
          <HamburgerToggle
            className="flex justify-end"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </>
  );
}
