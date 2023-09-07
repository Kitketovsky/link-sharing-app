<script lang="ts">
  import { navigate } from "svelte-routing";
  import SmallLogoIcon from "./../assets/images/logo-devlinks-small.svg";
  import LargeLogoIcon from "./../assets/images/logo-devlinks-large.svg";
  import Button from "./Button.svelte";
  import TabLink from "./TabLink.svelte";

  import LinkIcon from "./../assets/images/icon-link.svelte";
  import ProfileIcon from "./../assets/images/icon-profile-details-header.svelte";
  import { pathname } from "../stores";

  $: isPreviewPage = $pathname === "/preview";
</script>

{#if isPreviewPage}
  <nav>
    <Button
      label="Back to Editor"
      mode="secondary"
      on:click={() => navigate("/links")}
    />
    <Button label="Share Link" />
  </nav>
{:else}
  <nav>
    <div>
      <img src={LargeLogoIcon} alt="Logo Icon" />
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
    />
  </nav>
{/if}

<style>
  nav {
    margin: 1.5rem;
    padding: 1rem 1rem 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1.5rem;
  }

  .tabs {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
</style>
