<script lang="ts">
  import { profile } from "../stores";

  export let name: string = "";
  export let surname: string = "";

  $: {
    name = name || $profile.name;
    surname = surname || $profile.name;
  }

  $: fullname = `${name} ${surname}`.trim();
</script>

<div class="info">
  {#if fullname}
    <span class="heading-s fullname">{fullname}</span>
  {:else}
    <div class="skeleton skeleton-fullname"></div>
  {/if}

  {#if $profile.email}
    <span class="email">{$profile.email || ""}</span>
  {/if}
</div>

<style>
  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 3rem;

    & .email {
      color: var(--grey);
    }
  }

  .skeleton-fullname {
    height: 1.2rem;
    width: 60%;
    margin: 0 auto;
    border-radius: 8px;
  }
</style>
