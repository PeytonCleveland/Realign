import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
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

          <p className="mt-1.5 text-sm text-gray-500">{item.description}</p>
        </div>
      </div>
    </Page>
  );
};

export default TrainingItem;
