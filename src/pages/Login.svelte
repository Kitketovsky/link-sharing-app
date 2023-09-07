<script lang="ts">
  import Button from "../lib/Button.svelte";
  import Input from "../lib/Input.svelte";

  import LargeLogoIcon from "./../assets/images/logo-devlinks-large.svelte";
  import EmailIcon from "./../assets/images/icon-email.svelte";
  import PasswordIcon from "./../assets/images/icon-password.svelte";
  import { Link } from "svelte-routing";

  let email = "";
  let password = "";

  $: form = {
    email,
    password,
  };

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    //   console.log((event.target as HTMLFormElement).checkValidity());
  }
</script>

<div class="wrapper">
  <div class="logo-wrapper">
    <svelte:component this={LargeLogoIcon} />
  </div>
  <form novalidate on:submit={onSubmit}>
    <div class="form-header">
      <h1 class="heading-m">Login</h1>
      <span class="body-m">Add your details below to get back into the app</span
      >
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
        label="Password"
        bind:value={password}
        icon={PasswordIcon}
        type="password"
        placeholder="Enter your password"
        minlength="8"
        required
      />

      <Button type="submit" label="Login" />
    </div>

    <div class="form-footer">
      <span>Don't have an account?</span>
      <Link to="/signup">Create account</Link>
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
