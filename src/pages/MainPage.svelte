<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import CenteredLayout from "../layouts/CenteredLayout.svelte";

  onMount(() => {
    navigate("/links");
  });
</script>

<svelte:head>
  <title>Main</title>
</svelte:head>

<CenteredLayout>
  <span>Main Page</span>
</CenteredLayout>
