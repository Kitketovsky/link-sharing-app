<script lang="ts">
  import { onMount } from "svelte";
  import { profile } from "../stores";
  import UploadIcon from "./../assets/images/icon-upload-image.svelte";

  let previewDataURI: string | null = null;
  export let file: File | string | null = null;
  let errorMessage: string | null = null;

  onMount(() => {
    if ($profile.avatar && $profile.avatar instanceof File) {
      const reader = new FileReader();

      reader.readAsDataURL($profile.avatar);

      reader.onload = function (e: ProgressEvent<FileReader>) {
        previewDataURI = e.target!.result as string;
      };
    }
  });

  $: {
    if ($profile.avatar && typeof $profile.avatar === "string") {
      previewDataURI = $profile.avatar;
    }
  }

  function onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    errorMessage = null;

    if (fileInput.files?.length) {
      let reader = new FileReader();

      reader.readAsDataURL(fileInput.files![0]);

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const dataURI = e.target!.result as string;

        const image = new Image();

        image.src = dataURI;

        image.onload = function () {
          // @ts-ignore
          const width = this.width;
          // @ts-ignore
          const height = this.height;

          if (width > 1024 || height > 1024) {
            errorMessage = "Image is bigger than expected";
          }

          image.remove();
        };

        // data uri, for preview
        previewDataURI = dataURI;
      };

      // binary, for uploading
      file = fileInput.files![0];
    }
  }
</script>

<div class="wrapper">
  <label for="file">
    {#if !previewDataURI}
      <div class="upload heading-s">
        <UploadIcon />
        <span>+ Upload Image</span>
      </div>
    {:else}
      <div class="upload change-image heading-s">
        <UploadIcon />
        <span>Change Image</span>
      </div>
    {/if}
    <input
      on:change={onFileChange}
      id="file"
      type="file"
      accept="image/png,image/jpeg"
    />
    {#if previewDataURI}
      <img src={previewDataURI} alt="Profile Preview" />
    {/if}
  </label>
  <div class="instructions text-grey">
    <span>Image must be below 1024x1024px.</span>
    <span>Use PNG or JPG format.</span>

    {#if errorMessage}
      <span>{errorMessage}</span>
    {/if}
  </div>
</div>

<style>
  input[type="file"] {
    display: none;
  }

  label {
    max-width: 193px;
    height: 193px;
    border-radius: 12px;
    background-color: var(--light-purple);
    color: var(--purple);
    width: 100%;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    & img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: auto;
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    column-gap: 1.5rem;
  }

  .upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.9rem;
    margin-left: auto;
    margin-right: auto;
  }

  .instructions {
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
  }

  label:hover .change-image {
    color: var(--white);
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 50%);
    justify-content: center;

    & path {
      fill: var(--white);
    }
  }
</style>
