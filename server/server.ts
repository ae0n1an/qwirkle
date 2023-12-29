import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = require('http').createServer();
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
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

const lobbies: { [key: string]: {host: PlayerType; players: PlayerType[]} } = {};
const playerToLobby: {[playerId: string]: string} = {};

io.on('connection', (socket: any) => {
    const id = socket.handshake.query.id
    socket.join(id) // static id that remains even after reloading the page

    socket.on('send-message', ({recipients, text} : {recipients: string[], text: string}) => {
        recipients.forEach((recipiant: any) => {
            // filter out the current recipient from the recipients
            const newRecipiants = recipients.filter((r: any) => r !== recipiant)
            newRecipiants.push(id)
            socket.broadcast.to(recipiant).emit('receive-message', {
                recipiants: newRecipiants, sender: id, text
            })
        });
    })

    socket.on('create-lobby', ({lobbyId, player} : {lobbyId: string, player: PlayerType}) => {
        lobbies[lobbyId] = {host: player, players: [player]}
        playerToLobby[player.id] = lobbyId
        io.to(player.id).emit('receive-lobby', {lobbyId: lobbyId, lobby: lobbies[lobbyId]})
        console.log('new lobby created\nlobby id: %s host id: %s\n', lobbyId, player.id)
    });

    socket.on('join-lobby', ({lobbyId, newPlayer} : {lobbyId: string, newPlayer: PlayerType}) => {
        if (lobbyId in lobbies) {
            // add the newly joined player to the lobby
            lobbies[lobbyId].players = [...lobbies[lobbyId].players, newPlayer]
            playerToLobby[newPlayer.id] = lobbyId

            // iterate through the current players and emit the current lobby back to them
            lobbies[lobbyId].players.forEach((player: PlayerType) => {
                io.to(player.id).emit('receive-lobby', {lobbyId: lobbyId, lobby: lobbies[lobbyId]})
                //socket.broadcast.to(player.id).emit('receive-lobby', lobbies[lobbyId].players)
            });

            console.log('player added to lobby\nlobby id: %s player id: %s\n', lobbyId, newPlayer.id)

        }
        else {
            console.log('player tried to join nonexistent lobby\nlobby id: %s player id: %s\n', lobbyId, newPlayer.id)
        }
    });

    socket.on('start-game', ({playerId, game}: {playerId: string, game:any}) => {
        console.log('game started\nlobby id: %s player id: %s\n', playerToLobby[playerId], playerId)

        // iterate through the current players and emit the current game back to them
        lobbies[playerToLobby[playerId]].players.forEach((player: PlayerType) => {
            io.to(player.id).emit('game-started', {game: game})
        });
    });

    socket.on('update-game', ({playerId, game}: {playerId: string, game:any}) => {
        if (playerToLobby[playerId]) {
            console.log('game updated\nlobby id: %s player id: %s\n', playerToLobby[playerId], playerId)
            
            // iterate through the current players and emit the current game back to them
            lobbies[playerToLobby[playerId]].players.forEach((player: PlayerType) => {
                io.to(player.id).emit('game-updated', {game: game})
            });
        }
    });

    function leaveLobby(lobbyId: string, playerId:string) {
        if (lobbyId in lobbies) {
            // remove the players lobby
            delete playerToLobby[playerId]

            // remove player id from the lobby
            const index = lobbies[lobbyId].players.map(p => p.id).indexOf(playerId);
            if (index > -1) {
                lobbies[lobbyId].players.splice(index, 1);
                console.log('player removed from lobby\nlobby id: %s player id: %s\n', lobbyId, playerId)
            }

            // remove the lobbyId if the lobby is empty
            if (lobbies[lobbyId].players.length == 0) {
                delete lobbies[lobbyId]
                console.log('lobby removed\nlobby id: %s\n', lobbyId)
            }
            else if (lobbies[lobbyId].host.id == playerId) {
                // else re assign the lobby host to the next player
                lobbies[lobbyId].host = lobbies[lobbyId].players[0]
                console.log('lobby host changed to new player\nlobby id: %s new player id: %s\n', lobbyId, lobbies[lobbyId].players[0].id)
            }

            if (lobbyId in lobbies) {
                // iterate through the current lobby players and emit the current lobby back to them
                lobbies[lobbyId].players.forEach((player: PlayerType) => {
                    io.to(player.id).emit('receive-lobby', {lobbyId: lobbyId, lobby: lobbies[lobbyId]})
                });
            }

            // send the disconnected player back an empty lobby
            console.log('kicked player sent back empty lobby\nplayer id: %s\n', playerId)
            io.to(playerId).emit('receive-lobby', {lobbyId: "None", lobby: {
                host: {id: "", name: "", avatar: ""},
                players: []
            }})
        }
        else {
            console.log('player tried to leave a nonexistent lobby\nlobby id: %s player id: %s\n', lobbyId, playerId)
        }
    }

    socket.on('leave-lobby', ({lobbyId, playerId}: {lobbyId: string, playerId: string}) => {
        leaveLobby(lobbyId, playerId)
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log(`socket with user ID ${id} disconnected\n`);
        // Your handling logic here...
    });
/*
    // Set an initial timeout for 10 seconds to disconnect the socket if no heartbeat is received
    let disconnectTimeout: NodeJS.Timeout;

    function startDisconnectTimeout() {
        disconnectTimeout = setTimeout(() => {
            console.log(`No heartbeat received in 10 seconds from user with ID: ${id}\n`);
            leaveLobby(playerToLobby[id], id);
        }, 10000);
    }

    // Start the initial timeout
    startDisconnectTimeout();

    // Update the remaining time and reset the timeout if a heartbeat is received
    socket.on('heartbeat', () => {
        console.log(`Received heartbeat from user with ID: ${id}\n`);

        // Clear the existing timeout by setting it to null
        clearTimeout(disconnectTimeout);

        // Start the timeout with the remaining time
        startDisconnectTimeout();
    });
*/

})

export {}
