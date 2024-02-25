<script lang="ts">
  import { room } from '../lib/room'
  import { refocus } from '../lib/stores'

  let value
  let input

  const send = (e) => {
    e.preventDefault()
    room.send(value)
    value = ''
  }

  $: if ($refocus) {
    input?.focus()
    $refocus = false
  }
</script>

<!-- MARKUP -->
<form class="user-input" on:submit={send}>
  <input
    type="text"
    bind:value
    bind:this={input}
    autofocus
    />
  <button on:click={send} disabled={!value}>
    Send
  </button>
</form>

<!-- STYLES -->
<style lang="scss">
  .user-input {
    height: 2.7rem;
    display: flex;
    gap: 0.5rem;
    font-size: 2rem;
    justify-self: flex-end;
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
