<script lang="ts">
  import Input from "../components/Input.svelte";
  import EmailIcon from "../assets/images/icon-email.svelte";
  import PasswordIcon from "../assets/images/icon-password.svelte";
  import { Link, navigate } from "svelte-routing";
  import AuthFormLayout from "../layouts/AuthFormLayout.svelte";
  import { AuthError } from "@supabase/supabase-js";
  import { isLoading, session } from "../stores";
  import Button from "../components/Button.svelte";
  import { supabase } from "../lib/db/supabase";
  import CenteredLayout from "../layouts/CenteredLayout.svelte";

  let email = "";
  let password = "";

  $: form = {
    email,
    password,
  };

  $: {
    if (!$isLoading && $session) {
      navigate("/links");
    }
  }

  let signInError: AuthError | null = null;
  let isSigningIn = false;

  async function onSubmit(event: SubmitEvent) {
    const isFormValid = (event.target as HTMLFormElement).checkValidity();

    if (!isFormValid) return;

    isSigningIn = true;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      signInError = error;
      isSigningIn = false;
      return;
    }

    session.set(data.session);
    isSigningIn = false;
    navigate("/links");
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<CenteredLayout>
  <AuthFormLayout on:submit={onSubmit}>
    <svelte:fragment slot="heading">Login</svelte:fragment>
    <svelte:fragment slot="description"
      >Add your details below to get back into the app</svelte:fragment
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
        disabled={isSigningIn}
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
        disabled={isSigningIn}
      />

      <Button type="submit" label="Login" isDisabled={isSigningIn} />
    </svelte:fragment>

    <span slot="error">{signInError ? signInError.message : ""}</span>

    <svelte:fragment slot="footer">
      <span>Don't have an account?</span>
      <Link to="/signup">Create account</Link>
    </svelte:fragment>
  </AuthFormLayout>
</CenteredLayout>
