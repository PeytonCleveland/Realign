import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, Breadcrumbs, Page } from "@/components";

const Profile = async ({ params }: { params: { userId: string } }) => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { userId } = params;
  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId);

  if (!profiles || !profiles[0]) redirect("/app/404");

  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <Breadcrumbs
            items={[
              { text: "Home", href: "/app" },
              { text: "Profile", href: `/app/profile/${userId}`, active: true },
            ]}
            className="mb-12"
          />
          <div className="flex items-center w-full">
            <Avatar imageUrl={profiles[0].avatar_url} />
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {profiles[0].full_name}
            </h1>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Profile;
