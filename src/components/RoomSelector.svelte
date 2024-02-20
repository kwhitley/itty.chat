<script lang="ts">
  import { goto } from '$app/navigation'
  import { roomID } from '$lib/stores'
  import { page } from '$app/stores'
  import { room } from '../lib/room'
  import { isConnected } from '../lib/room'

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
</script>

<!-- MARKUP -->
{#if $isConnected === true}
  <form class="room-selector" on:submit={disconnect}>
    <button on:click={disconnect}>
      Disconnect
    </button>
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
    flex: 1;
    font-size: 0.6em;
  }
</style>
