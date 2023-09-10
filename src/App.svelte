<script lang="ts">
  import { globalHistory } from "svelte-routing/src/history";

  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Main from "./pages/MainPage.svelte";
  import Preview from "./pages/PreviewPage.svelte";
  import Profile from "./pages/ProfilePage.svelte";
  import Navigation from "./lib/Navigation.svelte";
  import Login from "./pages/LoginPage.svelte";
  import SignUp from "./pages/SignUpPage.svelte";
  import Links from "./pages/LinksPage.svelte";
  import { pathname } from "./stores";
  import ContentLayout from "./layouts/ContentLayout.svelte";
  import Phone from "./lib/Phone.svelte";

  onMount(() => {
    const unsub = globalHistory.listen(({ location }) => {
      pathname.set(location.pathname);
    });

    return () => {
      unsub();
    };
  });

  $: {
    document.body.dataset.path = $pathname;
  }
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

      <ContentLayout>
        {#if $pathname === "/links" || $pathname === "/profile"}
          <Phone />
        {/if}
        <Route path="/links" component={Links} />
        <Route path="/profile" component={Profile} />
        <Route path="/preview" component={Preview} />
      </ContentLayout>
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
