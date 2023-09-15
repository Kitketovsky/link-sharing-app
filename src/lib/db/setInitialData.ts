import { isLoading, profile } from "../../stores";
import { loadInitialData } from "./loadInitialData";
import { supabase } from "./supabase";

export async function setInitialData() {
  try {
    isLoading.set(true);

    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      return null;
    }

    const userRemoteData = await loadInitialData(sessionData.session.user.id);

    if (userRemoteData) {
      profile.set(userRemoteData);
    }
  } finally {
    isLoading.set(false);
  }
}
