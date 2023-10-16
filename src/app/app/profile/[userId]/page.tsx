import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Page } from "@/components";

const Profile = async ({ params }: { params: { userId: string } }) => {
  const supabase = createServerComponentClient({
    cookies,
  });

  console.log("params: ", params);

  const { userId } = params;
  console.log("userId: ", userId);
  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId);

  console.log("profiles: ", profiles);

  if (!profiles || !profiles[0]) return null;

  return <Page>{profiles[0].full_name}</Page>;
};

export default Profile;
