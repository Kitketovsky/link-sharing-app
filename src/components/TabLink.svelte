<script lang="ts">
  import { navigate } from "svelte-routing";
  import { pathname } from "../stores";

  export let to: string;
  export let label: string;

  $: isActive = $pathname === to;

  function onTabLinkClick() {
    navigate(to);
  }
</script>

<button on:click={onTabLinkClick} class="heading-s" data-active={isActive}>
  <div>
    <slot />
  </div>
  <span>{label}</span>
</button>

<style>
  button {
    border-radius: 0.5rem;
    column-gap: 0.5rem;
    color: var(--grey);
    padding: 11px 27px;

    &:hover {
      color: var(--purple);
    }

    &:hover path {
      fill: var(--purple);
    }

    & span {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }

  button[data-active="true"] {
    background-color: var(--light-purple);
  }

  div,
  button {
    display: flex;
    align-items: center;
  }
</style>
