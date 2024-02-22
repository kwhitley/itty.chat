<script lang="ts">
  import { goto } from '$app/navigation'
  import { roomID } from '$lib/stores'
  import { page } from '$app/stores'
  import { room } from '../lib/room'
  import { isConnected } from '../lib/room'
  import Settings from './Settings.svelte'

  export let data

  $: $page.params.roomID && roomID.set($page.params.roomID)

  const connect = (e) => {
    e.preventDefault()

    $roomID && goto(`/room/${$roomID}`)

    if (!$roomID) {
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
  <form class="room-selector" on:submit={disconnect}>
    <button class="disconnect" on:click={disconnect}>
      Disconnect
    </button>
    <button on:click={clone}>
      Clone
    </button>
    <button on:click={copyShareLink}>
      Share
    </button>
    <Settings />
  </form>
{:else}
  <form class="room-selector" on:submit={connect}>
    <input
      type="text"
      bind:value={$roomID}
      placeholder="room ID (optional)"
      autofocus
      />
    <button on:click={connect}>
      Connect
    </button>
    <Settings />
  </form>
{/if}


<!-- STYLES -->
<style lang="scss">
  .room-selector {
    height: 2.7rem;
    display: flex;
    gap: 0.5rem;
    font-size: 2rem;
  }

  input {
    height: 100%;
    padding: 0 1rem;
    border-radius: var(--border-radius);
    border: none;
    outline: 1px solid var(--foreground-50);
    font-size: 0.6em;
    flex: 1;

    &::placeholder {
      color: var(--foreground-25);
    }

    &:focus {
      outline: 2px solid var(--accent-color);
    }
  }

  button {
    height: 100%;
    padding: 0 1rem;
    border: none;
    border-radius: var(--border-radius);
    background-color: var(--accent-color);
    color: white;
    font-size: 0.6em;
    flex: 0;
  }

  button.disconnect {
    background-color: var(--foreground-25);
    flex: 1;
  }
</style>
