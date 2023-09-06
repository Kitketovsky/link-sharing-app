<script lang="ts">
  import { onMount } from "svelte";

  export let icon: string | null = null;
  export let placeholder: string;
  export let value: string | number | null =
    $$restProps.type === "text" ? "" : null;

  export let id: string;
  export let label: string;

  let inputRef: HTMLInputElement;

  let isCheckValidity = false;
  let isValid = true;
  let errorMessage: string | null = null;

  export let validity: Partial<{ [key in keyof ValidityState]: string }> = {
    tooShort: "Too weak",
    tooLong: "Too long",
    valueMissing: "Can't be empty",
    badInput: "Bad input",
    typeMismatch: "Type mismatch",
  };

  onMount(() => {
    function callback(event: SubmitEvent) {
      const formElement = event.target as HTMLFormElement;
      isCheckValidity = formElement.contains(inputRef);
      isValid = inputRef.validity.valid;

      if (!isValid) {
        for (let [errorType, customErrorMessage] of Object.entries(validity)) {
          const isError = inputRef.validity[errorType as keyof ValidityState];

          if (isError) {
            errorMessage = customErrorMessage || "Invalid input";
          }
        }
      }
    }

    document.addEventListener("submit", callback);

    return () => {
      document.removeEventListener("submit", callback);
    };
  });

  function handleInput(event: Event) {
    const { type, value: targetValue } = event.target as HTMLInputElement;

    if (isCheckValidity) {
      isCheckValidity = !isCheckValidity;
    }

    if (errorMessage) {
      errorMessage = null;
    }

    if (!isValid) {
      isValid = true;
    }

    if (type === "number") {
      value = targetValue === "" ? null : Number(targetValue);
    } else {
      value = targetValue;
    }
  }
</script>

<div class="wrapper" data-check={isCheckValidity} data-valid={isValid}>
  <label class="body-s" for={id}>{label}</label>
  <div class="input-wrapper">
    {#if icon}
      <div class="icon">
        <img src={icon} alt="Icon" />
      </div>
    {/if}
    <input
      class="default"
      {placeholder}
      {value}
      {id}
      formnovalidate
      aria-describedby={id}
      on:input={handleInput}
      bind:this={inputRef}
      {...$$restProps}
    />
    {#if errorMessage}
      <span class="body-s error-message">{errorMessage}</span>
    {/if}
  </div>
</div>

<style>
  .input-wrapper {
    position: relative;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  input {
    width: 100%;
    font-family: inherit;

    &:focus,
    &:active {
      outline: 1px solid var(--purple);
    }
  }

  .wrapper[data-check="true"] {
    & input:invalid {
      outline: 1px solid var(--red);
    }
  }

  .wrapper[data-valid="false"] {
    & label {
      color: var(--red);
    }
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

  .error-message {
    color: var(--red);
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-10px, -50%);
  }
</style>
