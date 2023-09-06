<script lang="ts">
  export let isDisabled = false;
  export let label = "";
  export let mode: "primary" | "secondary" = "primary";
</script>

<button disabled={isDisabled} class="heading-s" data-mode={mode}>{label}</button
>

<style>
  button {
    border-radius: 8px;
    padding: 11px 27px;
    background-color: var(--purple);
    color: var(--white);

    &:hover {
      background-color: var(--purple-hover);
    }

    &:disabled {
      opacity: 0.25;
    }

    &[data-mode="secondary"] {
      color: var(--purple);
      outline: 1px solid var(--purple);
      background-color: transparent;

      &:active,
      &:hover {
        background-color: var(--light-purple);
      }

      &:disabled {
        opacity: 0.25;
      }
    }
  }
</style>
