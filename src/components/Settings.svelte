<script>
  import { room } from '../lib/room'
  import { alias, refocus } from '../lib/stores'
  import Modal from './Modal.svelte'

  let isOpen = false
  let input
  let currentAlias

  const close = (e) => {
    e.preventDefault()
    console.log('running close')
    if (room.isConnected && currentAlias !== $alias) {
      room.send(`$alias ${$alias}`)
    }
    isOpen = false
    $refocus = true
  }
</script>

<!-- MARKUP -->

<Modal
  bind:open={isOpen}
  on:open={() => { currentAlias = $alias }}
  openLink="⚙️"
  >

  <form on:submit={close}>
    <label>
      Display Name
      <input
        type="text"
        autofocus
        bind:value={$alias}
        bind:this={input}
        />
    </label>
  </form>
</Modal>
