import type { ILink } from "./types/ILink";
import { get, writable } from "svelte/store";
import options from "./conts/options";
import { v4 as uuidv4 } from "uuid";

import type { AuthSession } from "@supabase/supabase-js";

export const remoteData = writable<{
  name: string;
  surname: string;
  avatar: File | string | null;
  email: string;
  links: ILink[];
} | null>(null);

function createProfileStore() {
  const {
    subscribe,
    update,
    set: setStore,
  } = writable<{
    name: string;
    surname: string;
    avatar: File | string | null;
    email: string;
    links: ILink[];
  }>({
    name: "",
    surname: "",
    avatar: null,
    email: "",
    links: [],
  });

  return {
    subscribe,

    set: (arg: any) => {
      if (!get(remoteData)) {
        remoteData.set({
          ...arg,
          links: [...arg.links].slice(),
        });
      }

      setStore(arg);
    },

    remoteData,

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
            {
              platform: firstOne.id,
              url: "",
              id: uuidv4(),
              position: prev.links.length + 1,
            },
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
        const updatedLinks = prev.links.map((link) => {
          if (link.id === linkId) {
            const updated = {
              ...link,
            };

            if (event) {
              updated.url = (event.target as HTMLInputElement).value;
            } else {
              updated.platform = platform;
            }

            return updated;
          }

          return link;
        });

        return {
          ...prev,
          links: updatedLinks,
        };
      }),
  };
}

export const pathname = writable(window.location.pathname);
export const session = writable<AuthSession | null>(null);
export const profile = createProfileStore();

export const isLoading = writable(true);
