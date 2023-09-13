<script lang="ts">
  import { navigate } from "svelte-routing";
  import SmallLogoIcon from "./../assets/images/logo-devlinks-small.svelte";
  import LargeLogoIcon from "./../assets/images/logo-devlinks-large.svelte";
  import Button from "./Button.svelte";
  import TabLink from "./TabLink.svelte";

  import LinkIcon from "./../assets/images/icon-link.svelte";
  import LogoutIcon from "./../assets/images/logout.svelte";
  import ClipboardIcon from "./../assets/images/icon-link-copied-to-clipboard.svelte";
  import ProfileIcon from "./../assets/images/icon-profile-details-header.svelte";
  import { pathname, session } from "../stores";

  import PreviewIcon from "./../assets/images/icon-preview-header.svelte";
  import { supabase } from "../lib/db/supabase";
  import { addToast } from "../lib/toast";

  $: isPreviewPage = $pathname === "/preview";

  async function onShareLink() {
    const result = await navigator.permissions.query({
      // @ts-ignore
      name: "clipboard-write",
    });

    if (result.state !== "granted") {
      // TOOD: show a modal with the link as you can not write to clipboard
      return;
    }

    const domain = import.meta.env.DEV
      ? import.meta.env.VITE_DOMAIN_DEV
      : import.meta.env.VITE_DOMAIN_PROD;

    const sharableLink = `${domain}/l/${$session?.user.id}`;

    await navigator.clipboard.writeText(sharableLink);

    addToast({
      text: "The link has been copied to your clipboard!",
      icon: ClipboardIcon,
    });
  }

  async function onLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }
</script>

<nav data-preview={isPreviewPage}>
  {#if isPreviewPage}
    <Button
      label="Back to Editor"
      mode="secondary"
      on:click={() => navigate("/links")}
    />
    <Button label="Share Link" on:click={onShareLink} />
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

    <div>
      <Button
        label="Preview"
        mode="secondary"
        on:click={() => navigate("/preview")}
      >
        <PreviewIcon />
      </Button>
    </div>
  {/if}

  <div class="logout-wrapper">
    <Button label="Log Out" mode="secondary" on:click={onLogout}>
      <LogoutIcon />
    </Button>
  </div>
</nav>

<style>
  .logout-wrapper {
    position: absolute;
    top: calc(100vh - 40px);
    transform: translateY(-100%);
    left: -5px;
  }
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

    & .logout-wrapper {
      left: calc(-1.5rem - 5px);
      top: calc(100vh - 40px - 1.5rem);
    }

    @media screen and (max-width: 768px) {
      margin: 0;
      box-shadow: none;

      & .logout-wrapper {
        left: -5px;
      }
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
