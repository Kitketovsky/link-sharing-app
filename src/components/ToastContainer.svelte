<script>
  import { toasts } from "../lib/toast";
  import ToastNotification from "./ToastNotification.svelte";
</script>

<div>
  {#if $toasts.length}
    {#each $toasts as { text, id, icon } (id)}
      <ToastNotification {text} {icon} />
    {/each}
  {/if}
</div>

<style>
  div {
    background-color: aliceblue;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, calc(-100% - 40px));
  }
</style>
