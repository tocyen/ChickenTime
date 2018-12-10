const express = require('express');
const http = require('http');
const socket = require('socket.io');
const port = 8080

const app = express();

const server = http.createServer(app)

const io = socket(server)


const onlineUsers = {};

const onlineCount = 0;



io.on('connection', (socket) => {
    socket.on('login', function(obj){
        socket.id = obj.uid;
        if(!onlineUsers.hasOwnProperty(obj.uid)){
            onlineUsers[obj.uid] = obj.username;
            onlineCount++;
        }
    })

    socket.on('disconnect', function(){
        if(onlineUsers.hasOwnProperty(socket.id)) {
            var obj = {uid:socket.id, username:onlineUsers[socket.id]};

            delete onlineUsers[socket.id];
            onlineCount--;

            io.emit('logout', {onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj});
            console.log(obj.username + 'Left')
        }
    })

        socket.on('SEND_MESSAGE', function(data){
            io.emit('RECEIVE_MESSAGE', data);
    });
})

server.listen(port, ()=> console.log(`Listening on port ${port}`))