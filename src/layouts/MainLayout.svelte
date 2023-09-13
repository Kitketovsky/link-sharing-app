<script>
  import Loading from "../components/Loading.svelte";
  import ToastContainer from "../components/ToastContainer.svelte";
  import { isLoading } from "../stores";
</script>

<main>
  {#if $isLoading}
    <Loading />
  {/if}

  {#if !$isLoading}
    <slot />
    <ToastContainer />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
