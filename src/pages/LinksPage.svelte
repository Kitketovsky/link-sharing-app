<script lang="ts">
  import IllustrationEmpty from "./../assets/images/illustration-empty.svg";
  import DevLink from "./../components/DevLink.svelte";
  import options from "../conts/options";
  import { profile, session } from "../stores";
  import FormLayout from "../layouts/FormLayout.svelte";
  import { tick } from "svelte";
  import Button from "../components/Button.svelte";
  import { supabase } from "../lib/db/supabase";
  import type { PostgrestError } from "@supabase/supabase-js";
  import ContentLayout from "../layouts/ContentLayout.svelte";

  let formRef: HTMLFormElement;

  async function onAddNewLinkClick() {
    const isFormValid = formRef.checkValidity();

    if (!isFormValid) {
      formRef.reportValidity();
    } else {
      profile.addNewLink();

      await tick();

      const newlyAddedInput = Array.from(
        formRef.querySelectorAll("input[type='url'"),
      ).at(-1);

      if (newlyAddedInput) {
        (newlyAddedInput as HTMLInputElement).scrollIntoView();
        (newlyAddedInput as HTMLInputElement).focus();
      }
    }
  }

  const status: { updating: boolean; error: PostgrestError | null } = {
    updating: false,
    error: null,
  };

  let isUpdating = false;

  async function onSubmit() {
    try {
      status.updating = true;

      const { links } = $profile;

      const userId = $session?.user.id;

      if (!userId) return;

      const { error } = await supabase
        .from("users")
        .update({ links: links })
        .eq("id", userId)
        .select();

      if (error) {
        status.error = error;
        console.log(error);
      }
    } finally {
      status.updating = false;
    }
  }
</script>

<svelte:head>
  <title>Links</title>
</svelte:head>

<ContentLayout>
  <FormLayout bind:ref={formRef} on:click={onSubmit} isDisabled={isUpdating}>
    <h1 slot="heading">Customize your links</h1>
    <span slot="description"
      >Add/edit/remove links below and then share all your profiles with the
      world!</span
    >

    <Button
      label="+ Add New Link"
      mode="secondary"
      isFullWidth
      on:click={onAddNewLinkClick}
      isDisabled={$profile.links.length === options.length}
    />

    {#if $profile.links.length}
      {#each $profile.links as link, i (link.id)}
        <DevLink
          options={[...options].filter(
            (option) =>
              !$profile.links.find((link) => link.platform === option.id) ||
              option.id === link.platform,
          )}
          onRemoveLink={() => profile.removeLink(link.id)}
          number={i + 1}
          {link}
          onSelectChange={(optionId) => profile.changeLink(link.id, optionId)}
          on:input={(event) => {
            profile.changeLink(link.id, link.platform, event);
          }}
          on:keydown={(event) => {
            if (event.key === "Enter") {
              onAddNewLinkClick();
            }
          }}
        />
      {/each}
    {:else}
      <div class="no-links-placeholder">
        <div>
          <div>
            <img src={IllustrationEmpty} alt="Illustration Empty" />
          </div>

          <h2 class="heading-m">Let's get you started</h2>

          <p class="body-m">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!
          </p>
        </div>
      </div>
    {/if}
  </FormLayout>
</ContentLayout>

<style>
  .no-links-placeholder {
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div {
      max-width: 488px;
    }

    & h2 {
      margin-top: 2.5rem;
      margin-bottom: 1.5rem;
    }
  }
</style>
