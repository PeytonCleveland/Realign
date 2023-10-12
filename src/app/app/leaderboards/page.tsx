import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Breadcrumbs, Page } from "@/components";

interface Profile {
  id: string;
  updated_at: string;
  full_name: string;
  avatar_url: string;
  onboarded: boolean;
  contributions: number;
  points: number;
  streak: number;
  submissions: number;
  ratings: number;
}

const Leaderboards = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data: profiles } = await supabase.from("profiles").select();

  console.log(profiles);

  const filteredProfiles = profiles?.filter((profile: Profile) => {
    return profile.full_name !== "Peyton Cleveland";
  });

  const ranks = filteredProfiles?.sort((a: Profile, b: Profile) => {
    return a.points > b.points ? -1 : 1;
  });

  console.log("ranks: ", ranks);

  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <Breadcrumbs
            items={[
              { text: "Home", href: "/app" },
              { text: "Leaderboards", href: "/app/leaderboards", active: true },
            ]}
            className="mb-12"
          />

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Event Leaderboards
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Earn points and compete for rewards by submitting data and rating
            submissions!&nbsp;<span className="text-lg">🏆</span>
          </p>
        </div>
      </div>

      <div className="flex w-full gap-4 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 justify-between">
        <div className="w-full border-2 border-blue-600 rounded-md shadow-sm flex flex-col overflow-hidden">
          {ranks?.map((rank, index) => {
            return (
              <div
                key={rank.id}
                className="w-full flex items-center justify-between p-6 bg-gray-50 border-b-2 border-gray-100"
              >
                <h4 className="text-lg font-semibold text-gray-900">
                  {index + 1}. {rank["full_name"]}
                </h4>
                <h4 className="text-lg font-semibold text-gray-900">
                  {rank.points} Points
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

export default Leaderboards;
