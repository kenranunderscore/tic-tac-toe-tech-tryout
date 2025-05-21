<script>
  let { history, onJump } = $props();
</script>

<div class="game-info">
  <h4>Move history</h4>
  <ol>
    {#each history as _, move}
      <li><button onclick={() => onJump(move)}>Jump</button></li>
    {/each}
  </ol>
</div>
