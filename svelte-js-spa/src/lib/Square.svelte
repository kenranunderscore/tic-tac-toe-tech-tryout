<script>
  let { value, onSquareClick } = $props();
</script>

<button class="square" onclick={onSquareClick}>{value}</button>
