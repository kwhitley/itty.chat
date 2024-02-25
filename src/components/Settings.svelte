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

<main class:isOpen>
  {#if isOpen}

  {:else}
    <a on:click={open}>⚙️</a>
  {/if}

  <article class:isOpen>
    <h2>
      Settings
      <a class="close" on:click={close}>✕</a>
    </h2>

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
  </article>
</main>



<!-- STYLES -->
<style lang="scss">
  a {
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s ease;
    z-index: 1;

    &:hover {
      text-decoration: none;
      transform: scale(1.2);
    }
  }

  article {
    display: none;
  }

  main.isOpen {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 1;
    background-color: #eee;
    display: flex;
    flex-flow: column;
    padding: 2rem;

    article {
      display: block;
    }
  }

  h2 {
    display: flex;
    justify-content: space-between;
  }

  article {
    &.isOpen {
      opacity: 1;
      top: 0;
    }
  }
</style>
