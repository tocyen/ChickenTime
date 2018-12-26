const express = require('express');
const http = require('http');
const socket = require('socket.io');
const port = 8080
const app = express();

const server = http.createServer(app)
const io = socket(server)


const roomInfo = {}; //房間使用者名稱單

io.on('connection', (client) => {

    client.on('send_message', function(data){
        io.emit('receive_message', data);
    });
})

server.listen(port, ()=> console.log(`Listening on port ${port}`))