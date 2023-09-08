<script lang="ts">
  import Dropdown from "./Dropdown.svelte";
  import Input from "./Input.svelte";
  import LinkIcon from "./../assets/images/icon-link.svelte";
  import type { IOptions } from "../conts/options";

  export let number: number | null = null;
  export let options: IOptions;
  export let onRemoveLink: (id: string) => void;
  export let link: { id: string; platform: string; url: string };

  export let onSelectChange: (optionId: string) => void;
</script>

<div class="wrapper">
  <div class="header">
    <span>Link {number}</span>
    <button
      type="button"
      class="body-m text-grey"
      on:click={() => onRemoveLink(link.id)}>Remove</button
    >
  </div>
  <Dropdown {options} bind:value={link.platform} {onSelectChange} />
  <Input
    type="url"
    label="Link"
    placeholder="e.g. https://service.com/yourname"
    icon={LinkIcon}
    value={link.url}
    on:input
    validity={{ typeMismatch: "Please check the URL" }}
    required
  />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--grey);

    & span {
      font-weight: 600;
    }

    & button {
      border-radius: 0.5rem;
      padding: 0.25rem;
    }
  }
</style>
