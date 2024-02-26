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
    padding: var(--app-padding-desktop);
    display: flex;
    flex-flow: column;
    background-color: #eee;
    min-height: 100vh;
    gap: 1rem;
    max-height: 100vh;
    overflow: hidden;

    @media (max-width: 25em) {
      padding: var(--app-padding-mobile);
    }

    #room {
      flex: 1;
      display: flex;
      flex-flow: column;
      overflow: hidden;
    }

    @supports (height: env(safe-area-inset-bottom)) {
      min-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    }
  }
</style>
