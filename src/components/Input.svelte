<script lang="ts">
  export let icon: ConstructorOfATypedSvelteComponent | null = null;
  export let placeholder: string;
  export let label: string | null = null;

  export let value: string | number | null;

  export let errorMessage: string | null = null;

  type ValidityProps = Partial<{ [key in keyof ValidityState]: string }>;

  let initialValidity: ValidityProps = {
    tooShort: "Too weak",
    tooLong: "Too long",
    valueMissing: "Can't be empty",
    badInput: "Bad input",
    typeMismatch: "Type mismatch",
  };

  export let validity: ValidityProps = {};

  let finalValidity: ValidityProps = {
    ...initialValidity,
    ...validity,
  };

  let isCheckValidity = false;
  let isValid = true;

  function onInputInvalid(event: Event) {
    event.preventDefault();

    const inputElement = event.target as HTMLInputElement;
    const formElement = (event.target as HTMLInputElement).form;

    if (!formElement) return;

    isCheckValidity = formElement.contains(inputElement);
    isValid = inputElement.validity.valid && !errorMessage;

    if (!isValid) {
      for (let [errorType, customErrorMessage] of Object.entries(
        finalValidity,
      )) {
        const isError = inputElement.validity[errorType as keyof ValidityState];

        if (isError) {
          errorMessage = customErrorMessage || "Invalid input";
        }
      }
    }
  }

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
  {#if label}
    <label class="body-s" for={label}>{label}</label>
  {/if}
  <div class="input-wrapper">
    {#if icon}
      <div class="icon">
        <svelte:component this={icon} />
      </div>
    {/if}
    <input
      class="default body-m"
      {placeholder}
      {value}
      formnovalidate={true}
      on:input={handleInput}
      on:input
      on:keydown
      on:invalid={onInputInvalid}
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

  .wrapper[data-valid="false"] {
    & label {
      color: var(--red);
    }

    & input {
      outline: 1px solid var(--red);
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
