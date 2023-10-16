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
      <div className="flex flex-col w-full gap-3 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 justify-between">
        <h6 className="font-semibold text-gray-900">Overview</h6>
        <div className="flex w-full gap-4 items-center">
          <div className="w-1/4 rounded-md shadow-sm bg-blue-600 p-8">
            <p className="text-white font-semibold text-3xl">🏆</p>
            <p className="text-white font-semibold text-xl">
              {profiles[0].points}&nbsp;Points
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Profile;
