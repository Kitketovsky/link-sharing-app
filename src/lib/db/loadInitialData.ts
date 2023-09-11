import type { TablesRow } from "../../types/db/utils";
import { supabase } from "./supabase";

export async function loadInitialData(id: TablesRow<"users">["id"]) {
  const { data: files } = await supabase.storage
    .from("images")
    .list(undefined, { search: `${id}` });

  let avatarUrl = null;

  if (files?.length) {
    const { data: avatarRemoteData } = supabase.storage
      .from("images")
      .getPublicUrl(`${files[0].name}`);

    avatarUrl = avatarRemoteData.publicUrl;
  }

  const { data: profileData } = await supabase
    .from("users")
    .select()
    .eq("id", id)
    .single();

  if (!profileData) return null;

  const { id: userId, created_at, ...rest } = profileData;

  return {
    ...rest,
    links: profileData.links || [],
    avatar: avatarUrl || null,
  };
}
