<script lang="ts">
  import Button from "../components/Button.svelte";
  import { profile, remoteData } from "../stores";

  export let ref: HTMLFormElement;
  export let isDisabled = false;

  $: isFormTheSame =
    $profile.name === $remoteData?.name &&
    $profile.surname === $remoteData.surname &&
    $profile.email === $remoteData.email &&
    $profile.links.length === $remoteData.links.length &&
    $profile.links.every((profileLink) => {
      const remoteLink = $remoteData?.links.find(
        (remoteLink) => remoteLink.id === profileLink.id,
      );

      return (
        remoteLink?.platform === profileLink.platform &&
        remoteLink.url === profileLink.url
      );
    }) &&
    $profile.avatar === $remoteData.avatar;
</script>

<form novalidate bind:this={ref}>
  <div class="header">
    <slot name="heading" />
    <slot name="description" class="body-m" />
  </div>

  <div class="body">
    <slot />
  </div>

  <div class="footer">
    <Button
      label="Save"
      type="button"
      isDisabled={isDisabled || isFormTheSame}
      on:click
    />
  </div>
</form>

<style>
  form {
    width: 60%;
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }

  .header :global(h1) {
    margin-bottom: 0.5rem;
  }

  .body {
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    flex-grow: 1;
  }

  .footer {
    margin-top: auto;
    display: flex;
    justify-content: right;
  }
</style>
