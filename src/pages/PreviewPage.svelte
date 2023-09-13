<script lang="ts">
  import Avatar from "../components/Avatar.svelte";
  import Links from "../components/Links.svelte";
  import PersonInfo from "../components/PersonInfo.svelte";
  import PreviewLayout from "../layouts/PreviewLayout.svelte";
</script>

<svelte:head>
  <title>Preview</title>
</svelte:head>

<PreviewLayout>
  <div class="wrapper">
    <div class="card">
      <Avatar />
      <PersonInfo />
      <Links />
    </div>
  </div>
</PreviewLayout>

<style>
  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    max-width: 349px;
    width: 100%;
    border-radius: 24px;
    background-color: var(--white);
    padding: 48px 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 5px 35px
      color-mix(in srgb, var(--purple-hover), transparent 35%);

    @media screen and (max-width: 768px) {
      box-shadow: none;
      padding: 1rem 0;
    }
  }
</style>
