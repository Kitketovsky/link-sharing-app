<script>
  import Loading from "../components/Loading.svelte";
  import { isLoading, session } from "../stores";
</script>

<main>
  {#if $isLoading}
    <Loading />
  {/if}

  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
