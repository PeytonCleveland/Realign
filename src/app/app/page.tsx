import Image from "next/image";
import { Achievements, BadgeModal, Card, Page } from "@/components";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const AuthHome = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, contributions, points, streak, submissions, ratings, flagged"
    )
    .eq("id", user!.id);

  // const { data: badges } = await supabase
  //   .from("user_badges")
  //   .select()
  //   .eq("user_id", user!.id);

  // const badgeNotifications = badges?.filter((badge) => {
  //   badge.user_notified === false;
  // });

  return (
    <Page>
      {/* {badgeNotifications ? (
        <BadgeModal badgeId={badgeNotifications[0]["badge_id"]} />
      ) : null} */}

      {profile?.[0].flagged ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-60 flex justify-center items-center z-[100]">
          <div className="flex flex-col rounded-md shadow-sm bg-white p-6 gap-6 w-[350px]">
            <h3 className="text-lg font-semibold text-gray-900">
              Account Flagged
            </h3>
            <p className="text-sm font-light text-gray-600">
              Your account has been flagged for bot/spam activity based on the
              content and timestamps of the following submissions. These
              submissions and points awarded for them have been removed.
            </p>
            <button className="bg-blue-600 text-white disabled:bg-blue-300 px-5 py-2 font-medium rounded-md flex items-center gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2 self-end">
              Continue
            </button>
          </div>
        </div>
      ) : null}

      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back, {profile![0]["full_name"].split(" ")[0]}!
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            {profile?.[0].contributions > 0
              ? `You've submitted ${profile?.[0].contributions} datapoints on
            Realign. Keep it up! `
              : `Start submitting data and scoring submissions to earn points! `}
            &nbsp;<span className="text-lg">🚀</span>
          </p>
        </div>
      </div>
      <div className="flex w-full gap-4 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 justify-between">
        <div className="flex flex-col w-full md:w-3/5 gap-4">
          <h2 className="text-xl text-gray-900 font-semibold">Contribute</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:space-x-10 space-y-6 md:space-y-0">
            <Card
              title="Create SFT Submission"
              href="/app/submissions/new"
              image={
                <Image
                  src="/folder.gif"
                  width={150}
                  height={150}
                  alt="letter"
                  className="mr-3 mb-1"
                />
              }
            />

            <Card
              title="Score SFT submissions"
              href="/app/submissions"
              image={
                <Image
                  src="/browse.gif"
                  width={150}
                  height={150}
                  alt="letter"
                  className="mr-3 mb-1"
                />
              }
            />
          </div>

          <h2 className="text-xl text-gray-900 font-semibold mt-2">Compete</h2>
          <div className="w-full grid grid-cols-2 space-x-10">
            {/* <Card
              title="Redeem reward points"
              href="/app/submissions"
              image={
                <Image
                  src="/rewards.gif"
                  width={150}
                  height={150}
                  alt="letter"
                  className="mr-3 mb-1"
                />
              }
            /> */}
            <Card
              title="View Realign leaderboards"
              href="/app/leaderboards"
              image={
                <Image
                  src="/leaderboards.gif"
                  width={160}
                  height={160}
                  alt="letter"
                  className="mr-2"
                />
              }
            />
          </div>
          <h2 className="text-xl text-gray-900 font-semibold mt-2">Learn</h2>
          <div className="w-full grid grid-cols-2 space-x-10">
            <Card
              title="Language models 101"
              href="/app/learn"
              image={
                <Image src="/learn.gif" width={150} height={150} alt="letter" />
              }
            />
          </div>
        </div>
        <div className="w-[30%] h-[400px] mt-[44px] rounded-md shadow-sm hidden md:flex flex-col border-2 border-blue-600">
          <Achievements user={profile![0]} />
        </div>
      </div>
    </Page>
  );
};

export default AuthHome;
