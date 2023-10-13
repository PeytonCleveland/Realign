import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Breadcrumbs, Page } from "@/components";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const Learn = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data: trainingItems } = await supabase
    .from("training_items")
    .select();

  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <Breadcrumbs
            items={[
              { text: "Home", href: "/app" },
              { text: "Learn", href: "/app/learn", active: true },
            ]}
            className="mb-12"
          />
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Learn
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Learn about large language models, Realign, and Ocelot.&nbsp;
            <span className="text-lg">🧠</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 justify-between">
        <p className="font-bold text-gray-900 sm:text-xl">LLM Essentials</p>
        <div className="flex w-full gap-8">
          {trainingItems?.map((item) => {
            return (
              <Link
                key={item.slug}
                target={item.external_url ? "_blank" : undefined}
                href={item.external_url ?? item.slug}
                className="flex flex-col w-1/4 border-2 border-gray-200 rounded-md shadow-sm overflow-hidden hover:border-blue-600"
              >
                <div className="w-full h-[150px] relative object-contain">
                  <Image src={item.thumbnail_url} fill alt={item.name} />
                </div>
                <div className="flex flex-col gap-2 p-3 w-full">
                  <div className="flex justify-between items-center w-full">
                    <h6 className="text-gray-900 font-semibold text-sm">
                      {item.name}
                    </h6>
                    {item.external_url ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                  </div>
                  <p className="text-xs font-light text-gray-600">
                    {item.description.slice(0, 75)}...
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

export default Learn;
