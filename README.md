# Tic Tac Toe Game

A clean, modern, and cute two-player **Tic-Tac-Toe** game built for the web.
Take turns placing X and O on a 3×3 grid, get three in a row to win, and keep
score across rounds. Designed to be responsive, accessible, and fun on any
device — desktop, tablet, or phone.

![Tic Tac Toe Game](https://tic-tac-tow-love.lovable.app/favicon.ico)

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How to Play](#how-to-play)
- [How to Run the Project Locally](#how-to-run-the-project-locally)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Project Description

**Tic Tac Toe Game** is a browser-based version of the classic paper-and-pencil
game. Two players (X and O) take turns marking squares on a 3×3 grid. The first
player to place three of their marks in a horizontal, vertical, or diagonal
line wins the round. If all nine squares are filled with no winner, the round
ends in a draw.

This project was built as a student exercise to practice modern front-end
development with React, TypeScript, and Tailwind CSS. The focus is on clean
game logic, a polished and playful UI, and a fully responsive layout that
works on any screen size.

---

## Features

- **Two-player local play** — X and O take turns on the same device.
- **Win detection** — the winning row, column, or diagonal is highlighted.
- **Draw detection** — a full board with no winner is recognised as a draw.
- **Score tracking** — keeps a running tally of X wins, O wins, and draws.
- **Play Again** — instantly clears the board for the next round while
  keeping the score.
- **Reset Score** — clears both the board and the score tally to start fresh.
- **Turn indicator** — a labelled pill shows whose turn it is at all times.
- **Playful animations** — marks pop in, winning squares pulse, and tiles
  lift on hover for a polished, "cute" feel.
- **Fully responsive** — looks great on phones, tablets, and desktops.
- **Accessible** — keyboard-friendly buttons with descriptive ARIA labels
  for every square.

---

## Technologies Used

| Technology | Purpose |
| --- | --- |
| [React 19](https://react.dev) | UI library for building the game interface |
| [TypeScript](https://www.typescriptlang.org) | Type-safe game logic and components |
| [TanStack Start](https://tanstack.com/start) | Full-stack React framework (routing & SSR) |
| [TanStack Router](https://tanstack.com/router) | File-based routing |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling and theming |
| [Vite](https://vitejs.dev) | Fast dev server and build tool |
| [Fredoka](https://fonts.google.com/specimen/Fredoka) | Rounded display font for the playful look |

---

## How to Play

1. Open the game in your browser.
2. **Player X** always moves first. Click any empty square to place an **X**.
3. **Player O** then clicks an empty square to place an **O**.
4. Players continue taking turns.
5. The first player to line up **three of their marks** in a row (horizontally,
   vertically, or diagonally) wins the round.
6. If all nine squares are filled with no winner, the round is a **draw**.
7. Click **Play Again** to start a new round — the score is kept.
8. Click **Reset Score** to clear the board and reset all scores to zero.

---

## How to Run the Project Locally

### Prerequisites

- [Node.js](https://nodejs.org) 18 or higher
- [npm](https://www.npmjs.com) (bundled with Node.js)

### Steps

1. **Clone the repository**

   ```sh
   git clone <your-repository-url>
   cd tic-tac-toe-game
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start the development server**

   ```sh
   npm run dev
   ```

4. **Open the game**

   The dev server prints a local URL (usually
   `http://localhost:8080` or `http://localhost:3000`). Open it in your browser
   and start playing!

### Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |
| `npm run format` | Format the codebase with Prettier |

---

## Project Structure

```
tic-tac-toe-game/
├── public/
│   ├── favicon.ico          # Browser tab icon
│   └── robots.txt           # Search engine crawler rules
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI primitives (shadcn-style)
│   ├── hooks/
│   │   └── use-mobile.tsx   # Hook to detect mobile viewport
│   ├── lib/
│   │   ├── utils.ts          # Helper utilities (cn, etc.)
│   │   ├── error-capture.ts  # Error capture helpers
│   │   └── lovable-error-reporting.ts
│   ├── routes/
│   │   ├── __root.tsx        # App shell: layout, fonts, global head metadata
│   │   ├── index.tsx         # The Tic-Tac-Toe game page (home route "/")
│   │   └── README.md         # Notes on file-based routing
│   ├── router.tsx            # Router instance & configuration
│   ├── start.ts              # TanStack Start entry & middleware
│   ├── server.ts             # Server entry point
│   ├── styles.css            # Global styles, theme tokens & animations
│   └── routeTree.gen.ts      # Auto-generated route tree (do not edit)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

> **Note:** `src/routeTree.gen.ts` is auto-generated by the TanStack Router
> plugin. Never edit it by hand — it regenerates whenever routes change.

---

## Future Improvements

- **Single-player mode** — play against a computer opponent with selectable
  difficulty (easy, medium, unbeatable using the minimax algorithm).
- **Online multiplayer** — play against a friend over the internet using
  real-time sync via a backend (e.g. Lovable Cloud / Supabase).
- **Player names** — let players enter custom names instead of "X" and "O".
- **Win streak tracking** — show the longest current win streak per player.
- **Game history** — record and review past rounds.
- **Sound effects** — subtle pop/win sounds for better feedback.
- **Theme switcher** — light/dark mode toggle and additional colour themes.
- **Score persistence** — save scores to local storage or a database so they
  survive page reloads.
- **Animations & confetti** — a celebratory effect when a player wins.

---

## License

This project is open source and available under the [MIT License](LICENSE).
Feel free to use it for learning, portfolios, or your own experiments.

---

> Built with ❤️ as a student project using React, TypeScript, and Tailwind CSS.
