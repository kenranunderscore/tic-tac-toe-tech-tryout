import { createSignal, type Component } from "solid-js";
import * as ttt from "tic-tac-toe-ts";

const App: Component = () => {
  const [history, setHistory] = createSignal<ttt.History>([ttt.createInitialBoard()]);
  const [currentMove, setCurrentMove] = createSignal<number>(0);

  const currentSquares = () => history()![currentMove()];
  const xIsNext = () => currentMove() % 2 === 0;

  function handlePlay(nextSquares: ttt.Board) {
    const nextHistory = [...history()!.slice(0, currentMove() + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = () =>
    history().map((_, move) => {
      return (
        <li>
          <button onClick={() => setCurrentMove(move)}>Rewind</button>
        </li>
      );
    });

  return (
    <div class="game">
      <div class="game-board">
        <Board xIsNext={xIsNext()} squares={currentSquares()} onPlay={handlePlay} />
      </div>
      <div class="game-info">
        <h4>Move history</h4>
        <ol>{moves()}</ol>
      </div>
    </div>
  );
};

type BoardProps = { squares: ttt.Board; xIsNext: boolean; onPlay: (board: ttt.Board) => void };

const Board: Component<BoardProps> = (props) => {
  function handleClick(i: number) {
    if (ttt.determineWinner(props.squares) || props.squares[i]) {
      return;
    }

    const nextSquares = props.squares.slice();
    nextSquares[i] = props.xIsNext ? "X" : "O";
    props.onPlay(nextSquares);
  }

  const winner = () => ttt.determineWinner(props.squares);
  const status = () => {
    const w = winner();
    if (w) {
      return `Winner: ${w}`;
    } else {
      return "Next player: " + (props.xIsNext ? "X" : "O");
    }
  };

  return (
    <>
      <h4>{status()}</h4>
      <div class="board-row">
        <Square value={props.squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={props.squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={props.squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div class="board-row">
        <Square value={props.squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={props.squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={props.squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div class="board-row">
        <Square value={props.squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={props.squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={props.squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};

type SquareProps = { value: string | null; onSquareClick: () => void };

const Square: Component<SquareProps> = (props) => {
  return (
    <button class="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
};

export default App;
