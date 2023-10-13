"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import Breadcrumbs from "@/components/Breadcrumbs";

const tags = [
  {
    title: "Software Engineering",
    id: "software-engineering",
  },
  {
    title: "Military",
    id: "military",
  },
  {
    title: "Data Science",
    id: "data-science",
  },
  {
    title: "Javascript",
    id: "javascript",
  },
  {
    title: "Rust",
    id: "rust",
  },
  {
    title: "Python",
    id: "python",
  },
  {
    title: "Machine Learning",
    id: "machine-learning",
  },
  {
    title: "History",
    id: "history",
  },
  {
    title: "Data Formatting",
    id: "data-formatting",
  },
  {
    title: "Code Refactoring",
    id: "code-refactoring",
  },
  {
    title: "Email Writing",
    id: "email-writing",
  },
  {
    title: "Science",
    id: "science",
  },
  {
    title: "Art & Design",
    id: "art-design",
  },
  {
    title: "Technology",
    id: "technology",
  },
  {
    title: "Space Exploration",
    id: "space-exploration",
  },
  {
    title: "Philosophy",
    id: "philosophy",
  },
  {
    title: "Literature",
    id: "literature",
  },
  {
    title: "Pop Culture",
    id: "pop-culture",
  },
  {
    title: "Environment",
    id: "environment",
  },
  {
    title: "Economics",
    id: "economics",
  },
  {
    title: "Mathematics",
    id: "mathematics",
  },
  {
    title: "Health & Medicine",
    id: "health-medicine",
  },
  {
    title: "Cooking & Cuisine",
    id: "cooking-cuisine",
  },
  {
    title: "Travel & Geography",
    id: "travel-geography",
  },
  {
    title: "Psychology",
    id: "psychology",
  },
  {
    title: "Spirituality & Religion",
    id: "spirituality-religion",
  },
  {
    title: "Sports",
    id: "sports",
  },
  {
    title: "Music & Performing Arts",
    id: "music-performing-arts",
  },
  {
    title: "Languages & Linguistics",
    id: "languages-linguistics",
  },
  {
    title: "DIY & Crafts",
    id: "diy-crafts",
  },
  {
    title: "Politics & Governance",
    id: "politics-governance",
  },
  {
    title: "Wildlife & Nature",
    id: "wildlife-nature",
  },
  {
    title: "Entrepreneurship",
    id: "entrepreneurship",
  },
  {
    title: "Cultural Studies",
    id: "cultural-studies",
  },
  {
    title: "Astronomy",
    id: "astronomy",
  },
  {
    title: "Digital Marketing",
    id: "digital-marketing",
  },
  {
    title: "Personal Development",
    id: "personal-development",
  },
  {
    title: "Education & Learning",
    id: "education-learning",
  },
];

const NewSubmission = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedTags, setSelectedTags] = useState("");
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const [isPromptLoading, setIsPromptLoading] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [user, setUser] = useState<any>(null);

  const supabase = createPagesBrowserClient();

  const notify = () => toast.success("Data sumbitted succesfully");

  const handleGeneratePrompt = async () => {
    setPrompt("");
    setIsPromptLoading(true);
    const response = await fetch("/api/openai/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: selectedTags }),
    });

    const data = await response.json();
    setIsPromptLoading(false);
    setPrompt(data.text);
  };

  const handleGenerateResponse = async () => {
    setResponse("");
    setIsResponseLoading(true);
    const response = await fetch("/api/openai/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();
    setIsResponseLoading(false);
    setResponse(data.text);
  };

  const handlePromptChange = (e: any) => {
    setPrompt(e.target.value);
  };

  const handleTagChange = (e: any) => {
    const value = e.target.value;
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.replace(`${value},`, ""));
    } else {
      setSelectedTags(`${value},${selectedTags}`);
    }
  };

  const handleResponseChange = (e: any) => {
    setResponse(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmissionLoading(true);

    const { error } = await supabase.from("submissions").insert({
      prompt: prompt,
      response: response,
      tags: selectedTags,
      user_id: user.id,
    });

    if (error) console.log(error);

    setIsSubmissionLoading(false);
    notify();
    setPrompt("");
    setResponse("");
    setSelectedTags("");
  };

  const handleClear = () => {
    setPrompt("");
    setSelectedTags("");
    setResponse("");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, [supabase.auth]);

  return (
    <main className="flex flex-col flex-1 w-full">
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <Breadcrumbs
            items={[
              { text: "Home", href: "/app" },
              {
                text: "Create Submission",
                href: "/app/submissions/new",
                active: true,
              },
            ]}
            className="mb-12"
          />

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Create New Submission
          </h1>

          <p className="mt-2 text-sm text-gray-500 max-w-[700px]">
            Your submission will be evaluated by other users. Ensure your
            submission is truthful, helpful, and complies with
            Realign&apos;s&nbsp;
            <Link
              href="/app/terms-of-service"
              className="text-blue-600 underline underline-offset-2"
            >
              Terms of Service
            </Link>
            .&nbsp;<span className="text-xl">🎯</span>
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-8 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full p-6 flex justify-between items-center rounded-md shadow-sm bg-yellow-50 border-2 border-yellow-400">
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clipRule="evenodd"
                />
              </svg>

              <h6 className="text-gray-900 text-lg font-semibold">
                Data Protection
              </h6>
            </div>

            <p className="text-sm font-light text-gray-700">
              Realign is a commercial offering deployed on commercial cloud
              infrastructure. Do <strong>not</strong> upload classified or CUI
              data to Realign. Failure to safeguard classified or CUI data is a
              violation of federal law.
            </p>
          </div>
          <label className="block font-medium text-gray-700">Tags</label>
          <ul className="flex gap-2 flex-wrap">
            {tags.map((tag) => {
              return (
                <li className="relative mb-2" key={tag.title}>
                  <input
                    type="checkbox"
                    id={tag.id}
                    name={tag.id}
                    value={tag.title}
                    className="hidden peer"
                    onChange={(e) => handleTagChange(e)}
                  />
                  <label
                    htmlFor={tag.id}
                    className=" peer-checked:bg-blue-50 select-none px-2.5 py-2 text-xs rounded-md border border-gray-300 peer-checked:border-blue-600 shadow-sm cursor-pointer hover:border-blue-600"
                  >
                    {tag.title}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label htmlFor="prompt" className="block font-medium text-gray-700">
              Prompt
            </label>

            {/* <button
              onClick={handleGeneratePrompt}
              disabled={isPromptLoading}
              className="text-sm bg-gray-700 hover:bg-gray-600 disabled:bg-gray-400 focus:ring-1 ring-blue-600 ring-offset-2 text-white px-2.5 py-1.5 rounded-md flex items-center justify-center gap-2"
            >
              {isPromptLoading ? "Generating" : "Generate Prompt"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
              </svg>
            </button> */}
          </div>

          <TextareaAutosize
            id="prompt"
            placeholder="What is the meaning of life?"
            className="w-full rounded-md border border-gray-300 shadow-sm sm:text-sm p-3"
            value={prompt}
            onChange={(e) => handlePromptChange(e)}
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label htmlFor="prompt" className="block font-medium text-gray-700">
              Response
            </label>
            <button
              onClick={handleGenerateResponse}
              disabled={isResponseLoading || prompt === ""}
              className="text-sm bg-gray-700 hover:bg-gray-600 disabled:bg-gray-400 focus:ring-1 ring-blue-600 ring-offset-2 text-white px-2.5 py-1.5 rounded-md flex items-center justify-center gap-2"
            >
              {isResponseLoading ? "Generating" : "Generate Response"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
              </svg>
            </button>
          </div>

          <textarea
            id="prompt"
            placeholder="The meaning of life is a deeply philosophical and existential question that has been discussed and debated among humans for centuries. It's a complex question and different people, cultures, and religions have different beliefs about what gives life its meaning."
            rows={response ? response.split("\n").length + 2 : 5}
            className="w-full rounded-md border border-gray-300 shadow-sm sm:text-sm p-3"
            value={response}
            onChange={(e) => handleResponseChange(e)}
          />
        </div>
        <div className="flex flex-row-reverse justify-start items-center gap-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmissionLoading || prompt === "" || response === ""}
            className="bg-blue-600 text-white disabled:bg-blue-300 px-5 py-2 font-medium rounded-md flex items-center gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2"
          >
            Submit
          </button>

          <button
            onClick={handleClear}
            className="text-gray-600 hover:text-gray-500 focus:underline underline-offset-2 rounded-md font-medium flex items-center gap-2"
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewSubmission;
