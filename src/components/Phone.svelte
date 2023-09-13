<script lang="ts">
  import Avatar from "../components/Avatar.svelte";
  import Links from "../components/Links.svelte";
  import PersonInfo from "../components/PersonInfo.svelte";
</script>

<div class="phone-wrapper">
  <div class="phone">
    <div class="overflow">
      <Avatar />
      <PersonInfo />
      <Links />
    </div>
  </div>
</div>

<style>
  .phone-wrapper {
    position: relative;
    top: 1.2rem;
    display: flex;
    justify-content: center;
    width: 40%;
    min-width: 375px;

    @media screen and (max-width: 1024px) {
      display: none;
    }

    & .phone {
      width: 308px;
      min-height: 632px;
      max-height: 632px;
      height: 100%;
      position: relative;
      background: url("./../assets/images/illustration-phone-mockup.svg") center
        center no-repeat;
    }
  }

  .overflow {
    height: calc(100% - 5rem);
    overflow-y: auto;
    margin: 2.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }
</style>
