<script>
  import Phone from "../components/Phone.svelte";
  import { pathname } from "../stores";
</script>

<div>
  {#if $pathname === "/links" || $pathname === "/profile"}
    <Phone />
  {/if}
  <slot />
</div>

<style>
  div {
    display: flex;
    height: 100%;
    column-gap: 1.5rem;
    padding: 2.5rem;
    flex-grow: 1;
  }
</style>
