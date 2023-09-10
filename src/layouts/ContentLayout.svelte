<div>
  <slot />
</div>

<style>
  div {
    display: flex;
    height: 100%;
    column-gap: 1.5rem;
    padding: 2.5rem;
    flex-grow: 1;
  }

  :global(body[data-path="/preview"])::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: var(--purple);
    height: 357px;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    z-index: -1;
  }
</style>
