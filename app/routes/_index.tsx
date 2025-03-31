import type { MetaFunction } from "@remix-run/node";

import HeaderElements from "~/components/Header/HeaderElements";
import Layout from "~/components/Layout";
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
        <Layout>
          <div className="mx-auto max-w-7xl">
            <div className="px-5 md:px-10">
              <h1 className="text-4xl font-bold pt-40">
                Rogue Valley Hang Gliding and Paragliding Association
              </h1>
              <p>
                Welcome to our new website!
              </p>
            </div>
          </div>
        </Layout>
      </main>
    </div>
  );
}
