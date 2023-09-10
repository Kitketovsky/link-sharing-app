<script lang="ts">
  import { globalHistory } from "svelte-routing/src/history";
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Main from "./pages/MainPage.svelte";
  import Preview from "./pages/PreviewPage.svelte";
  import Profile from "./pages/ProfilePage.svelte";
  import Login from "./pages/LoginPage.svelte";
  import SignUp from "./pages/SignUpPage.svelte";
  import Links from "./pages/LinksPage.svelte";
  import { pathname, session } from "./stores";
  import ContentLayout from "./layouts/ContentLayout.svelte";
  import Navigation from "./components/Navigation.svelte";
  import Phone from "./components/Phone.svelte";

  import { supabase } from "./lib/supabase";

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

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.set(data.session);
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      session.set(_session);
    });
  });

  $: isProtectedPage = ["/links", "/profile", "/preview"].includes($pathname);
</script>

<Router>
  <div class="layout" data-login={!isProtectedPage}>
    <main>
      {#if isProtectedPage}
        <Navigation />
        <ContentLayout>
          {#if $pathname === "/links" || $pathname === "/profile"}
            <Phone />
          {/if}
          <Route path="/links" component={Links} />
          <Route path="/profile" component={Profile} />
          <Route path="/preview" component={Preview} />
        </ContentLayout>
      {:else}
        <Route path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      {/if}
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
