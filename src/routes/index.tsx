import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tic Tac Toe — Get three in a row to win!" },
      {
        name: "description",
        content:
          "A clean, modern Tic-Tac-Toe game for two players. Take turns, win three in a row, and track the score. Play free on any device.",
      },
      { property: "og:title", content: "Tic Tac Toe — Get three in a row to win!" },
      {
        property: "og:description",
        content:
          "A clean, modern two-player Tic-Tac-Toe game with score tracking. Play free on any device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Player = "X" | "O";
type Cell = Player | null;
type Outcome = "playing" | "draw" | Player;

const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function evaluateBoard(board: Cell[]): {
  outcome: Outcome;
  winningLine: number[] | null;
} {
  for (const line of WINNING_LINES) {
    const a = line[0]!;
    const b = line[1]!;
    const c = line[2]!;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { outcome: board[a] as Player, winningLine: line };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { outcome: "draw", winningLine: null };
  }
  return { outcome: "playing", winningLine: null };
}

function Index() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [scores, setScores] = useState<{ X: number; O: number; draws: number }>(
    { X: 0, O: 0, draws: 0 },
  );

  const { outcome, winningLine } = useMemo(() => evaluateBoard(board), [board]);
  const isOver = outcome !== "playing";

  const handlePlay = useCallback(
    (index: number) => {
      if (board[index] !== null || isOver) return;
      const next = board.slice();
      next[index] = currentPlayer;
      setBoard(next);
      const result = evaluateBoard(next);
      if (result.outcome === "draw") {
        setScores((s) => ({ ...s, draws: s.draws + 1 }));
      } else if (result.outcome !== "playing") {
        setScores((s) => ({
          ...s,
          [result.outcome as Player]: s[result.outcome as Player] + 1,
        }));
      } else {
        setCurrentPlayer((p) => (p === "X" ? "O" : "X"));
      }
    },
    [board, isOver],
  );

  const playAgain = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }, []);

  const resetScore = useCallback(() => {
    setScores({ X: 0, O: 0, draws: 0 });
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }, []);

  const status = useMemo(() => {
    if (outcome === "draw") return { label: "It's a draw!", tone: "draw" as const };
    if (outcome === "X" || outcome === "O")
      return { label: `Player ${outcome} wins!`, tone: outcome as Player };
    return { label: `${currentPlayer} to move`, tone: currentPlayer as Player };
  }, [outcome, currentPlayer]);

  return (
    <div className="app-bg text-foreground font-display relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8 sm:py-12">
      <div className="card-shadow relative w-full max-w-md rounded-[2.5rem] bg-card/85 p-6 ring-1 ring-foreground/5 backdrop-blur-xl sm:p-9">
        <div className="flex flex-col items-center gap-6">
          <header className="text-center">
            <h1 className="text-5xl font-bold leading-none tracking-tight text-balance sm:text-6xl">
              Tic Tac Toe
            </h1>
            <p className="mt-3 text-pretty text-base text-foreground/60 sm:text-lg">
              Get three in a row to win! ✨
            </p>
          </header>

          {/* Scoreboard */}
          <div className="grid w-full grid-cols-3 gap-2.5 rounded-2xl bg-foreground/[0.04] p-3">
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-x/15 py-3">
              <span className="text-lg font-bold text-x">X</span>
              <span className="text-2xl font-bold leading-none">{scores.X}</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-foreground/[0.04] py-3">
              <span className="text-lg font-bold leading-none text-foreground/60">
                Draws
              </span>
              <span className="text-2xl font-bold leading-none">{scores.draws}</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-o/15 py-3">
              <span className="text-lg font-bold text-o">O</span>
              <span className="text-2xl font-bold leading-none">{scores.O}</span>
            </div>
          </div>

          {/* Turn / status indicator */}
          {status.tone === "draw" ? (
            <div className="flex items-center gap-2.5 rounded-full bg-foreground/[0.06] px-5 py-2.5 text-sm font-semibold">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-xs font-bold text-background">
                =
              </span>
              {status.label}
            </div>
          ) : isOver ? (
            <div
              className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold ${
                status.tone === "X" ? "bg-x/15 text-x" : "bg-o/15 text-o"
              }`}
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${
                  status.tone === "X" ? "bg-x" : "bg-o"
                }`}
              >
                {status.tone}
              </span>
              {status.label}
            </div>
          ) : (
            <div className="flex items-center gap-2.5 rounded-full bg-foreground/[0.04] px-5 py-2.5 ring-1 ring-foreground/5">
              <span
                className={`grid size-7 place-items-center rounded-full text-sm font-bold text-white ${
                  currentPlayer === "X" ? "bg-x" : "bg-o"
                }`}
              >
                {currentPlayer}
              </span>
              <span className="text-sm font-semibold text-foreground/70">
                {currentPlayer} to move
              </span>
            </div>
          )}

          {/* Board */}
          <div className="grid w-full grid-cols-3 gap-2.5" style={{ aspectRatio: "1" }}>
            {board.map((cell, index) => {
              const isWinning = winningLine?.includes(index) ?? false;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePlay(index)}
                  disabled={cell !== null || isOver}
                  aria-label={`Square ${index + 1}${
                    cell ? `, ${cell}` : ", empty"
                  }`}
                  className={`grid place-items-center rounded-2xl shadow-sm ring-1 ring-foreground/5 transition-all duration-150 ${
                    isWinning
                      ? "bg-celery/25 ring-2 ring-celery animate-win-pulse"
                      : "bg-card hover:-translate-y-1 hover:scale-[1.05] hover:shadow-md active:scale-95"
                  } ${cell !== null || isOver ? "cursor-default" : "cursor-pointer"}`}
                  style={{
                    animationDelay: isWinning
                      ? `${winningLine!.indexOf(index) * 0.1}s`
                      : undefined,
                  }}
                >
                  {cell && (
                    <span
                      className={`text-6xl font-bold drop-shadow-md ${
                        cell === "X" ? "text-x" : "text-o"
                      } ${isWinning ? "animate-token-drop" : "animate-pop-in"}`}
                    >
                      {cell}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={playAgain}
              className="rounded-full bg-gradient-to-r from-x to-o px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-x/30 ring-1 ring-white/20 transition-transform hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            >
              Play Again
            </button>
            <button
              type="button"
              onClick={resetScore}
              className="rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-foreground/60 ring-1 ring-foreground/10 transition-transform hover:-translate-y-0.5 hover:text-foreground active:scale-95"
            >
              Reset Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
