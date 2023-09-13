<script>
  import Loading from "../components/Loading.svelte";
  import { isLoading } from "../stores";
</script>

<main>
  {#if $isLoading}
    <Loading />
  {:else}
    <slot />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
