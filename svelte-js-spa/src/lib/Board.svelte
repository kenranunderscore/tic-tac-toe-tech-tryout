<script>
  import Square from "./Square.svelte";
  import * as ttt from "tic-tac-toe";

  let { squares, xIsNext, onPlay } = $props();

  function handleClick(i) {
    if (ttt.determineWinner(squares) || squares[i]) {
      return;
    }

    let res = squares.slice();
    res[i] = xIsNext ? "X" : "O";
    onPlay(res);
  }

  let winner = $derived(ttt.determineWinner(squares));
  let status = $derived(winner ? "Winner: " + winner : "Next up: " + (xIsNext ? "X" : "O"));
</script>

<h4>{status}</h4>
<div class="board-row">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
  <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
</div>
<div class="board-row">
  <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
  <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
  <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
</div>
<div class="board-row">
  <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
  <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
  <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
</div>
