const io = require('socket.io')(5000, { origin: 'http://localhost:3000'})

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

    socket.on('leave-lobby', ({lobbyId, playerId}: {lobbyId: string, playerId: string}) => {
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
                console.log('lobby host changed to new player\nlobby id: %s player id: %s\n', lobbyId, playerId)

                // iterate through the current lobby players and emit the current lobby back to them
                lobbies[lobbyId].players.forEach((player: PlayerType) => {
                    io.to(player.id).emit('receive-lobby', {lobbyId: lobbyId, lobby: lobbies[lobbyId]})
                });
            }
        }
        else {
            console.log('player tried to leave a nonexistent lobby\nlobby id: %s player id: %s\n', lobbyId, playerId)
        }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        const lobbyId = playerToLobby[id]
        if (lobbyId in lobbies) {
            // remove the players lobby
            delete playerToLobby[id]

            // remove player id from the lobby
            const index = lobbies[lobbyId].players.map(p => p.id).indexOf(id);
            if (index > -1) {
                lobbies[lobbyId].players.splice(index, 1);
                console.log('player removed from lobby\nlobby id: %s player id: %s\n', lobbyId, id)
            }

            // remove the lobbyId if the lobby is empty
            if (lobbies[lobbyId].players.length == 0) {
                delete lobbies[lobbyId]
                console.log('lobby removed\nlobby id: %s\n', lobbyId)
            }
            else if (lobbies[lobbyId].host.id == id) {
                // else re assign the lobby host to the next player
                lobbies[lobbyId].host = lobbies[lobbyId].players[0]
                console.log('lobby host changed to new player\nlobby id: %s player id: %s\n', lobbyId, id)

                // iterate through the current lobby players and emit the current lobby back to them
                lobbies[lobbyId].players.forEach((player: PlayerType) => {
                    io.to(player.id).emit('receive-lobby', {lobbyId: lobbyId, lobby: lobbies[lobbyId]})
                });
            }
        }
        else {
            console.log('player tried to leave a nonexistent lobby\nlobby id: %s player id: %s\n', lobbyId, id)
        }
    });


})

export {}