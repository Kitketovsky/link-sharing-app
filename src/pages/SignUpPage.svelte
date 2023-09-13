<script lang="ts">
  import Input from "../components/Input.svelte";
  import EmailIcon from "../assets/images/icon-email.svelte";
  import PasswordIcon from "../assets/images/icon-password.svelte";
  import { Link, navigate } from "svelte-routing";
  import Button from "../components/Button.svelte";
  import { supabase } from "../lib/db/supabase";

  import type { AuthError } from "@supabase/supabase-js";
  import { isLoading, session } from "../stores";
  import AuthFormLayout from "../layouts/AuthFormLayout.svelte";
  import CenteredLayout from "../layouts/CenteredLayout.svelte";

  let email = "";
  let password = "";
  let confirm = "";

  let signUpError: AuthError | null = null;
  let isSuccess = false;
  let isSigningUp = false;

  $: {
    if (!$isLoading && $session) {
      navigate("/links");
    }
  }

  $: form = {
    email,
    password,
    confirm,
  };

  let isPasswordsEqual = true;

  async function onSubmit(event: SubmitEvent) {
    isPasswordsEqual = password === confirm;
    isSigningUp = true;

    if (
      !isPasswordsEqual ||
      !(event.target as HTMLFormElement).checkValidity()
    ) {
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      signUpError = error;
      isSigningUp = false;
      return;
    }

    session.set(data.session);
    isSigningUp = false;
    isSuccess = true;
  }
</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<CenteredLayout>
  <AuthFormLayout on:submit={onSubmit}>
    <svelte:fragment slot="heading">Create account</svelte:fragment>
    <svelte:fragment slot="description"
      >Let’s get you started sharing your links!</svelte:fragment
    >

    <svelte:fragment slot="body">
      <Input
        label="Email address"
        id="email"
        bind:value={email}
        icon={EmailIcon}
        type="email"
        placeholder="e.g. alex@email.com"
        required
        disabled={isSigningUp}
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
        disabled={isSigningUp}
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
        disabled={isSigningUp}
      />

      <Button
        type="submit"
        label="Create new account"
        isDisabled={isSigningUp}
      />
    </svelte:fragment>

    <span slot="success"
      >{isSuccess ? "We send an email to confirm your identity" : ""}</span
    >

    <span slot="error">{signUpError ? signUpError.message : ""}</span>

    <svelte:fragment slot="footer">
      <span>Already have an account?</span>
      <Link to="/login">Login</Link>
    </svelte:fragment>
  </AuthFormLayout>
</CenteredLayout>
