<script lang="ts">
  import { profile } from "../stores";

  let previewDataURI: string | null = null;

  export let avatar: File | string | null = null;

  $: {
    if (!avatar) {
      avatar = $profile.avatar;
    }
  }

  $: {
    if (avatar instanceof File) {
      const reader = new FileReader();

      reader.readAsDataURL(avatar);

      reader.onload = function (e) {
        previewDataURI = e.target?.result as string;
      };
    }

    if (typeof avatar === "string") {
      try {
        new URL(avatar);
        previewDataURI = avatar;
      } catch (error) {
        console.log(error);
      }
    }
  }

  export let alt = "Avatar";
  export let size = 104;
</script>

<div class="wrapper">
  {#if previewDataURI}
    <img src={previewDataURI} {alt} />
  {:else}
    <div style="width: {size}px; height: {size}px" class="skeleton"></div>
  {/if}
</div>

<style>
  .wrapper {
    margin: 1.5rem 0;
    border-radius: 50%;
    overflow: hidden;

    &:has(img) {
      border: 6px solid var(--purple);
    }
  }

  img {
    display: block;
    width: 104px;
    height: 104px;
    border-radius: 50%;
  }
</style>
