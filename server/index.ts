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

const lobbies: {[k: string]: any} = {};

const games: {[k: string]: any} = {};

server.listen(3001, () => {
    console.log("server is running on port 3001...")
})

io.on("connection", (socket: any) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data : {room: string, is_host: boolean, nickname: string, avatar: string}) => {
        if (!(data.room in lobbies)) {
            if (data.is_host) {
                lobbies[data.room] = [{socketId: socket.id, nickname: data.nickname, avatar: data.avatar}];
            } else {
                // kick from room as the player is not a host
            }
        } else {
            if (data.is_host) {
                // then host should already be in the lobby
            }
            else {
                lobbies[data.room].append({socketId: socket.id, nickname: data.nickname, avatar: data.avatar});
            }
        }
        
        socket.join(data.room)
        // to all clients in room
        io.in(data.room).emit("player joined", lobbies[data.room]);
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    // we listen for this event from the clients
    socket.on('counter clicked', (data: {room: string, count: number}) => {
        // emit to EVERYONE the updated count
        socket.to(data.room).emit('counter updated', data.count);
    });
})

export {}