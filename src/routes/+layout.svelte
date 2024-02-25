<script>
  import '~/styles/app.scss'
  import '~/constants.ts'
  import RoomSelector from '~/components/RoomSelector.svelte'
</script>

<main id="layout">
  <div id="rooms-selector">
    <RoomSelector />
  </div>
  <div id="room">
    <slot />
  </div>
</main>

<!-- STYLES -->
<style lang="scss">
  #layout {
    padding: 2rem;
    display: flex;
    flex-flow: column;
    background-color: #eee;
    min-height: 100vh;
    gap: 1rem;

    @media (max-width: 25em) {
      padding: 1rem;
    }

    #room {
      flex: 1;
      display: flex;
      flex-flow: column;
    }

    @supports (height: env(safe-area-inset-bottom)) {
      min-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    }
  }
</style>
