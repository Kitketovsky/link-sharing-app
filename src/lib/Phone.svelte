<script lang="ts">
  import { profile } from "../stores";
  import options from "../conts/options";
  import PhoneLink from "./PhoneLink.svelte";

  $: phoneLinks = $profile.links.slice().map(({ platform, url }) => {
    const { color, icon, name } = options.find(
      (option) => option.id === platform,
    )!;
    return { id: platform, url, color, icon, name };
  });

  let previewDataURI: string | null = null;

  $: {
    if ($profile.avatar) {
      const reader = new FileReader();

      reader.readAsDataURL($profile.avatar);

      reader.onload = function (e: ProgressEvent<FileReader>) {
        previewDataURI = e.target!.result as string;
      };
    }
  }

  $: fullname = `${$profile.name} ${$profile.surname}`.trim();
</script>

<div class="phone-wrapper">
  <div class="phone">
    <div class="overflow">
      <div class="avatar">
        {#if previewDataURI}
          <img src={previewDataURI} alt="Profile" />
        {:else}
          <div class="skeleton skeleton-image"></div>
        {/if}
      </div>
      <div class="info">
        {#if fullname}
          <span class="heading-s fullname">{fullname}</span>
        {:else}
          <div class="skeleton skeleton-fullname"></div>
        {/if}

        {#if $profile.email}
          <span class="email">{$profile.email || ""}</span>
        {:else}
          <div class="skeleton skeleton-email"></div>
        {/if}
      </div>
      <div class="phone-links">
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
    </div>
  </div>
</div>

<style>
  .phone-wrapper {
    position: relative;
    top: 1.2rem;
    display: flex;
    justify-content: center;
    width: 40%;
    min-width: 375px;

    & .phone {
      width: 308px;
      min-height: 632px;
      max-height: 632px;
      height: 100%;
      position: relative;
      background: url("./../assets/images/illustration-phone-mockup.svg") center
        center no-repeat;
    }
  }

  .skeleton {
    background-color: var(--grey);
    opacity: 15%;
  }

  .skeleton-image {
    width: 96px;
    height: 96px;
    border-radius: 50%;
  }

  .skeleton-fullname {
    height: 1.2rem;
    width: 60%;
    margin: 0 auto;
    border-radius: 8px;
  }

  .skeleton-email {
    height: 0.6rem;
    width: 45%;
    margin: 0 auto;
    border-radius: 8px;
  }

  .skeleton-link {
    width: 100%;
    height: 44px;
    border-radius: 8px;

    & + & {
      margin-top: 1rem;
    }
  }

  .overflow {
    height: calc(100% - 5rem);
    overflow-y: auto;
    margin: 2.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

  .avatar {
    margin: 2rem 0;
    & img {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      outline: 6px solid var(--purple);
    }
  }

  .info {
    display: flex;
    text-align: center;
    flex-direction: column;
    max-width: 268px;
    row-gap: 0.5rem;
    width: 100%;

    & .email {
      font-size: 0.9rem;
      color: var(--grey);
    }
  }

  .phone-links {
    margin-top: 3rem;
    width: 100%;
    padding: 0.5rem;
  }
</style>
