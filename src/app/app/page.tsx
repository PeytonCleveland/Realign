import Link from "next/link";
import Image from "next/image";
import { Achievements, Page, Tabs } from "@/components";
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
    .select("full_name")
    .eq("id", user!.id);

  console.log(profile![0]);

  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back, {profile![0]["full_name"].split(" ")[0]}!
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            You&apos;ve submitted 142 RLHF datapoints on Realign. Keep it
            up!&nbsp;
            <span className="text-lg">🚀</span>
          </p>
        </div>
      </div>
      <div className="flex w-full gap-4 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 justify-between">
        <div className="flex flex-col w-full md:w-3/5 gap-4">
          <h2 className="text-xl text-gray-900 font-semibold">Contribute</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:space-x-10 space-y-6 md:space-y-0">
            <Link
              className="group relative inline-block focus:outline-none focus:ring w-full h-[175px] bg-white"
              href="/app/submissions/new"
            >
              <span className="absolute inset-0 border-r-2 border-b-2 rounded-md border-transparent group-hover:border-blue-400 border-dashed"></span>
              <span className="flex border-2 justify-between rounded-md border-gray-200 h-full p-6 transition-transform group-hover:-translate-x-[6px] group-hover:-translate-y-[6px]">
                <p className="max-w-[150px]">Create RLHF Submission</p>
                <Image
                  src="/folder.gif"
                  width={150}
                  height={150}
                  alt="letter"
                  className="mr-3 mb-1"
                />
              </span>
            </Link>

            <Link
              className="group relative inline-block focus:outline-none focus:ring w-full h-[175px] bg-white"
              href="/app/submissions"
            >
              <span className="absolute inset-0 border-r-2 border-b-2 rounded-md border-transparent group-hover:border-blue-400 border-dashed"></span>
              <span className="flex border-2 justify-between rounded-md border-gray-200 h-full p-6 transition-transform group-hover:-translate-x-[6px] group-hover:-translate-y-[6px]">
                <p className="max-w-[150px]">Score RLHF submissions</p>
                <Image
                  src="/browse.gif"
                  width={150}
                  height={150}
                  alt="letter"
                  className="mr-3 mb-1"
                />
              </span>
            </Link>
          </div>
          <h2 className="text-xl text-gray-900 font-semibold mt-2">Compete</h2>
          <div className="w-full grid grid-cols-2 space-x-10">
            <Link
              className="group relative inline-block focus:outline-none focus:ring w-full h-[175px] bg-white"
              href="/app/submissions"
            >
              <span className="absolute inset-0 border-r-2 border-b-2 rounded-md border-transparent group-hover:border-blue-400 border-dashed"></span>
              <span className="flex border-2 justify-between rounded-md border-gray-200 h-full p-6 transition-transform group-hover:-translate-x-[6px] group-hover:-translate-y-[6px]">
                <p className="max-w-[150px]">Redeem reward points</p>
                <Image
                  src="/rewards.gif"
                  width={150}
                  height={150}
                  alt="letter"
                  className="mr-3 mb-1"
                />
              </span>
            </Link>
            <Link
              className="group relative inline-block focus:outline-none focus:ring w-full h-[175px] bg-white"
              href="/app/submissions"
            >
              <span className="absolute inset-0 border-r-2 border-b-2 rounded-md border-transparent group-hover:border-blue-400 border-dashed"></span>
              <span className="flex border-2 justify-between rounded-md border-gray-200 h-full p-6 transition-transform group-hover:-translate-x-[6px] group-hover:-translate-y-[6px]">
                <p className="max-w-[150px]">View Realign leaderboards</p>
                <Image
                  src="/leaderboards.gif"
                  width={160}
                  height={160}
                  alt="letter"
                  className="mr-2"
                />
              </span>
            </Link>
          </div>
          <h2 className="text-xl text-gray-900 font-semibold mt-2">Learn</h2>
          <div className="w-full grid grid-cols-2 space-x-10">
            <Link
              className="group relative inline-block focus:outline-none focus:ring w-full h-[175px] bg-white"
              href="/app/submissions"
            >
              <span className="absolute inset-0 border-r-2 border-b-2 rounded-md border-transparent group-hover:border-blue-400 border-dashed"></span>
              <span className="flex border-2 justify-between rounded-md border-gray-200 h-full p-6 transition-transform group-hover:-translate-x-[6px] group-hover:-translate-y-[6px]">
                <p className="max-w-[150px]">Language models 101</p>
                <Image src="/learn.gif" width={150} height={150} alt="letter" />
              </span>
            </Link>
          </div>
        </div>
        <div className="w-[30%] h-[400px] mt-[44px] rounded-md shadow-sm hidden md:flex flex-col border-2 border-blue-600">
          <Achievements />
        </div>
      </div>
    </Page>
  );
};

export default AuthHome;
