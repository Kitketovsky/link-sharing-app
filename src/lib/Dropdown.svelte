<script lang="ts">
  import {} from "svelte/animate";
  import ChevronDown from "./../assets/images/icon-chevron-down.svg";

  let options = [
    {
      id: 1,
      name: "Option 1",
    },
    {
      id: 2,
      name: "Option 2",
    },
    {
      id: 3,
      name: "Option 3",
    },
  ];

  let current = options.at(0)?.id;
  let isOpen = false;

  // $$props - get access to all props but it's not recommended

  $: currentName = options.find(({ id }) => id === current)?.name;
</script>

<div class="wrapper">
  <div
    class="current default"
    on:click={() => {
      isOpen = !isOpen;
    }}
    role="button"
    tabindex="0"
    data-open={isOpen}
    on:keydown={(event) => {
      if (event.key === "Enter") {
        isOpen = !isOpen;
      }
    }}
  >
    <span>
      {currentName}
    </span>
    <img src={ChevronDown} alt="Chevron Icon" />
  </div>

  {#if isOpen}
    <div class="options">
      {#each options as { id, name } (id)}
        <div
          on:click={() => {
            current = id;
            isOpen = false;
          }}
          tabindex="0"
          role="button"
          on:keydown={(event) => {
            if (event.key === "Enter") {
              isOpen = false;
              current = id;
            }
          }}
          class="option"
        >
          <span>{name}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .current {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & img {
      transition: transform 0.2s ease-in-out;
    }

    &[data-open="true"] img {
      transform: rotate(-180deg);
    }
  }

  .wrapper {
    position: relative;
  }

  .options {
    padding: 12px 16px;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
    position: absolute;
    outline: 1px solid var(--borders);
    width: 100%;
  }

  .option:focus,
  .option:hover {
    outline: none;
    color: var(--purple);
  }

  .option + .option {
    margin-top: 24px;
  }
</style>
