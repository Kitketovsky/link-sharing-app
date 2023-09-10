<script lang="ts">
  import LargeLogoIcon from "../assets/images/logo-devlinks-large.svelte";
</script>

<div class="wrapper">
  <div class="logo-wrapper">
    <svelte:component this={LargeLogoIcon} />
  </div>
  <form novalidate on:submit|preventDefault>
    <div class="form-header">
      <h1 class="heading-m">
        <slot name="heading" />
      </h1>
      <span class="body-m">
        <slot name="description" />
      </span>
    </div>

    <div class="form-body">
      <slot name="body" />
    </div>

    <!-- Create error component -->
    <div class="message">
      {#if $$slots.error}
        <span class="error-message">
          <slot name="error" />
        </span>
      {/if}

      {#if $$slots.success}
        <span class="success-message">
          <slot name="success" />
        </span>
      {/if}
    </div>

    <div class="form-footer">
      <slot name="footer" />
    </div>
  </form>
</div>

<style>
  .wrapper {
    width: 100%;
    max-width: 470px;
  }

  .form-header {
    margin-bottom: 40px;

    & span {
      color: var(--grey);
    }
  }

  .form-body {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  .logo-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }

  .form-footer {
    margin-top: 24px;
    text-align: center;

    & span {
      color: var(--grey);
    }
  }

  .message {
    margin: 1rem 0;
    text-align: center;
  }

  .error-message {
    color: var(--red);
  }

  form {
    padding: 40px;
  }
</style>
