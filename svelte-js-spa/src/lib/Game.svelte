<script>
  import Board from "./Board.svelte";
  import History from "./History.svelte";

  const initialBoard = Array(9).fill(null);

  let history = $state([initialBoard]);
  let currentMove = $state(0);
  let currentSquares = $derived(history[currentMove]);
  let xIsNext = $derived(currentMove % 2 === 0);

  function handlePlay(nextSquares) {
    history.push(nextSquares);
    currentMove = history.length - 1;
  }
</script>

<div class="game">
  <div class="game-board">
    <Board {xIsNext} squares={currentSquares} onPlay={handlePlay} />
  </div>
  <History {history} onJump={(move) => (currentMove = move)} />
</div>
