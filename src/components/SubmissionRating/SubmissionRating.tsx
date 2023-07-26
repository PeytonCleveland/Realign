"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Rating, ThinStar } from "@smastrom/react-rating";
import toast from "react-hot-toast";

const SubmissionRating = ({ submissionId }: any) => {
  const [rating, setRating] = useState<number | null>(null);
  const [factual, setFactual] = useState<string | null>(null);
  const [helpful, setHelpful] = useState<string | null>(null);
  const [safe, setSafe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const notify = () => toast.success("Data sumbitted succesfully");

  const handleSubmit = async () => {
    setIsLoading(true);

    const { error } = await supabase.from("ratings").insert({
      submission_id: submissionId,
      overall_rating: rating,
      truthful: factual,
      helpful: helpful,
      safe: safe,
    });

    if (error) console.log(error);

    setIsLoading(false);
    notify();
    router.push("/app/submissions");
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

  return (
    <div className="flex flex-1 flex-col gap-10 border-2 border-blue-600 rounded-md shadow-sm p-5">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-lg">Overall Rating</label>
        <p className="text-sm text-gray-500 font-light mb-2">
          Rate the overall quality of this submission
        </p>
        <div className="flex gap-3">
          <Rating
            value={rating || 0}
            onChange={(v: number) => setRating(v)}
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
            <p className="text-gray-600 font-light text-sm">
              {ratingSwitch(rating)}
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
              checked={factual === "yes"}
              onClick={() => setFactual("yes")}
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
              checked={factual === "no"}
              onClick={() => setFactual("no")}
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
              checked={factual === "unsure"}
              onClick={() => setFactual("unsure")}
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
              checked={helpful === "yes"}
              onClick={() => setHelpful("yes")}
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
              checked={helpful === "no"}
              onClick={() => setHelpful("no")}
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
              checked={helpful === "unsure"}
              onClick={() => setHelpful("unsure")}
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
              checked={safe === "yes"}
              onClick={() => setSafe("yes")}
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
              checked={safe === "no"}
              onClick={() => setSafe("no")}
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
              checked={safe === "unsure"}
              onClick={() => setSafe("unsure")}
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
          isLoading || rating === null || factual === null || safe === null
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
