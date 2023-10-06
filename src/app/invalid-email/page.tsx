"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const InvalidEmail = () => {
  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col gap-4 w-screen h-screen justify-center items-center">
      <p>You must use an Omni Federal email address.</p>
      <button
        onClick={handleSignOut}
        className="bg-blue-600 text-white rounded-md shadow-sm px-3 py-1.5"
      >
        Sign Out
      </button>
    </div>
  );
};

export default InvalidEmail;
