<script lang="ts">
  import { SvelteComponent } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  export let isDisabled = false;
  export let label: string = "";
  export let mode: "primary" | "secondary" = "primary";
  export let type: HTMLButtonAttributes["type"] = "button";
  export let isFullWidth = false;
</script>

<button
  disabled={isDisabled}
  {type}
  class="heading-s"
  data-mode={mode}
  style={`width: ${isFullWidth ? "100%" : "initial"}`}
  on:click
>
  {#if $$slots.default}
    <span class="icon">
      <slot />
    </span>
  {/if}
  <span>
    {label}
  </span>
</button>

<style>
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    & + span {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  button {
    border-radius: 8px;
    padding: 11px 27px;
    background-color: var(--purple);
    color: var(--white);

    & .icon svg {
      width: 18px;
      height: 18px;
    }

    &:has(.icon) {
      @media screen and (max-width: 768px) {
        padding: 11px 16px;
      }
    }

    &:hover {
      background-color: var(--purple-hover);
    }

    &:disabled {
      opacity: 0.25;
    }

    &[data-mode="secondary"] {
      color: var(--purple);
      border: 1px solid var(--purple);
      background-color: var(--white);

      &:active,
      &:hover {
        background-color: var(--light-purple);
      }

      &:disabled {
        opacity: 0.25;
      }
    }
  }
</style>
