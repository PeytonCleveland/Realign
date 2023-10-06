"use client";

import { useState } from "react";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import Page from "@/components/Page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Signup = () => {
  const [error, setError] = useState<string>();

  const router = useRouter();

  const validEmailRegex = /@omnifederal\.com$/;

  const handleSignUp = async (formData: FormData) => {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (!validEmailRegex.test(email)) {
      setError("You must use an Omni Federal email address.");
      return;
    }

    const supabase = createPagesBrowserClient();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    router.push("/confirm-email");
  };

  return (
    <Page>
      <div className="flex w-screen h-screen">
        <div className="flex flex-col flex-1 justify-center items-center">
          <form
            action={handleSignUp}
            className="flex flex-col w-4/5 gap-2 relative"
          >
            {error ? (
              <div className="bg-red-50 w-full p-4 text-red-800 absolute -top-24 left-0 rounded-md">
                {error}
              </div>
            ) : null}
            <Link href="/" className="mb-12">
              <Image
                src="/realign-logo.png"
                width={200}
                height={70}
                alt="Realign Logo"
              />
            </Link>
            <div className="flex flex-col gap-4 mb-10">
              <h1 className="text-xl text-gray-900 font-medium">
                Create your account
              </h1>
              <p className="text-sm text-gray-600 font-light">
                Already have an account?&nbsp;
                <Link
                  href="/sign-in"
                  className="text-blue-600 hover:underline underline-offset-2"
                >
                  Sign In
                </Link>
              </p>
            </div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              className="p-3 rounded-md shadow-sm border border-gray-300 mb-2"
            />
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="p-3 rounded-md shadow-sm border border-gray-300 mb-5"
            />
            <button className="bg-blue-600 text-white text-lg p-3 font-medium shadow-sm rounded-md flex justify-center items-center gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2">
              Create Account
            </button>
          </form>
        </div>
        <div className="hidden lg:flex relative lg:w-1/2 xl:w-3/5">
          <Image src="/background.jpg" alt="background" fill={true} />
        </div>
      </div>
    </Page>
  );
};

export default Signup;
