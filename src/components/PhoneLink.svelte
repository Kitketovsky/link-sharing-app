<script lang="ts">
  import type { IOptions } from "../conts/options";
  import ArrowRightIcon from "./../assets/images/icon-arrow-right.svelte";

  export let link: {
    id: string;
    url: string;
    color: string;
    icon: IOptions[number]["icon"];
    name: string;
  };

  function openLink() {
    try {
      new URL(link.url);
    } catch (error) {
      // TODO: show some popup with the error that it is invalid URL
      return;
    }

    const anchor = document.createElement("a");

    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.click();
    anchor.remove();
  }
</script>

<div
  class="phone-link body-s"
  on:click={openLink}
  tabindex="0"
  role="link"
  on:keydown={(event) => {
    if (event.key === "Enter") {
      openLink();
    }
  }}
  style="background-color: {link.color}; color: {link.id === 'frontendmentor'
    ? 'black'
    : 'white'}; box-shadow: 0px 2px 5px {link.id === 'frontendmentor'
    ? 'var(--purple)'
    : link.color}"
  data-fill={link.id !== "frontendmentor" && link.id !== "devto"}
  data-arrow={link.id === "frontendmentor"}
>
  <div class="phone-link-info">
    <svelte:component this={link.icon} />
    <span>
      {link.name}
    </span>
  </div>

  <ArrowRightIcon />
</div>

<style>
  .phone-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: var(--white);
    cursor: pointer;

    & + & {
      margin-top: 1rem;
    }

    &[data-fill="true"] path {
      fill: var(--white);
    }

    & .phone-link-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      line-height: 100%;
    }

    &[data-arrow="true"] svg:last-of-type path {
      fill: var(--grey);
    }
  }
</style>
