<script>
  import { page } from '$app/stores'
  import { roomID, selfID, unreadMessages } from '../../../lib/stores'
  import { room, messages, isConnecting, isConnected } from '../../../lib/room'
  import UserInput from '../../../components/UserInput.svelte'
  import { fade } from 'svelte/transition'
  export let data

  let pageRoomID = ''
  let messageArea = undefined

  $: pageTitleBase = `Chatting in room ${$roomID}`
  $: pageTitle = $unreadMessages ? `(${$unreadMessages}) ` + pageTitleBase : pageTitleBase

  $: if (typeof window !== 'undefined' && pageRoomID !== $page.params.roomID) {
    pageRoomID = $page.params.roomID
    // roomID.set($page.params.roomID)
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
      <div class="message" class:self={message.details?.fromSelf}>
        {#if message.from}
          <strong class="from">
            <span>{message.from.alias || message.from.id}</span>
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

  main.overlay {
    position: fixed;
    z-index: 1;
    // background-color: rgba(225,225,225,0.9);
    // background-color: var(--background-color);
    opacity: 0.95;
    color: var(--foreground-50);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
  }

  span {
    // color: var(--accent-color);
    color: #000;
  }

  small {
    color: var(--foreground-50);
  }

  .messages {
    flex: 1;
    overflow: scroll;
    display: flex;
    flex-flow: column;
    gap: 0.7rem;
  }

  .message {
    color: #666;
    font-weight: 100;
  }

  .from {
    font-weight: 600;

    &::after {
      content: ': ';
    }
  }

  .self, .self * {
    color: var(--accent-color);
  }
</style>
