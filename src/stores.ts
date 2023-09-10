import { writable } from "svelte/store";
import options from "./conts/options";
import { v4 as uuidv4 } from "uuid";

import type { AuthSession } from "@supabase/supabase-js";

function createProfileStore() {
  const { subscribe, update, set } = writable<{
    name: string;
    surname: string;
    avatar: File | string | null;
    email: string | null;
    links: {
      platform: string;
      url: string;
      id: string;
    }[];
  }>({
    name: "",
    surname: "",
    avatar: null,
    email: null,
    links: [],
  });

  return {
    subscribe,

    set,

    addNewLink: () =>
      update((prev) => {
        const firstOne = options
          .slice()
          .filter(
            (option) => !prev.links.find((link) => link.platform === option.id),
          )
          .at(0);

        if (!firstOne) return prev;

        return {
          ...prev,
          links: [
            ...prev.links,
            { platform: firstOne.id, url: "", id: uuidv4() },
          ],
        };
      }),

    removeLink: (id: string) =>
      update((prev) => ({
        ...prev,
        links: prev.links.filter((link) => link.id !== id),
      })),

    changeLink: (linkId: string, platform: string, event?: Event) =>
      update((prev) => {
        const targetLink = prev.links.find((link) => link.id === linkId);

        if (!targetLink) return prev;

        if (event) {
          targetLink.url = (event.target as HTMLInputElement).value;
        } else {
          targetLink.platform = platform;
        }

        return {
          ...prev,
          links: prev.links,
        };
      }),
  };
}

export const pathname = writable(window.location.pathname);
export const session = writable<AuthSession | null>(null);
export const profile = createProfileStore();
