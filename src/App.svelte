<script lang="ts">
  import { globalHistory } from "svelte-routing/src/history";

  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Main from "./pages/Main.svelte";
  import Preview from "./pages/Preview.svelte";
  import Profile from "./pages/Profile.svelte";
  import Navigation from "./lib/Navigation.svelte";
  import Login from "./pages/Login.svelte";
  import SignUp from "./pages/SignUp.svelte";

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

  $: isAuthPages = path === "/login" || path === "/signup";
</script>

<Router>
  <div class="layout" data-login={isAuthPages}>
    <main>
      {#if !isAuthPages}
        <Navigation />
      {/if}
      <Route path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
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
