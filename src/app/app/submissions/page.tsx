import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Page, SubmissionTabs } from "@/components";

const Submissions = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: submissions } = await supabase
    .from("submissions")
    .select(`*, profiles("*")`);

  const data = submissions?.map((submission) => {
    return {
      id: submission.id,
      user: {
        id: submission.profiles.id,
        name: submission.profiles["full_name"],
        avatar: submission.profiles["avatar_url"],
      },
      prompt: submission.prompt,
      response: submission.response,
      rating: submission.rating,
      tags: submission.tags.split(",").filter((s: string) => s !== ""),
    };
  });

  const userSubmissions = data?.filter((submission) => {
    return submission.user.id === user?.id;
  });

  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Score RLHF Submissions
          </h1>

          <p className="mt-2 text-sm text-gray-500 max-w-[600px]">
            Contribute to the alignment of generative AI language models by
            reviewing and scoring the submissions of others.&nbsp;
            <span className="text-lg">👀</span>
          </p>
        </div>
      </div>
      <SubmissionTabs allSubmissions={data} userSubmissions={userSubmissions} />
    </Page>
  );
};

export default Submissions;
