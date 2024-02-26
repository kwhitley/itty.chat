<script>
  import Overlay from './Overlay.svelte'

  export let message
</script>

<!-- MARKUP -->
<Overlay>
  <h2>
    {message}
  </h2>
</Overlay>

<!-- STYLES -->
<style lang="scss">
  h2 {
    opacity: 0.6;
  }
</style>
