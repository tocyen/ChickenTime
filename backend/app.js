const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const { MD5 } = require('crypto-js');

app.listen(80);

function handler (req, res) {
  res.writeHead(200);
  res.end();
}

const rooms = [];

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('CREATE_REQ', (data) => { createReq(data, socket.id) });
  socket.on('JOIN_REQ', (data) => { joinReq(data, socket.id) });
  socket.on('GAME_START_REQ', (data) => { gameStartReq(data, socket.id) });
});

function sendToRoom(label, roomId, data) {
  const room = rooms.find(x => x.rid === roomId);
  // io.sockets.socket(clientId).emit('ROOM_STATUS', roomStatus);
  Array.from(room.players.map(x => x.uid)).forEach((user) => {
    io.of('/').connected[user].emit(label, data);
  });
}

function createReq(data, id) {
  if( !data.name ) return;
  console.log('[CREATE_REQ]');
  const rid = `${Math.floor(Math.random() * 10000)}`.padStart(4, '0');
  const newRoom = {
    createTime: new Date(),
    started: false,
    rid,
    players: [
      {
        name: data.name,
        uid: id,
        admin: true,
      },
    ]
  };
  rooms.push(newRoom);
  const roomStatus = {
    rid,
    players: newRoom.players
  };
  sendToRoom('ROOM_STATUS', rid, roomStatus);
};

function joinReq(data, id) {
  if (!data.name) return;
  console.log('[JOIN_REQ]');
  const room = rooms.find(x => x.rid === data.rid);
  if(room){
    if (room.players.find(x => x.uid === id)) return;
    room.players.push({
      name: data.name,
      uid: id
    });
    const roomStatus = {
      rid: data.rid,
      players: room.players
    };
    sendToRoom('ROOM_STATUS', data.rid, roomStatus);
  }
}

function gameStartReq(data, id) {
  
}