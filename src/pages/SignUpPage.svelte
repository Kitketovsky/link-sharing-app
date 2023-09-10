<script lang="ts">
  import Input from "../components/Input.svelte";
  import EmailIcon from "../assets/images/icon-email.svelte";
  import PasswordIcon from "../assets/images/icon-password.svelte";
  import { Link } from "svelte-routing";
  import Button from "../components/Button.svelte";
  import { supabase } from "../lib/supabase";

  import type { AuthError } from "@supabase/supabase-js";
  import { session } from "../stores";
  import AuthFormLayout from "../layouts/AuthFormLayout.svelte";

  let email = "";
  let password = "";
  let confirm = "";

  let signUpError: AuthError | null = null;
  let isSuccess = false;
  let isLoading = false;

  $: form = {
    email,
    password,
    confirm,
  };

  let isPasswordsEqual = true;

  async function onSubmit(event: SubmitEvent) {
    isPasswordsEqual = password === confirm;
    isLoading = true;

    if (
      !isPasswordsEqual ||
      !(event.target as HTMLFormElement).checkValidity()
    ) {
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { emailRedirectTo: "http://localhost:5137/links" },
    });

    if (error) {
      signUpError = error;
      isLoading = false;
      return;
    }

    session.set(data.session);
    isLoading = false;
  }
</script>

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
      disabled={isLoading}
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
      disabled={isLoading}
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
      disabled={isLoading}
    />

    <Button type="submit" label="Create new account" isDisabled={isLoading} />
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
