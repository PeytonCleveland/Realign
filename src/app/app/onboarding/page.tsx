"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";
import Page from "@/components/Page";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Onboarding = () => {
  const [avatarPath, setAvatarPath] = useState<string>();
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "" });
  const [userId, setUserId] = useState<string>();

  const supabase = createPagesBrowserClient();
  const router = useRouter();

  const notify = () => toast.success("Profile updated succesfully");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) setUserId(user.id);
    };

    getUser();
  }, [supabase.auth]);

  const uploadFile = async (file: File) => {
    if (file) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${nanoid()}.${file.name.split(".").at(-1)}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.log(error);
        return;
      }

      setAvatarPath(data.path);
    }
  };

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: `${userInfo.firstName.trim()} ${userInfo.lastName.trim()}`,
        avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarPath}`,
        onboarded: true,
      })
      .eq("id", userId);

    if (error) {
      console.log(error);
    }

    const { data: badge } = await supabase
      .from("badges")
      .select("id")
      .eq("slug", "1-day-streak");

    await supabase
      .from("user_badges")
      .insert({ badge_id: badge![0].id, user_id: userId });

    notify();
    router.push("/app");
  };

  return (
    <Page>
      <div className="w-full bg-gray-50 h-full flex flex-1">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
          <div className="bg-white rounded-md shadow-sm p-8 w-[500px] flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Profile information</h1>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="avatar"
                className="block font-medium text-gray-700"
              >
                Avatar Image{" "}
                <span className="text-sm text-gray-500 font-light ml-1">
                  (optional)
                </span>
              </label>
              <div className="flex items-center space-x-6 mb-4">
                <div className="shrink-0">
                  <Image
                    id="preview_img"
                    className="h-16 w-16 object-cover rounded-full"
                    height={32}
                    width={32}
                    src={
                      avatarPath
                        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarPath}`
                        : "/default.png"
                    }
                    alt="Current profile photo"
                    priority
                  />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    name="avatar"
                    accept=".png,.jpg,.gif"
                    onChange={async (e) => {
                      if (e.target.files) {
                        await uploadFile(e.target.files[0]);
                      }
                    }}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                  />
                </label>
              </div>
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                name="firstName"
                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 text-sm"
                value={userInfo.firstName}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                name="lastName"
                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 text-sm"
                value={userInfo.lastName}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              disabled={userInfo.firstName === "" || userInfo.lastName === ""}
              className="bg-blue-600 self-end text-white py-2 px-4 font-medium shadow-sm rounded-md w-fit flex justify-center items-center gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Onboarding;
