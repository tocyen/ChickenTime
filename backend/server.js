const fs = require('fs');

let app;
if (process.env.https) {
  const https = require('https');

  const privateKey = fs.readFileSync('/etc/letsencrypt/live/nuk.noob.tw/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/nuk.noob.tw/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/nuk.noob.tw/chain.pem', 'utf8');

  app = https.createServer({
          key: privateKey,
          cert: certificate,
          ca: ca
  }, handler);
  app.listen(443);
} else {
  const http = require('http');
  app = http.createServer(handler)
  app.listen(80);
}

const io = require('socket.io')(app);
const moment = require('moment');



function handler (req, res) {
  res.writeHead(200);
  res.end();
}

const rooms = [];
const initialMoney = 45;

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('CREATE_REQ', (data) => { createReq(data, socket.id) });
  socket.on('JOIN_REQ', (data) => { joinReq(data, socket.id) });
  socket.on('GAME_START_REQ', (data) => { gameStartReq(data, socket.id) });
  socket.on('ROUND_START_REQ', (data) => { roundStartReq(data, socket.id) });
  socket.on('ROUND_END_REQ', (data) => { roundEndReq(data, socket.id) });
  socket.on('PURCHASE_REQ', (data) => { purchaseReq(data, socket.id) });
});

function sendToUser(label, uid, data) {
  io.of('/').connected[uid].emit(label, data);
}

function sendToRoom(label, roomId, data) {
  const room = rooms.find(x => x.rid === roomId);
  // io.sockets.socket(clientId).emit('ROOM_STATUS', roomStatus);
  console.log('[' + label + ' ' + roomId + ']')
  Array.from(room.players.map(x => x.uid)).forEach((user) => {
    sendToUser(label, user, data);
    // io.of('/').connected[user].emit(label, data);
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
        money: initialMoney,
        items: {knife: 0, shot: 0, feed: 0},
        actions: [],
        chickens: [],
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
      uid: id,
      money: initialMoney,
      items: {knife: 0, shot: 0, feed: 0},
      actions: [],
      chickens: [],
    });
    const roomStatus = {
      rid: data.rid,
      players: room.players
    };
    sendToRoom('ROOM_STATUS', data.rid, roomStatus);
  }
}

function gameStartReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[GAME_START_REQ ' + data.rid + ']');
  const admin = room.players.find(x => x.admin === true);
  if (admin.uid !== id) return;

  room.timeout = setTimeout(() => {
    sendToRoom('ROUND_END', data.rid, {
      rid: data.rid,
      nextSeason: 1,
    });
  }, 50 * 1000);
  const next45Seconds = moment().add(45, 'seconds').toISOString();

  room.started = true;
  room.currentSeason = 0;
  sendToRoom('ROUND_START', data.rid, {
    rid: data.rid,
    currentSeason: 0,
    endTime: next45Seconds,
  });
}

function roundStartReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[ROUND_START_REQ ' + data.rid + ']');
  const admin = room.players.find(x => x.admin === true);
  if (admin.uid !== id) return;

  room.currentSeason += 1;
  room.players.map(x => {
    x.end = false;
    delete x.end;
  });
  room.timeout = setTimeout(() => {
    sendToRoom('ROUND_END', data.rid, {
      rid: data.rid,
      nextSeason: room.currentSeason + 1,
    });
  }, 50 * 1000);
  const next45Seconds = moment().add(45, 'seconds').toISOString();

  sendToRoom('ROUND_START', data.rid, {
    rid: data.rid,
    currentSeason: room.currentSeason,
    endTime: next45Seconds,
  });
}

function roundEndReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[ROUND_END_REQ ' + data.rid + ']');

  const user = room.players.find(x => x.uid === id);
  user.end = true;

  if (room.players.filter(x => x.end === true).length === room.players.length) {
    clearTimeout(room.timeout);
    delete room.timeout;
    sendToRoom('ROUND_END', data.rid, {
      rid: data.rid,
      nextSeason: room.currentSeason + 1,
    });
  }
}

function purchaseReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[PURCHASE REQ]');

  const user = room.players.find(x => x.uid === id);
  if(!user || !data.item || !data.length) return;

  switch (data.item) {
    case 'knife':
      if (3 * data.length <= user.money) {
        user.money -= 3 * data.length;
        user.items.knife += data.length;
      }
      break;
    case 'feed':
      if (data.length <= user.money) {
        user.money -= data.length;
        user.items.feed += data.length;
      }
      break;
    case 'shot':
      if (data.length <= user.money) {
        user.money -= data.length;
        user.items.shot += data.length;
      }
      break;
    default:
      return;
  }

  sendToUser('USER_STATUS', user.uid, user);
}