<script>
	import { isConnecting, isConnected } from '../lib/room'

</script>
<svelte:head>
  <title>Welcome to itty.chat</title>
</svelte:head>

<!-- MARKUP -->
{#if !$isConnecting && !$isConnected}
  <main>
    <section>
      <h1>welcome to <span class="accent">itty.chat</span></h1>
      <h2>powered by <a href="https://ittysockets.com">ittysockets.io</a></h2>
    </section>
  </main>
{/if}

<!-- STYLES -->
<style lang="scss">
  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    flex: 0.4;
    padding-top: 1rem;
  }

  h1, h2 {
    max-width: 30rem;
  }

  span {
    white-space: nowrap;
  }
</style>
