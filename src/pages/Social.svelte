<script lang="ts">
  import { onMount } from "svelte";
  import Avatar from "../components/Avatar.svelte";
  import Links from "../components/Links.svelte";
  import PersonInfo from "../components/PersonInfo.svelte";
  import { loadInitialData } from "../lib/db/loadInitialData";

  import type { ILink } from "../types/ILink";
  import PreviewLayout from "../layouts/PreviewLayout.svelte";
  import clsx from "clsx";
  import Spinner from "../components/Spinner.svelte";
  export let id: string;

  let isLoading = true;

  let profile: {
    links: ILink[];
    avatar: string | null;
    email: string;
    name: string;
    surname: string;
  } | null = null;

  onMount(() => {
    if (id) {
      loadInitialData(id)
        .then((data) => {
          profile = data;
        })
        .finally(() => {
          isLoading = false;
        });
    }
  });
</script>

<svelte:head>
  {#if isLoading}
    <title>Loading...</title>
  {/if}

  {#if !isLoading && !profile}
    <title>No such link</title>
  {/if}

  {#if !isLoading && profile}
    <title>{`${profile.name || ""} ${profile.surname || ""}`.trim()}</title>
  {/if}
</svelte:head>

<PreviewLayout>
  <div class="wrapper">
    <div class={clsx({ card: true, loading: isLoading })}>
      {#if isLoading}
        <Spinner />
      {/if}

      {#if !isLoading && profile}
        <Avatar avatar={profile.avatar} />
        <PersonInfo name={profile.name} surname={profile.surname} />
        <Links links={profile.links} />
      {/if}

      {#if !isLoading && !profile}
        <span>Such profile doesn't exist</span>
      {/if}
    </div>
  </div>
</PreviewLayout>

<style>
  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading {
    height: 300px;
  }

  .card {
    max-width: 349px;
    width: 100%;
    border-radius: 24px;
    background-color: var(--white);
    padding: 48px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 5px 35px
      color-mix(in srgb, var(--purple-hover), transparent 35%);
  }

  :global(body[data-path="/social"])::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: var(--purple);
    height: 357px;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    z-index: -1;
  }
</style>
