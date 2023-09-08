<script lang="ts">
  import IllustrationEmpty from "./../assets/images/illustration-empty.svg";
  import Button from "../lib/Button.svelte";
  import DevLink from "../lib/DevLink.svelte";
  import options from "../conts/options";

  import Phone from "../lib/Phone.svelte";

  import { profile } from "../stores";
  import { links } from "svelte-routing";

  let formRef: HTMLFormElement;
</script>

<div class="wrapper">
  <Phone />
  <form class="editor-wrapper" novalidate bind:this={formRef}>
    <div class="editor-header">
      <h1 class="heading-m">Customize your links</h1>
      <span class="body-m"
        >Add/edit/remove links below and then share all your profiles with the
        world!</span
      >
    </div>
    <div class="editor-body">
      <Button
        label="+ Add New Link"
        mode="secondary"
        isFullWidth
        on:click={(event) => {
          const isFormValid = formRef.checkValidity();

          if (!isFormValid) {
            formRef.reportValidity();
          } else {
            profile.addNewLink();
          }
        }}
        isDisabled={links.length === options.length}
      />

      {#if links.length}
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
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
      {/if}
    </div>

    <div class="editor-footer">
      <Button label="Save" type="submit" isDisabled />
    </div>
  </form>
</div>

<style>
  .wrapper {
    position: relative;
    display: flex;
    height: 100%;
    column-gap: 1.5rem;
    padding: 2.5rem;
    flex-grow: 1;
  }

  .editor-body {
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    flex-grow: 1;
  }

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

  .editor-wrapper {
    width: 60%;
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
  }

  .editor-header h1 {
    margin-bottom: 0.5rem;
  }

  .editor-footer {
    display: flex;
    justify-content: right;
  }
</style>
