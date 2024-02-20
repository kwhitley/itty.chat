<script lang="ts">
  import { goto } from '$app/navigation'
  import { roomID } from '../store'
  import { page } from '$app/stores'

  export let data

  $: $page.params.roomID && roomID.set($page.params.roomID)

  const connect = (e) => {
    e.preventDefault()
    goto(`/room/${$roomID}`, { replaceState: false })
  }
</script>

<!-- MARKUP -->
{$page.params.roomID}
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
