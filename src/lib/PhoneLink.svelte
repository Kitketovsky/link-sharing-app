<script lang="ts">
  import type { IOptions } from "../conts/options";
  import ArrowRightIcon from "./../assets/images/icon-arrow-right.svelte";

  export let link: IOptions[number];
</script>

<div
  class="phone-link body-s"
  style="background-color: {link.color}; color: {link.id === 'frontend-mentor'
    ? 'black'
    : 'white'}; box-shadow: 0px 2px 5px {link.id === 'frontend-mentor'
    ? 'var(--purple)'
    : link.color}"
  data-fill={link.id !== "frontend-mentor" && link.id !== "dev-to"}
  data-arrow={link.id === "frontend-mentor"}
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
