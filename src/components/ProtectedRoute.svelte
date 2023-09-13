<script lang="ts">
  import { Route, navigate } from "svelte-routing";
  import { isLoading, session } from "../stores";
  import Navigation from "./Navigation.svelte";

  export let path: string;

  $: {
    if (!$isLoading && !$session) {
      navigate("/login");
    }
  }
</script>

<Route {path}>
  <Navigation />
  <slot />
</Route>
