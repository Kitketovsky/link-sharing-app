<script lang="ts">
  import FileInput from "../components/FileInput.svelte";
  import FormLayout from "../layouts/FormLayout.svelte";
  import Input from "../components/Input.svelte";
  import { profile } from "../stores";

  let formRef: HTMLFormElement;
</script>

<FormLayout bind:ref={formRef}>
  <h1 slot="heading">Preview Profile</h1>
  <span slot="description">
    Add your details to create a personal touch to your profile.
  </span>

  <div class="input-wrapper">
    <label for="avatar">Profile picture</label>
    <FileInput bind:file={$profile.avatar} />
  </div>

  <div class="input-wrapper">
    <label for="avatar">First name</label>
    <Input placeholder="e.g. John" bind:value={$profile.name} required />
  </div>

  <div class="input-wrapper">
    <label for="avatar">Last name</label>
    <Input
      placeholder="e.g. Appleseed"
      bind:value={$profile.surname}
      required
    />
  </div>

  <div class="input-wrapper">
    <label for="avatar">Email</label>
    <Input
      placeholder="e.g. email@example.com"
      bind:value={$profile.email}
      type="email"
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
