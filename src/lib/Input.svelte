<script lang="ts">
  let value = "";

  function onInput(event: Event) {
    value = (event.target as HTMLInputElement).value;
  }

  export let type: "text" | "url" = "text";
  export let icon: string | null = null;
  export let placeholder: string;
</script>

<div class="wrapper">
  {#if icon}
    <div class="icon">
      <img src={icon} alt="" />
    </div>
  {/if}
  <input {type} {value} {placeholder} class="default" on:input={onInput} />
</div>

<style>
  .wrapper {
    position: relative;
  }

  input {
    width: 100%;
    font-family: inherit;
  }

  .icon {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translate(16px, -50%);
    height: 16px;
    width: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
