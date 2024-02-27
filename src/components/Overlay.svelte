<script>
  import { fade } from 'svelte/transition'
</script>

<!-- MARKUP -->
<main transition:fade={{ duration: 100 }}>
  <slot />
</main>

<!-- STYLES -->
<style lang="scss">
  main {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-color);
    opacity: 0.98;
  }
</style>
