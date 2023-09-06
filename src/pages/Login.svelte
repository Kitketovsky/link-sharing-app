<script>
  import Button from "../lib/Button.svelte";
  import Input from "../lib/Input.svelte";

  import LargeLogoIcon from "./../assets/images/logo-devlinks-large.svg";
</script>

<div class="wrapper">
  <div class="logo-wrapper">
    <img src={LargeLogoIcon} alt="Logo" />
  </div>
  <form>
    <div class="form-header">
      <h1 class="heading-m">Login</h1>
      <span class="body-m">Add your details below to get back into the app</span
      >
    </div>

    <div class="form-body">
      <Input placeholder="e.g. alex@email.com" />
      <Input placeholder="Enter your password" />
      <Button label="Login" />
    </div>

    <div class="form-footer">
      <span>Don't have an account?</span>
      <a href="/">Create account</a>
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
