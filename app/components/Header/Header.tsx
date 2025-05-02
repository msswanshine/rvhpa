import { Link, Form } from "@remix-run/react";
import { useEffect, useState } from "react";

import LoginIcon from "~/components/Icons/LoginIcon";
import Layout from "~/components/Layout";
import type { UserWithMember } from "~/models/user.server";

export default function Header({ user }: { user: UserWithMember | undefined }) {
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
              {user && (
                <p className="text-white">
                  {`Welcome, ${
                    user.member?.firstName && user.member?.lastName
                      ? `${user.member?.firstName} ${user.member?.lastName}`
                      : user.email
                  }`}
                </p>
              )}
              {user ? (
                <div className="relative group">
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="flex items-center focus:outline-none"
                  >
                    <LoginIcon color="white" />
                    <span className="sr-only">Account menu</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/membership"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Membership
                      </Link>
                      <Form action="/logout" method="post">
                        <button
                          type="submit"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" aria-label="Login" className="relative group">
                  <LoginIcon color="white" />
                  <div className="absolute -left-3 top-8 rounded hidden bg-white px-2 py-1 text-sm text-black group-hover:block group-focus:block">
                    Login
                  </div>
                </Link>
              )}
            </div>
          </div>
        </Layout>
      </header>
    </>
  );
}
