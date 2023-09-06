<script lang="ts">
  import { Link } from "svelte-routing";
</script>

<nav>
  <Link to="/">Home</Link>
  <Link to="/login">Login</Link>
  <Link to="/profile">Profile</Link>
  <Link to="/preview">Preview</Link>
</nav>

<style>
  nav {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1.5rem;
  }
</style>
