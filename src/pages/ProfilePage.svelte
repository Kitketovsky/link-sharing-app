<script lang="ts">
  import FileInput from "../components/FileInput.svelte";
  import FormLayout from "../layouts/FormLayout.svelte";
  import Input from "../components/Input.svelte";
  import { profile, session } from "../stores";
  import { supabase } from "../lib/supabase";
  import type { PostgrestError } from "@supabase/supabase-js";

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
    } finally {
      isUpdating = false;
    }
  }
</script>

<FormLayout bind:ref={formRef} on:click={onSubmit} isDisabled={isUpdating}>
  <h1 slot="heading">Preview Profile</h1>
  <span slot="description">
    Add your details to create a personal touch to your profile.
  </span>

  <div class="input-wrapper">
    <label for="avatar">Profile picture</label>
    <FileInput bind:file={$profile.avatar} />
  </div>

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
</FormLayout>

<style>
  .input-wrapper {
    display: grid;
    grid-template-columns: minmax(120px, 180px) minmax(220px, 1fr);

    & label {
      display: flex;
      align-items: center;
    }
  }
</style>
