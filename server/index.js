const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
const { Console } = require('console');
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});


server.listen(3001, () => {
    console.log("server is running on port 3001...")
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        console.log(data)
        console.log(`User ${socket.id} joined room ${data.room}`)
        socket.join(data.room)
    })

    socket.on("send_message", (data) => {
        console.log(`User ${socket.id} sent message ${data.message} room ${data.room}`)
        socket.to(data.room).emit("recieve_message", data.message)
    })
}) 