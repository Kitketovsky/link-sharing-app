<script lang="ts">
  import { profile } from "../stores";
  import options from "../conts/options";
  import PhoneMockup from "./../assets/images/illustration-phone-mockup.svg";
  import PhoneLink from "./PhoneLink.svelte";

  $: phoneLinks = $profile.links.slice().map(({ platform, url }) => {
    const { color, icon, name } = options.find(
      (option) => option.id === platform,
    )!;
    return { id: platform, url, color, icon, name };
  });
</script>

<div class="phone-wrapper">
  <div class="fixed">
    <img src={PhoneMockup} alt="Phone Mockup" />
    <div class="phone-links">
      {#each phoneLinks as link (link.id)}
        <PhoneLink {link} />
      {/each}
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

    & .fixed {
      position: relative;
      height: fit-content;
    }
  }

  .phone-links {
    position: absolute;
    padding: 10px 34.5px;
    top: calc(30% + 77px);
    width: 100%;
    max-height: 320px;
    overflow: auto;

    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  .phone-links::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
</style>
