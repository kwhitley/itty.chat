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
    height: 100vh;
    gap: 1rem;

    #room {
      flex: 1;
    }
  }
</style>
