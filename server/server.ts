import { Server } from "socket.io";

const httpServer = require('http').createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});

type PlayerType = {
    id: string,
    name: string,
    avatar: string
}

const lobbies: { [key: string]: { host: PlayerType; players: PlayerType[] } } = {};
const playerToLobby: { [playerId: string]: string } = {};

// One timeout per player (not per lobby)
const playerTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function startPlayerTimeout(playerId: string) {
    clearTimeout(playerTimeouts.get(playerId));
    playerTimeouts.set(playerId, setTimeout(() => {
        const lobbyId = playerToLobby[playerId];
        console.log(`No heartbeat from player ${playerId} — removing from lobby ${lobbyId ?? 'unknown'}`);
        if (lobbyId) leaveGame(lobbyId, playerId);
        playerTimeouts.delete(playerId);
    }, 30000));
}

function clearPlayerTimeout(playerId: string) {
    clearTimeout(playerTimeouts.get(playerId));
    playerTimeouts.delete(playerId);
}

function leaveGame(lobbyId: string, playerId: string) {
    if (!(lobbyId in lobbies)) {
        console.log('player tried to leave a nonexistent lobby — lobbyId: %s playerId: %s', lobbyId, playerId);
        return;
    }

    delete playerToLobby[playerId];

    const index = lobbies[lobbyId].players.findIndex(p => p.id === playerId);
    if (index > -1) {
        lobbies[lobbyId].players.splice(index, 1);
        console.log('player removed from lobby — lobbyId: %s playerId: %s', lobbyId, playerId);
    }

    if (lobbies[lobbyId].players.length === 0) {
        delete lobbies[lobbyId];
        console.log('lobby removed — lobbyId: %s', lobbyId);
        return;
    }

    // Reassign host if needed
    if (lobbies[lobbyId].host.id === playerId) {
        lobbies[lobbyId].host = lobbies[lobbyId].players[0];
        console.log('lobby host reassigned — lobbyId: %s newHostId: %s', lobbyId, lobbies[lobbyId].players[0].id);
    }

    // Notify remaining players
    lobbies[lobbyId].players.forEach((player: PlayerType) => {
        io.to(player.id).emit('receive-lobby', { lobbyId, lobby: lobbies[lobbyId] });
    });

    // Tell the leaving player to go home
    io.to(playerId).emit('disconnected-from-game');
    console.log('emitted disconnected-from-game to player %s', playerId);
}

io.on('connection', (socket: any) => {
    const id: string = socket.handshake.query.id;
    socket.join(id);
    console.log('socket connected — playerId: %s', id);

    socket.on('create-lobby', ({ lobbyId, player }: { lobbyId: string; player: PlayerType }) => {
        lobbies[lobbyId] = { host: player, players: [player] };
        playerToLobby[player.id] = lobbyId;
        io.to(player.id).emit('receive-lobby', { lobbyId, lobby: lobbies[lobbyId] });
        startPlayerTimeout(player.id);
        console.log('lobby created — lobbyId: %s hostId: %s', lobbyId, player.id);
    });

    socket.on('join-lobby', ({ lobbyId, newPlayer }: { lobbyId: string; newPlayer: PlayerType }) => {
        if (!(lobbyId in lobbies)) {
            console.log('join attempt for nonexistent lobby — lobbyId: %s playerId: %s', lobbyId, newPlayer.id);
            return;
        }

        lobbies[lobbyId].players = [...lobbies[lobbyId].players, newPlayer];
        playerToLobby[newPlayer.id] = lobbyId;

        lobbies[lobbyId].players.forEach((player: PlayerType) => {
            io.to(player.id).emit('receive-lobby', { lobbyId, lobby: lobbies[lobbyId] });
        });

        startPlayerTimeout(newPlayer.id);
        console.log('player joined lobby — lobbyId: %s playerId: %s', lobbyId, newPlayer.id);
    });

    socket.on('rejoin-lobby', ({ lobbyId, playerId }: { lobbyId: string; playerId: string }) => {
        if (!(lobbyId in lobbies)) {
            console.log('rejoin attempt for nonexistent lobby — lobbyId: %s playerId: %s', lobbyId, playerId);
            return;
        }

        const inLobby = lobbies[lobbyId].players.some(p => p.id === playerId);
        if (inLobby) {
            io.to(playerId).emit('receive-lobby', { lobbyId, lobby: lobbies[lobbyId] });
            console.log('player rejoined lobby — lobbyId: %s playerId: %s', lobbyId, playerId);
        } else {
            console.log('rejoin rejected — player not in lobby — lobbyId: %s playerId: %s', lobbyId, playerId);
        }
    });

    socket.on('start-game', ({ playerId, game }: { playerId: string; game: any }) => {
        const lobbyId = playerToLobby[playerId];
        if (!lobbyId) return;

        console.log('game started — lobbyId: %s playerId: %s', lobbyId, playerId);
        lobbies[lobbyId].players.forEach((player: PlayerType) => {
            io.to(player.id).emit('game-started', { game });
        });
    });

    socket.on('update-game', ({ playerId, game }: { playerId: string; game: any }) => {
        const lobbyId = playerToLobby[playerId];
        if (!lobbyId) return;

        console.log('game updated — lobbyId: %s playerId: %s', lobbyId, playerId);
        lobbies[lobbyId].players.forEach((player: PlayerType) => {
            io.to(player.id).emit('game-updated', { game });
        });
    });

    socket.on('leave-game', ({ lobbyId, playerId }: { lobbyId: string; playerId: string }) => {
        clearPlayerTimeout(playerId);
        leaveGame(lobbyId, playerId);
    });

    socket.on('heartbeat', () => {
        io.to(id).emit('heartbeat-received');
        if (playerToLobby[id]) {
            startPlayerTimeout(id); // resets this player's 30s window
        }
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected — playerId: %s', id);
        clearPlayerTimeout(id);
        const lobbyId = playerToLobby[id];
        if (lobbyId) leaveGame(lobbyId, id);
    });
});

export {}
