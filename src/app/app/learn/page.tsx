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
                className="flex flex-col w-1/4 border-2 border-gray-200 rounded-md shadow-sm overflow-hidden hover:border-blue-600"
              >
                <div className="w-full h-[150px] relative object-contain">
                  <Image src={item.thumbnail_url} fill alt={item.name} />
                </div>
                <div className="flex flex-col gap-2 p-3 w-full">
                  <div className="flex justify-between items-center w-full">
                    <h6>{item.name}</h6>
                    {item.external_url ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                  </div>
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
