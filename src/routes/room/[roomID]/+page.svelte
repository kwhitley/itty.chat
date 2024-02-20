<script lang="ts">
  export let data

  $: roomID = data.roomID
</script>

<!-- MARKUP -->
<h1>{roomID}</h1>
