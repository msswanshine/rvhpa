import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import HeaderElements from "~/components/Header/HeaderElements";
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [
  { title: "Rogue Valley Hang Gliding and Paragliding Association" },
];

export default function Index() {
  const user = useOptionalUser();

  return (
    <div className="h-full bg-gray">
      <HeaderElements user={user} />
      <main id="content">
        <h1 className="text-4xl font-bold">
          Rogue Valley Hang Gliding and Paragliding Association
        </h1>
        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
          {user ? (
            <Link
              to="/notes"
              className="text-yellow-700 hover:bg-yellow-50 flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium shadow-sm sm:px-8"
            >
              View Notes for {user.email}
            </Link>
          ) : (
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <Link
                to="/join"
                className="text-yellow-700 hover:bg-yellow-50 flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium shadow-sm sm:px-8"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center rounded-md px-4 py-3 font-medium text-white"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
