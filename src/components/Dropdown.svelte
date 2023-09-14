<script lang="ts">
  import ChevronDown from "./../assets/images/icon-chevron-down.svg";
  import type { IOptions } from "../conts/options";
  import { onMount } from "svelte";

  export let options: IOptions = [];
  export let value: string;
  export let onSelectChange: (optionId: string) => void;

  let isOpen = false;
  let current = options.at(0)?.id;

  let wrapperRef: HTMLDivElement;

  $: selected = options.find(({ id }) => id === value);

  onMount(() => {
    function callback(event: Event) {
      if (!wrapperRef.contains(event.target as HTMLElement)) {
        isOpen = false;
      }
    }

    window.addEventListener("click", callback);

    return function () {
      window.removeEventListener("click", callback);
    };
  });
</script>

<div class="wrapper body-m" bind:this={wrapperRef}>
  <label for="platform" class="body-s">Platform</label>
  <div
    class="selected-wrapper default"
    on:click={() => {
      isOpen = !isOpen;
    }}
    role="button"
    id="platform"
    tabindex="0"
    data-open={isOpen}
    on:keydown={(event) => {
      if (event.key === "Enter") {
        isOpen = !isOpen;
      }
    }}
  >
    <div class="selected">
      <svelte:component this={selected?.icon} />
      <span>
        {selected?.name}
      </span>
    </div>
    <img src={ChevronDown} alt="Chevron Icon" />
  </div>

  {#if isOpen}
    <div class="options">
      {#each options as { id, name, icon } (id)}
        <div
          on:click={() => {
            isOpen = false;
            current = id;
            onSelectChange(id);
          }}
          tabindex="0"
          role="button"
          on:keydown={(event) => {
            if (event.key === "Enter") {
              isOpen = false;
              current = id;
              onSelectChange(id);
            }
          }}
          class="option"
        >
          <svelte:component this={icon} />
          <span>{name}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .selected-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:focus {
      border: 1px solid var(--purple);
    }

    & img {
      transition: transform 0.2s ease-in-out;
    }

    &[data-open="true"] img {
      transform: rotate(-180deg);
    }

    & .selected {
      display: flex;
      align-items: center;
      column-gap: 1rem;
    }
  }

  .wrapper {
    position: relative;

    & label {
      display: block;
      margin-bottom: 0.25rem;
      color: var(--dark-grey);
    }
  }

  .options {
    background-color: var(--white);

    border-radius: 8px;
    overflow: auto;
    margin-top: 10px;
    position: absolute;
    border: 1px solid var(--borders);
    width: 100%;
    z-index: 10;
    max-height: 300px;
  }

  .option {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    padding: 12px 16px;
    cursor: pointer;
  }

  .option:hover,
  .option[data-selected="true"] {
    color: var(--purple);
    & path {
      fill: var(--purple);
    }
  }

  .option:focus,
  .option:hover {
    border: none;
    color: var(--purple);
  }

  /* .option + .option {
    margin-top: 24px;
  } */
</style>
