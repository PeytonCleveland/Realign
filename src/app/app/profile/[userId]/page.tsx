import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useParams } from "next/navigation";
import { Page } from "@/components";

const Profile = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { userId } = useParams();
  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId);

  if (!profiles || !profiles[0]) return null;

  return <Page>{profiles[0].full_name}</Page>;
};

export default Profile;
