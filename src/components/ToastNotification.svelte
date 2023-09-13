<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let icon: typeof SvelteComponent<any, any, any> | undefined;
  export let text: string;
</script>

<div>
  {#if icon}
    <svelte:component this={icon} />
  {/if}
  <span>
    {text}
  </span>
</div>

<style>
  div {
    padding: 1rem 1.5rem;
    border-radius: 12px;
    background-color: var(--dark-grey);
    text-align: center;
    color: var(--white);
    display: flex;
    align-items: center;
    column-gap: 0.5rem;

    & + & {
      margin-top: 1rem;
    }
  }
</style>
