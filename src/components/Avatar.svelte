<script lang="ts">
  import clsx from "clsx";
  import { profile } from "../stores";

  let previewDataURI: string | null = null;

  $: {
    if ($profile.avatar instanceof File) {
      const reader = new FileReader();

      reader.readAsDataURL($profile.avatar);

      reader.onload = function (e) {
        previewDataURI = e.target?.result as string;
      };
    }

    if (typeof $profile.avatar === "string") {
      try {
        new URL($profile.avatar);
        previewDataURI = $profile.avatar;
      } catch (error) {
        console.log(error);
      }
    }
  }

  export let alt = "Avatar";
  export let size = 104;
</script>

<div
  style="width: {size}; height: {size}"
  class={clsx(previewDataURI && "withImage", "wrapper")}
>
  {#if previewDataURI}
    <img src={previewDataURI} {alt} />
  {:else}
    <div style="width: {size}px; height: {size}px" class="skeleton"></div>
  {/if}
</div>

<style>
  .wrapper {
    width: 104px;
    height: 104px;
    border-radius: 50%;
    overflow: hidden;
    margin: 1.5rem 0;
  }

  div.withImage {
    outline: 6px solid var(--purple);
  }

  img {
    width: 100%;
    height: auto;
  }
</style>
