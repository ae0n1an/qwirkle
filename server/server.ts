const io = require('socket.io')(5000, { origin: 'http://localhost:3000'})

io.on('connection', (socket: any) => {
    const id = socket.handshake.query.id
    socket.join(id) // static id that remains even after reloading the page

    socket.on('send-message', ({recipiants, text} : {recipiants: any, text: string}) => {
        recipiants.forEach((recipiant: any) => {
            // filter out the current recipient from the recipients
            const newRecipiants = recipiants.filter((r: any) => r !== recipiant)
            newRecipiants.push(id)
            socket.broadcast.to(recipiant).emit('receive-message', {
                recipiants: newRecipiants, sender: id, text
            })
        });
    })
})

export {}