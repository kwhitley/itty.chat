<script>
  import { page } from '$app/stores'
  import { roomID, unreadMessages } from '../../../lib/stores'
  import { room, messages } from '../../../lib/room'
  import UserInput from '../../../components/UserInput.svelte'
  export let data

  let pageRoomID = ''
  let messageArea = undefined

  $: pageTitleBase = `Chatting in room ${$roomID}`
  $: pageTitle = $unreadMessages ? `(${$unreadMessages}) ` + pageTitleBase : pageTitleBase

  $: if (typeof window !== 'undefined' && pageRoomID !== $page.params.roomID) {
    pageRoomID = $page.params.roomID
    roomID.set($page.params.roomID)
    console.log('roomID has changed to', $roomID)
    room.connect(pageRoomID)
  }

  $: {
    if ($messages.length) {
      window.messageArea = messageArea
      setTimeout(() => messageArea.scrollTo(0, messageArea.scrollHeight), 0)
    }
  }
</script>

<!-- HEAD -->
<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<!-- MARKUP -->
<main>
  <section class="messages" bind:this={messageArea}>
    {#each $messages as message}
      <div class="message">
        {#if message.from}
          <strong class="from">
            <span>{message.from.alias || message.from.id}</span> says:
          </strong>
          {#if (typeof message.message === 'string')}
            {message.message}
          {:else}
            <pre>
              {JSON.stringify(message.message ?? message, null, 2)}
            </pre>
          {/if}
        {:else}
          {#if (typeof message === 'string')}
            <small>{message}</small>
          {:else}
            <pre>
              {JSON.stringify(message, null, 2)}
            </pre>
          {/if}
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
    flex: 1;
    display: flex;
    flex-flow: column;
    gap: 1rem;
    overflow: hidden;
    padding: 1px;
  }

  span {
    color: var(--accent-color);
  }

  small {
    color: var(--foreground-50);
  }

  .messages {
    flex: 1;
    overflow: scroll;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
  }
</style>
