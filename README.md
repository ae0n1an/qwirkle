# Qwirkle

A web-based multiplayer version of the board game [Qwirkle](https://en.wikipedia.org/wiki/Qwirkle) — place tiles that share a colour or shape to score points.

Built with React + TypeScript on the frontend and a Node.js + Socket.io server for real-time multiplayer.

## Features

- **Online multiplayer** — create a lobby, share the invite link, and play with friends in real-time
- **Local play** — play a 4-player local game instantly, no account needed
- **Responsive UI** — works on desktop and mobile (portrait layout with board + tile rack)

## Running locally

### Frontend

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. The "Play Locally with 4 players" button works without a server.

### Server (for online multiplayer)

```bash
cd server
npm install
npm run devStart
```

The server runs on port `5000` by default. The client connects to `https://qworkle-server.onrender.com` by default — to point it at your local server instead, update the URL in `src/contexts/SocketProvider.tsx`.

## How to play online

1. One player clicks **Host Game**, enters a nickname and picks a colour
2. Share the **invite link** (copy button in the lobby)
3. Other players open the link — it auto-fills the lobby code
4. Once 2–4 players have joined, the host clicks **Start Game**

## Architecture

```
/src                React frontend
  /classes          Game domain model (Board, Player, Game, Token, Position)
  /contexts         React context providers (Socket, Players, Game)
  /pages            Route-level components (Home, Lobby, Game)
/server             Node.js + Socket.io server
```

The game state is serialised/deserialised over Socket.io so all players stay in sync. Disconnect detection uses a per-player 30-second heartbeat timeout.
