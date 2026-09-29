# Memory Game

**Memory Game** is a browser-based game designed to improve memory and concentration. The goal is to find all matching pairs of cards by flipping two cards at a time.

## Features

- **Card-based gameplay:** Cards are initially displayed face down.
- **Flip animation:** Cards rotate around their vertical axis to reveal their images.
- **Pair matching:** Matched cards remain face up, while unmatched cards are flipped back after a short delay.
- **Turns counter:** Tracks the number of turns made during a game.
- **Victory screen:** Displays a victory message and the final number of turns.
- **Leaderboard:** Stores and displays up to 10 best results.
- **Persistent results:** Leaderboard records are saved in `localStorage` and remain available after page reloads.
- **Responsive interface:** The game board adapts to different screen sizes.

## Technologies

- JavaScript (ES Modules)
- HTML5
- CSS3 / SCSS
- Vite
- ESLint
- Prettier

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — the latest LTS version is recommended.
- npm — included with Node.js.
- Git — required to clone the repository.

### Installation and Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:andrewfroze/memory-game.git
   ```

2. Navigate to the project directory:

   ```bash
   cd memory-game
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the URL displayed in the terminal. By default:

   ```text
   http://localhost:5173/memory-game/
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check the code |
| `npm run format` | Format the code using Prettier |
| `npm run deploy` | Build and deploy the project to GitHub Pages |

## Production Build

To create a production build, run:

```bash
npm run build
```

The generated files will be available in the `dist/` directory.

To preview the production build locally, run:

```bash
npm run preview
```

## Deployment

To build and deploy the project to GitHub Pages, run:

```bash
npm run deploy
```

This command builds the project and publishes the contents of the `dist/` directory using `gh-pages`.

## Author

**andrewfroze**
