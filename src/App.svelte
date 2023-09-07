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
  import Links from "./pages/Links.svelte";
  import { pathname } from "./stores";

  onMount(() => {
    const unsub = globalHistory.listen(({ location }) => {
      pathname.set(location.pathname);
    });

    return () => {
      unsub();
    };
  });

  $: isAuthPages = $pathname === "/login" || $pathname === "/signup";
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
      <Route path="/links" component={Links} />
      <Route path="/preview" component={Preview} />
      <Route path="/profile" component={Profile} />
    </main>
  </div>
</Router>

<style>
  main,
  .layout {
    display: flex;
    flex-direction: column;
  }

  .layout {
    min-height: 100vh;

    &[data-login="true"] {
      padding: 24px 0;
    }
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
