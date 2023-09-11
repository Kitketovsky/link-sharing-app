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
  import { isLoading, pathname, profile, remote, session } from "./stores";
  import ContentLayout from "./layouts/ContentLayout.svelte";
  import Navigation from "./components/Navigation.svelte";
  import Phone from "./components/Phone.svelte";

  import { supabase } from "./lib/supabase";
  import Loading from "./components/Loading.svelte";

  import type { TablesRow } from "./types/db/utils";

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

  // onMount(() => {
  //   let channel = supabase.channel("main");

  //   channel
  //     .on<TablesRow<"users">>(
  //       "postgres_changes",
  //       {
  //         event: "UPDATE",
  //         schema: "public",
  //         table: "users",
  //       },
  //       (payload) => {
  //       },
  //     )
  //     .subscribe();

  //   return () => {
  //     if (channel) {
  //       supabase.removeChannel(channel);
  //     }
  //   };
  // });

  async function loadRemoteData() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();

      session.set(sessionData.session);

      if (!sessionData.session) return;

      let avatarUrl: string | null = null;

      const { data: files } = await supabase.storage
        .from("images")
        .list(undefined, { search: `${sessionData.session.user.id}` });

      if (!files?.length) return;

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(`${files[0].name}`);

      avatarUrl = data.publicUrl;

      const { data: profileData } = await supabase
        .from("users")
        .select()
        .eq("id", sessionData.session.user.id)
        .single();

      if (!data) return;

      const { name, surname, email, links } = profileData;

      profile.set({
        name,
        surname,
        avatar: avatarUrl,
        email,
        links: links,
      });
    } finally {
      isLoading.set(false);
    }
  }

  onMount(() => {
    loadRemoteData();

    supabase.auth.onAuthStateChange((_event, _session) => {
      session.set(_session);
    });
  });

  $: isProtectedPage = ["/links", "/profile", "/preview"].includes($pathname);
</script>

<Router>
  <div class="layout">
    <main>
      {#if $isLoading}
        <Loading />
      {:else if isProtectedPage}
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
