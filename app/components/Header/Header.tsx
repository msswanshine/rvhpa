import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import LoginIcon from "~/components/Icons/LoginIcon";
import Layout from "~/components/Layout";
import type { User } from "~/types/user";

export default function Header({ user }: { user: User | undefined }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-50 focus:m-4 focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:bg-black focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={`fixed left-0 right-0 top-0 z-20 transition-colors duration-300 ${isScrolled ? "bg-darkGray" : "bg-transparent"}`}
      >
        <Layout>
          <div className="flex items-center justify-between px-4 py-[18px] md:px-10 md:py-8">
            <Link to="/" className="text-2xl font-bold text-white">
              RVHPA
              <span className="sr-only">Home page</span>
            </Link>
            <div className="mr-14 flex items-center gap-2">
              {user && <p className="text-white">{`Welcome, ${user.email}`}</p>}
              <Link to={user ? "/logout" : "/login"}>
                <LoginIcon color="white" />
                <span className="sr-only">{user ? "Logout" : "Login"}</span>
              </Link>
            </div>
          </div>
        </Layout>
      </header>
    </>
  );
}
