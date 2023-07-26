import { Page, SubmissionRating } from "@/components";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const SubmissionDetails = async ({
  params,
}: {
  params: { submissionId: string };
}) => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data, error } = await supabase
    .from("submissions")
    .select()
    .eq("id", params.submissionId);

  if (error) return null;

  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Rate Submission
          </h1>

          <p className="mt-2 text-sm text-gray-500 max-w-[600px]">
            Rate this submission on truthfulness, helpfulness, and safety.
            Optionally, submit an alternate response to the given prompt&nbsp;
            <span className="text-lg">⭐️</span>
          </p>
        </div>
      </div>
      <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full gap-8 flex flex-col">
        <div className="flex w-full gap-12">
          <div className="flex flex-[2] flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-gray-900 sm:text-lg">Prompt</h3>
              <div className="w-full sm:text-sm text-gray-900 font-light rounded-md p-5 bg-blue-50 flex flex-col gap-2.5 shadow-sm">
                {data[0].prompt.split("\n").map((line: string) => {
                  return <p>{line}</p>;
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-gray-900 sm:text-lg">Response</h3>
              <div className="w-full sm:text-sm text-gray-900 font-light rounded-md p-5 bg-gray-100 flex flex-col gap-2.5 shadow-sm">
                {data[0].response.split("\n").map((line: string) => {
                  return <p>{line}</p>;
                })}
              </div>
            </div>
          </div>
          <SubmissionRating />
        </div>
      </div>
    </Page>
  );
};

export default SubmissionDetails;
