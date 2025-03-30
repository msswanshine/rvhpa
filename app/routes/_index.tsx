import type { MetaFunction } from "@remix-run/node";

import HeaderElements from "~/components/Header/HeaderElements";

export const meta: MetaFunction = () => [
  { title: "Rogue Valley Hang Gliding and Paragliding Association" },
];

export default function Index() {
  return (
    <div className="h-full bg-gray">
      <HeaderElements />
      <main id="content">
        <h1 className="text-4xl font-bold">
          Rogue Valley Hang Gliding and Paragliding Association
        </h1>
      </main>
    </div>
  );
}
