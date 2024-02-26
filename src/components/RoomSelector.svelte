<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { roomID } from '$lib/stores'
  import { isConnected, room } from '../lib/room'
  import Settings from './Settings.svelte'

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
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    gap: 0.5rem;
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

    @media (max-width: 25rem) {
      flex: 1 100%;
      width: 100%;
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
    padding: 0 1rem;
    border: none;
    border-radius: var(--border-radius);
    background-color: var(--accent-color);
    color: white;
    font-size: 0.6em;
    flex: 0;

    @media (max-width: 25rem) {
      flex: 1;
    }
  }

  button.disconnect {
    background-color: var(--foreground-25);
    flex: 1;

    @media (max-width: 25rem) {
      flex: 1 100%;
      width: 100%;
    }
  }
</style>
