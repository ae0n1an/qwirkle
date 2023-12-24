const io = require('socket.io')(5000, { origin: 'http://localhost:3000'})

type PlayerType = {
    id: string,
    name: string,
    avatar: string
}

const lobbies: { [key: string]: {host: PlayerType; players: PlayerType[]} } = {};

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
        console.log('new lobby created\nlobby id: %s host id: %s\n', lobbyId, player.id)
    });

    socket.on('join-lobby', ({lobbyId, newPlayer} : {lobbyId: string, newPlayer: PlayerType}) => {
        if (lobbyId in lobbies) {
            // add the newly joined player to the lobby
            lobbies[lobbyId].players = [...lobbies[lobbyId].players, newPlayer]

            // iterate through the current players and emit the current lobby back to them
            lobbies[lobbyId].players.forEach((player: PlayerType) => {
                io.to(player.id).emit('receive-lobby', lobbies[lobbyId].players)
                //socket.broadcast.to(player.id).emit('receive-lobby', lobbies[lobbyId].players)
            });

            console.log('player added to lobby\nlobby id: %s player id: %s\n', lobbyId, newPlayer.id)

        }
        else {
            console.log('player tried to join nonexistent lobby\nlobby id: %s player id: %s', lobbyId, newPlayer.id)
        }
    });

    
})

export {}