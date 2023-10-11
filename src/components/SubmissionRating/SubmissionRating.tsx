"use client";

import { useState, FC } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Rating, ThinStar } from "@smastrom/react-rating";
import toast from "react-hot-toast";

enum Choice {
  YES = "yes",
  NO = "no",
  UNSURE = "unsure",
}

interface Rating {
  submission_id: string;
  overall_rating: number;
  truthful: Choice;
  helpful: Choice;
  safe: Choice;
  user_id: string;
}

interface Props {
  userId: string;
  submissionId: string;
  previousRating: any;
}

const SubmissionRating: FC<Props> = ({
  userId,
  submissionId,
  previousRating,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rating, setRating] = useState<Rating>(
    previousRating || {
      submission_id: submissionId,
      overall_rating: null,
      truthful: null,
      helpful: null,
      safe: null,
      user_id: userId,
    }
  );

  const supabase = createClientComponentClient();

  const notifySuccess = () => toast.success("Data sumbitted succesfully");
  const notifyFailure = (error: string) => toast.error(error);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (previousRating) {
      const { error } = await supabase
        .from("ratings")
        .update({
          overall_rating: rating.overall_rating,
          truthful: rating.truthful,
          helpful: rating.helpful,
          safe: rating.safe,
        })
        .eq("id", previousRating.id);

      if (error) {
        notifyFailure(error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("ratings").insert(rating);

      if (error) {
        notifyFailure(error.message);
        return;
      }
    }

    if (rating.overall_rating > 4) {
      const { data: submission } = await supabase
        .from("submissions")
        .select("id, profiles(id, points)")
        .eq("id", submissionId);

      console.log("submission: ", submission);

      const awardProfile = submission![0].profiles;

      console.log("profile: ", awardProfile);

      await supabase
        .from("profiles")
        .update({ points: awardProfile.points + 5 })
        .eq("id", awardProfile.id);
    }

    setIsLoading(false);
    notifySuccess();
  };

  const ratingSwitch = (rating: number) => {
    switch (rating) {
      case 5:
        return "Excellent";
      case 4:
        return "Above Average";
      case 3:
        return "Average";
      case 2:
        return "Below Average";
      case 1:
        return "Poor";
      default:
        return "";
    }
  };

  const isRatingEqual = (): boolean => {
    if (!previousRating) return false;

    return (
      previousRating.overall_rating === rating.overall_rating &&
      previousRating.truthful === rating.truthful &&
      previousRating.helpful === rating.helpful &&
      previousRating.safe === rating.safe
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-10 border-2 border-blue-600 rounded-md shadow-sm p-5">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-lg">Overall Rating</label>
        <p className="text-sm text-gray-500 font-light mb-2">
          Rate the overall quality of this submission
        </p>
        <div className="flex gap-3">
          <Rating
            value={rating.overall_rating || 0}
            onChange={(v: number) =>
              setRating({ ...rating, overall_rating: v })
            }
            style={{ maxWidth: "160px" }}
            itemStyles={{
              itemShapes: ThinStar,
              activeBoxColor: [
                "#f7b609",
                "#f7b609",
                "#f7b609",
                "#f7b609",
                "#f7b609",
              ],
              inactiveBoxColor: "#C7C7C7",
              inactiveFillColor: "white",
              activeFillColor: "white",
            }}
            spaceBetween="small"
            halfFillMode="box"
          />
          {rating ? (
            <p className="text-gray-600 font-light text-sm pt-0.5">
              {ratingSwitch(rating.overall_rating)}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-lg">Truthfulness</label>
        <p className="text-sm text-gray-500 font-light mb-2">
          Is the given response factually correct?
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <input
              type="radio"
              name="factualYes"
              value="yes"
              id="factualYes"
              className="peer hidden"
              checked={rating.truthful === Choice.YES}
              onChange={() => setRating({ ...rating, truthful: Choice.YES })}
            />

            <label
              htmlFor="factualYes"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-green-500 peer-checked:ring-1 peer-checked:ring-green-500"
            >
              <p className="text-gray-700">Yes</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="factualNo"
              value="no"
              id="factualNo"
              className="peer hidden"
              checked={rating.truthful === Choice.NO}
              onChange={() => setRating({ ...rating, truthful: Choice.NO })}
            />

            <label
              htmlFor="factualNo"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-red-500 peer-checked:ring-1 peer-checked:ring-red-500"
            >
              <p className="text-gray-700">No</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="factualUnsure"
              value="unsure"
              id="factualUnsure"
              className="peer hidden"
              checked={rating.truthful === Choice.UNSURE}
              onChange={() => setRating({ ...rating, truthful: Choice.UNSURE })}
            />

            <label
              htmlFor="factualUnsure"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-purple-500 peer-checked:ring-1 peer-checked:ring-purple-500"
            >
              <p className="text-gray-700">Unsure</p>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-lg">Helpfulness</label>
        <p className="text-sm text-gray-500 font-light mb-2">
          Is the given response helpful?
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <input
              type="radio"
              name="helpfulYes"
              value="yes"
              id="helpfulYes"
              className="peer hidden"
              checked={rating.helpful === Choice.YES}
              onChange={() => setRating({ ...rating, helpful: Choice.YES })}
            />

            <label
              htmlFor="helpfulYes"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-green-500 peer-checked:ring-1 peer-checked:ring-green-500"
            >
              <p className="text-gray-700">Yes</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="helpfulNo"
              value="no"
              id="helpfulNo"
              className="peer hidden"
              checked={rating.helpful === Choice.NO}
              onChange={() => setRating({ ...rating, helpful: Choice.NO })}
            />

            <label
              htmlFor="helpfulNo"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-red-500 peer-checked:ring-1 peer-checked:ring-red-500"
            >
              <p className="text-gray-700">No</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="helpfulUnsure"
              value="unsure"
              id="helpfulUnsure"
              className="peer hidden"
              checked={rating.helpful === Choice.UNSURE}
              onChange={() => setRating({ ...rating, helpful: Choice.UNSURE })}
            />

            <label
              htmlFor="helpfulUnsure"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-purple-500 peer-checked:ring-1 peer-checked:ring-purple-500"
            >
              <p className="text-gray-700">Unsure</p>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-lg">Safety</label>
        <p className="text-sm text-gray-500 font-light mb-2">
          Is the given response safe?
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <input
              type="radio"
              name="safeYes"
              value="yes"
              id="safeYes"
              className="peer hidden"
              checked={rating.safe === Choice.YES}
              onChange={() => setRating({ ...rating, safe: Choice.YES })}
            />

            <label
              htmlFor="safeYes"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-green-500 peer-checked:ring-1 peer-checked:ring-green-500"
            >
              <p className="text-gray-700">Yes</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="safeNo"
              value="no"
              id="safeNo"
              className="peer hidden"
              checked={rating.safe === Choice.NO}
              onChange={() => setRating({ ...rating, safe: Choice.NO })}
            />

            <label
              htmlFor="safeNo"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-red-500 peer-checked:ring-1 peer-checked:ring-red-500"
            >
              <p className="text-gray-700">No</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="safeUnsure"
              value="unsure"
              id="safeUnsure"
              className="peer hidden"
              checked={rating.safe === Choice.UNSURE}
              onChange={() => setRating({ ...rating, safe: Choice.UNSURE })}
            />

            <label
              htmlFor="safeUnsure"
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-white p-3 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-purple-500 peer-checked:ring-1 peer-checked:ring-purple-500"
            >
              <p className="text-gray-700">Unsure</p>
            </label>
          </div>
        </div>
      </div>

      <button
        disabled={
          isLoading ||
          rating.overall_rating === null ||
          rating.truthful === null ||
          rating.safe === null ||
          isRatingEqual()
        }
        onClick={handleSubmit}
        className="bg-blue-600 text-white disabled:bg-blue-300 px-5 py-3 font-medium rounded-md gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2 flex justify-center items-center"
      >
        Submit
      </button>
    </div>
  );
};
export default SubmissionRating;
