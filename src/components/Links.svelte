<script lang="ts">
  import options from "../conts/options";
  import PhoneLink from "./PhoneLink.svelte";
  import { profile } from "../stores";
  import type { ILink } from "../types/ILink";

  export let links: ILink[] | null = null;

  $: {
    links = $profile.links.length ? $profile.links : links;
  }

  $: phoneLinks = links
    ? links.slice().map(({ platform, url }) => {
        const { color, icon, name } = options.find(
          (option) => option.id === platform,
        )!;

        return { id: platform, url, color, icon, name };
      })
    : [];
</script>

<div class="wrapper">
  {#if phoneLinks.length}
    {#each phoneLinks as link (link.id)}
      <PhoneLink {link} />
    {/each}
  {:else}
    {#each new Array(5).fill(null) as skeleton, i (i)}
      <div class="skeleton skeleton-link"></div>
    {/each}
  {/if}
</div>

<style>
  .wrapper {
    width: 100%;
    padding: 0.5rem;
  }

  .skeleton-link {
    width: 100%;
    height: 44px;
    border-radius: 8px;

    & + & {
      margin-top: 1rem;
    }
  }
</style>
