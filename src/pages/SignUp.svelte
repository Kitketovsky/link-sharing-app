<script lang="ts">
  import Button from "../lib/Button.svelte";
  import Input from "../lib/Input.svelte";

  import LargeLogoIcon from "./../assets/images/logo-devlinks-large.svg";
  import EmailIcon from "./../assets/images/icon-email.svg";
  import PasswordIcon from "./../assets/images/icon-password.svg";
  import { Link } from "svelte-routing";

  let email = "";
  let password = "";
  let confirm = "";

  $: form = {
    email,
    password,
    confirm,
  };

  let isPasswordsEqual = true;

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();

    isPasswordsEqual = password === confirm;

    if (
      !isPasswordsEqual ||
      !(event.target as HTMLFormElement).checkValidity()
    ) {
      return;
    }

    // Do your logic with the form
  }
</script>

<div class="wrapper">
  <div class="logo-wrapper">
    <img src={LargeLogoIcon} alt="Logo" />
  </div>
  <form novalidate on:submit={onSubmit}>
    <div class="form-header">
      <h1 class="heading-m">Create account</h1>
      <span class="body-m">Let’s get you started sharing your links!</span>
    </div>

    <div class="form-body">
      <Input
        label="Email address"
        id="email"
        bind:value={email}
        icon={EmailIcon}
        type="email"
        placeholder="e.g. alex@email.com"
        required
      />

      <Input
        id="password"
        label="Create password"
        bind:value={password}
        icon={PasswordIcon}
        type="password"
        placeholder="At least 8 characters"
        minlength="8"
        required
      />

      <Input
        id="confirm-password"
        label="Confirm password"
        bind:value={confirm}
        icon={PasswordIcon}
        type="password"
        placeholder="At least 8 characters"
        minlength="8"
        required
        errorMessage={isPasswordsEqual ? null : "Not equal"}
      />

      <Button type="submit" label="Create new account" />
    </div>

    <div class="form-footer">
      <span>Already have an account?</span>
      <Link to="/login">Login</Link>
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

  form {
    padding: 40px;
  }
</style>
