import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { Breadcrumbs, Page } from "@/components";

const TrainingItem = async ({ params }: { params: { itemSlug: string } }) => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const slug = params.itemSlug;

  const { data: items } = await supabase
    .from("training_items")
    .select()
    .eq("slug", slug);

  const item = items![0];

  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <Breadcrumbs
            items={[
              { text: "Home", href: "/app" },
              { text: "Learn", href: "/app/learn" },
              {
                text: item.name,
                href: `/app/learn/${item.slug}`,
                active: true,
              },
            ]}
            className="mb-12"
          />

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {item.name}
          </h1>

          <p className="mt-1.5 text-sm text-gray-500 max-w-[550px]">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 justify-between">
        <div className="w-1/2 h-[250px] rounded-md shadow-sm overflow-hidden object-cover relative self-center">
          <Image src={item.content.hero} alt={item.content.name} fill />
        </div>
        {item.content.sections.map((section: any, index: number) => {
          return (
            <div className="flex flex-col gap-2" key={index}>
              <h4 className="text-gray-900 text-lg font-semibold">
                {section.heading}
              </h4>
              <p className="text-gray-600 font-light text-sm">{section.text}</p>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default TrainingItem;
