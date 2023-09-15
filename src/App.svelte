<script lang="ts">
  import { globalHistory } from "svelte-routing/src/history";
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Main from "./pages/MainPage.svelte";
  import Login from "./pages/LoginPage.svelte";
  import SignUp from "./pages/SignUpPage.svelte";
  import { pathname, session } from "./stores";

  import { supabase } from "./lib/db/supabase";
  import Social from "./pages/Social.svelte";
  import LinksPage from "./pages/LinksPage.svelte";
  import ProfilePage from "./pages/ProfilePage.svelte";
  import PreviewPage from "./pages/PreviewPage.svelte";
  import MainLayout from "./layouts/MainLayout.svelte";
  import ProtectedRoute from "./components/ProtectedRoute.svelte";
  import { setInitialData } from "./lib/db/setInitialData";

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
    setInitialData();

    supabase.auth.onAuthStateChange((_event, _session) => {
      session.set(_session);
    });
  });
</script>

<MainLayout>
  <Router>
    <ProtectedRoute path="/links">
      <LinksPage />
    </ProtectedRoute>

    <ProtectedRoute path="/profile">
      <ProfilePage />
    </ProtectedRoute>

    <ProtectedRoute path="/preview">
      <PreviewPage />
    </ProtectedRoute>

    <Route path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />

    <Route path="/l/:id" let:params>
      <Social id={params.id} />
    </Route>
  </Router>
</MainLayout>
