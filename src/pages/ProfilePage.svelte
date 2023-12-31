<script lang="ts">
  import FileInput from "../components/FileInput.svelte";
  import FormLayout from "../layouts/FormLayout.svelte";
  import Input from "../components/Input.svelte";
  import { profile, session } from "../stores";
  import { supabase } from "../lib/db/supabase";
  import type { PostgrestError } from "@supabase/supabase-js";
  import ContentLayout from "../layouts/ContentLayout.svelte";
  import { addToast } from "../lib/toast";
  import ChangesSavedIcon from "./../assets/images/icon-changes-saved.svelte";

  let formRef: HTMLFormElement;

  let isUpdating = false;
  let supabaseError: PostgrestError | null = null;

  async function onSubmit() {
    isUpdating = true;

    try {
      if (!$session) return;

      const { name, surname, email, avatar } = $profile;

      if (avatar && avatar instanceof File) {
        const fileExt = avatar.name.split(".").at(-1) === "png" ? "png" : "jpg";

        const { error } = await supabase.storage
          .from("images")
          .upload($session.user.id, avatar, {
            contentType: `image/${fileExt}`,
            upsert: true,
          });

        if (error) {
          console.log("file", error);
        }
      }

      const { error } = await supabase
        .from("users")
        .update({ name, surname, email })
        .eq("id", $session.user.id);

      if (error) {
        supabaseError = error;
      }

      addToast({
        text: "Your changes have been successfully saved!",
        icon: ChangesSavedIcon,
      });
    } finally {
      isUpdating = false;
    }
  }
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<ContentLayout>
  <FormLayout bind:ref={formRef} on:click={onSubmit} isDisabled={isUpdating}>
    <h1 slot="heading">Preview Profile</h1>
    <span slot="description">
      Add your details to create a personal touch to your profile.
    </span>

    <div class="input-wrapper background">
      <label for="avatar">Profile picture</label>
      <FileInput />
    </div>

    <div class="background">
      <div class="input-wrapper">
        <label for="name">First name</label>
        <Input
          id="name"
          placeholder="e.g. John"
          bind:value={$profile.name}
          required
        />
      </div>

      <div class="input-wrapper">
        <label for="surname">Last name</label>
        <Input
          id="surname"
          placeholder="e.g. Appleseed"
          bind:value={$profile.surname}
          required
        />
      </div>

      <div class="input-wrapper">
        <label for="email">Email</label>
        <Input
          id="email"
          placeholder="e.g. email@example.com"
          bind:value={$profile.email}
          type="email"
          disabled={!$profile.name || !$profile.surname}
        />
      </div>
    </div>
  </FormLayout>
</ContentLayout>

<style>
  .background {
    border-radius: 12px;
    background-color: var(--light-grey);
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }
  .input-wrapper {
    display: grid;
    grid-template-columns: minmax(120px, 180px) minmax(220px, 1fr);

    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }

    & label {
      display: flex;
      align-items: center;
    }
  }
</style>
