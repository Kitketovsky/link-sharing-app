<div>
  <slot />
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }

  div::before {
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
