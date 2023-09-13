import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";
import { v4 } from "uuid";

export const toasts = writable<
  { id: string; text: string; icon?: typeof SvelteComponent<any, any, any> }[]
>([]);

export function addToast({
  text,
  icon,
}: {
  text: string;
  icon?: typeof SvelteComponent<any, any, any>;
}) {
  const newToastId = v4();
  const newToast = { id: newToastId, text, icon };
  toasts.update((prev) => [newToast, ...prev]);

  setTimeout(() => {
    toasts.update((prev) => prev.filter((toast) => toast.id !== newToastId));
  }, 3000);
}
