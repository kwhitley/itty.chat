<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { roomID } from '$lib/stores'
  import { isConnected, room } from '../lib/room'
  import Settings from './Settings.svelte'

  // $: $page.params.roomID && roomID.set($page.params.roomID)

  const connect = (e) => {
    e.preventDefault()

    if ($roomID) {
      goto(`/room/${$roomID}`)
    } else {
      room.connect()
    }
  }

  const disconnect = (e) => {
    e.preventDefault()
    room.disconnect()
  }

  const copyShareLink = (e) => {
    e.preventDefault()
    const url = $page.url
    navigator.clipboard.writeText(url)
  }

  const clone = (e) => {
    e.preventDefault()
    window.open($page.url)
  }
</script>

<!-- MARKUP -->
{#if $isConnected === true}
  <form class="room-selector" on:submit={disconnect} class:connected={$isConnected}>

    <button on:click={clone}>
      clone
    </button>
    <button on:click={copyShareLink}>
      share
    </button>
    <button class="disconnect" on:click={disconnect}>
      disconnect
    </button>
    <Settings />
  </form>
{:else}
  <form class="room-selector" on:submit={connect} class:connected={$isConnected}>
    <input
      type="text"
      bind:value={$roomID}
      placeholder="room ID (optional)"
      />
    <button on:click={connect} class="connect">
      {#if $roomID}
        connect to room "{$roomID}"
      {:else}
        <span class="desktop">connect to a</span> random room
      {/if}
    </button>
    <Settings />
  </form>
{/if}

<!-- STYLES -->
<style lang="scss">
  .room-selector {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    column-gap: 0.5rem;
    row-gap: 0.2rem;
    font-size: 2rem;

    & > * {
      height: 2.5rem;
    }
  }

  input {
    height: 100%;
    padding: 0 1rem;
    border-radius: var(--border-radius);
    border: none;
    outline: 1px solid var(--foreground-50);
    font-size: 0.6em;
    flex: 1;

    @media (max-width: 35rem) {
      // flex: 1 100%;
      // width: 100%;
    }

    &::placeholder {
      color: var(--foreground-25);
    }

    &:focus {
      outline: 2px solid var(--accent-color);
    }
  }

  button {
    height: 100%;
    // padding: 0 0.5rem;
    border: none;
    border-radius: var(--border-radius);
    background-color: var(--accent-color);
    color: white;
    font-size: 0.6em;
    flex: 0 1 auto;
    flex: 0;
    white-space: nowrap;

    @media (max-width: 35rem) {
      flex: 1 100%;
      order: 1;
    }
  }

  .connected button:not(.disconnect) {
    @media (max-width: 35rem) {
      flex: 1;
      order: -1;
    }
  }

  button.connect {
    @media (max-width: 35rem) {
      flex: 1 100%;
    }
  }

  button.disconnect {
    background-color: var(--foreground-25);
    flex: 8;

    @media (max-width: 35rem) {
      // order: -1;
      flex: 1 75%;
      // flex: 1 100%;
      // width: 100%;
    }

    // @media (max-width: 15rem) {
    //   flex: 1;
    //   // flex: 1 100%;
    //   // width: 100%;
    // }
  }

  .connected button.disconnect {
    // flex: 1 100%;
  }
</style>
