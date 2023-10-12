import {
  ActivityCard,
  Breadcrumbs,
  Page,
  SubmissionRating,
} from "@/components";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const revalidate = 0;

const SubmissionDetails = async ({
  params,
}: {
  params: { submissionId: string };
}) => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("submissions")
    .select("*, profiles(*)")
    .eq("id", params.submissionId);

  if (error) return null;

  const { data: previousRating } = await supabase
    .from("ratings")
    .select()
    .eq("submission_id", params.submissionId)
    .eq("user_id", user!.id);

  const { data: ratings } = await supabase
    .from("ratings")
    .select("*, profiles(*)")
    .eq("submission_id", params.submissionId);

  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <Breadcrumbs
            items={[
              { text: "Home", href: "/app" },
              { text: "Submissions", href: "/app/submissions" },
              {
                text: "Submission Details",
                href: `/app/submissions/new`,
                active: true,
              },
            ]}
            className="mb-12"
          />
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
          <div className="flex flex-[2] flex-col">
            <ActivityCard
              user={data[0].profiles}
              activity={data[0]}
              canEdit={data[0].profiles.id === user?.id}
            />
            {ratings?.map((rating, index) => {
              return (
                <>
                  <span className="h-14 w-[3px] bg-gray-200 ml-10" />
                  <ActivityCard
                    key={index}
                    user={rating.profiles}
                    rating={rating}
                  />
                </>
              );
            })}
          </div>
          {data[0].user_id === user?.id ? null : (
            <SubmissionRating
              userId={user!.id}
              submissionId={params.submissionId}
              previousRating={previousRating ? previousRating[0] : null}
            />
          )}
        </div>
      </div>
    </Page>
  );
};

export default SubmissionDetails;
