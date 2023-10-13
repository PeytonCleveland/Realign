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
        <p className="text-lg font-bold text-gray-900 sm:text-xl">
          Featured Training
        </p>
        <div className="flex w-full gap-8 justify-between">
          {trainingItems?.map((item) => {
            return (
              <Link
                key={item.slug}
                href={item.external_url ?? item.slug}
                className="flex flex-1 border-2 border-gray-300 rounded-md shadow-sm"
              >
                <div className="w-full h-[300px]">
                  <Image src={item.thumbnail_url} fill alt={item.name} />
                </div>
                <h6>{item.name}</h6>
              </Link>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

export default Learn;
