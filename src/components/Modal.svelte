<script>
  import { createEventDispatcher } from 'svelte'

  export let title
  export let open = false
  export let openLink = ''

  const dispatch = createEventDispatcher()

  const close = (e) => {
    open = false
  }

  const handleOpen = () => open = true

  $: dispatch(open ? 'open' : 'close')
</script>

<!-- MARKUP -->

{#if open}
  <main>
    <section class="header">
      <slot name="title">
        {#if title}
          <h2>{title}</h2>
        {/if}
      </slot>
      <h2><a class="close" on:click={close}>✕</a></h2>
    </section>
    <slot />
  </main>
{/if}

<a class="hidden" on:click={handleOpen}>
  <slot name="link">
    {#if openLink}
      {openLink}
    {:else}
      open modal
    {/if}
  </slot>
</a>

<!-- STYLES -->
<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .link {
    cursor: pointer;
  }

  a {
    transition: all 0.05s ease;

    &:hover {
      text-decoration: none;
      transform: scale(1.2);
    }
  }

  a.close {
    transition: all 0.1s ease;

    &:hover {
      text-decoration: none;
      transform: scale(1.2);
    }
  }

  main {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 999;
    background-color: #eee;
    display: flex;
    flex-flow: column;
    padding: var(--app-padding-desktop);

    @media (max-width: 25em) {
      padding: var(--app-padding-mobile);
    }
  }

  h2 {
    display: flex;
    justify-content: space-between;
  }
</style>
