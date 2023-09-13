<script lang="ts">
  import { navigate } from "svelte-routing";
  import SmallLogoIcon from "./../assets/images/logo-devlinks-small.svelte";
  import LargeLogoIcon from "./../assets/images/logo-devlinks-large.svelte";
  import Button from "./Button.svelte";
  import TabLink from "./TabLink.svelte";

  import LinkIcon from "./../assets/images/icon-link.svelte";
  import ProfileIcon from "./../assets/images/icon-profile-details-header.svelte";
  import { pathname } from "../stores";

  import PreviewIcon from "./../assets/images/icon-preview-header.svelte";

  $: isPreviewPage = $pathname === "/preview";
</script>

<nav data-preview={isPreviewPage}>
  {#if isPreviewPage}
    <Button
      label="Back to Editor"
      mode="secondary"
      on:click={() => navigate("/links")}
    />
    <Button label="Share Link" />
  {:else}
    <div class="logo">
      <LargeLogoIcon />
      <SmallLogoIcon />
    </div>

    <div class="tabs">
      <TabLink label="Links" to="/links">
        <LinkIcon />
      </TabLink>

      <TabLink label="Profile Details" to="/profile">
        <ProfileIcon />
      </TabLink>
    </div>

    <Button
      label="Preview"
      mode="secondary"
      on:click={() => navigate("/preview")}
    >
      <PreviewIcon />
    </Button>
  {/if}
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    padding: 1.5rem 2.5rem 1.5rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1.5rem;
    background: var(--white);
    z-index: 999;
    box-shadow: 0px 5px 32px
      color-mix(in srgb, var(--purple-hover), transparent 35%);

    @media screen and (max-width: 768px) {
      padding: 1rem 1rem 1rem 1.5rem;
    }
  }

  nav[data-preview="true"] {
    margin: 1.5rem;
    border-radius: 12px;

    @media screen and (max-width: 768px) {
      margin: 0;
      box-shadow: none;
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }

  .logo {
    & > *:first-child {
      display: block;

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    @media screen and (max-width: 768px) {
      width: 74px;
      height: 42px;
      display: flex;
      align-items: center;
    }

    & > *:last-child {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
      }
    }
  }
</style>
