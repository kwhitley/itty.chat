<script>
  import { alias, refocus } from '../lib/stores'
  import { room } from '../lib/room'
  let isOpen = false
  let input
  let currentAlias

  const open = () => {
    isOpen = true
    currentAlias = $alias
    input?.select()
  }

  const close = (e) => {
    e.preventDefault()
    if (room.isConnected && currentAlias !== $alias) {
      room.send(`$alias ${$alias}`)
    }
    isOpen = false
    $refocus = true
  }
</script>

<!-- MARKUP -->
{#if isOpen}
  <a on:click={close}>✕</a>
{:else}
  <a on:click={open}>⚙️</a>
{/if}

<main class:isOpen>
  <h2>Settings</h2>

  <form on:submit={close}>
    <label>
      Display Name
      <input
        type="text"
        bind:value={$alias}
        autofocus
        bind:this={input}
        />
    </label>
  </form>
</main>

<!-- STYLES -->
<style lang="scss">
  a {
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s ease;

    &:hover {
      text-decoration: none;
      transform: scale(1.2);
    }
  }

  main {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
    // background-color: pink;
    // opacity: 0;
    transition: top 0.2s ease;
    padding: 2rem;
    z-index: 1;

    &.isOpen {
      opacity: 1;
      top: 5rem;
    }
  }
</style>
