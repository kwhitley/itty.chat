<script lang="ts">
  import { page } from '$app/stores'
  import { roomID } from '../../../lib/stores'
  import { room, messages } from '../../../lib/room'
  import UserInput from './UserInput.svelte'
  export let data
  let pageRoomID = ''

  $: if (typeof window !== 'undefined' && pageRoomID !== $page.params.roomID) {
    pageRoomID = $page.params.roomID
    roomID.set($page.params.roomID)
    console.log('roomID has changed to', $roomID)
    room.connect(pageRoomID)
  }
</script>

<!-- MARKUP -->
<main>
  <section class="messages">
    {#each $messages as message}
      <div class="message">
        {#if message.from}
          <strong class="from">{message.from} says:</strong>
          {message.message}
        {/if}
      </div>
    {/each}
  </section>
  <UserInput />
</main>

<!-- STYLES -->
<style lang="scss">
  main {
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }

  .messages {
    flex: 1;
    overflow: scroll;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
  }
</style>
