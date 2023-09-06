<script lang="ts">
  import { globalHistory } from "svelte-routing/src/history";

  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Main from "./pages/Main.svelte";
  import Preview from "./pages/Preview.svelte";
  import Profile from "./pages/Profile.svelte";
  import Navigation from "./lib/Navigation.svelte";
  import Login from "./pages/Login.svelte";

  let path: string = "";

  onMount(() => {
    path = window.location.pathname;

    const unsub = globalHistory.listen(({ location }) => {
      path = location.pathname;
    });

    return () => {
      unsub();
    };
  });

  $: isLoginPage = path === "/login";
</script>

<Router>
  <div class="layout" data-login={isLoginPage}>
    <main>
      {#if !isLoginPage}
        <Navigation />
      {/if}
      <Route path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/preview" component={Preview} />
      <Route path="/profile" component={Profile} />
    </main>
  </div>
</Router>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 24px 0;

    &[data-login="true"] main {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  main {
    flex-grow: 1;
  }
</style>
