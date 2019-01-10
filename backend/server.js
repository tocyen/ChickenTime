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
  app.listen(443, () => {
    console.log('ChickenTime server started.');
  });
} else {
  const http = require('http');
  app = http.createServer(handler)
  app.listen(80, () => {
    console.log('ChickenTime server started.');
  });
}

const io = require('socket.io')(app);
const moment = require('moment');



function handler(req, res) {
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
  // socket.on('ROUND_START_REQ', (data) => { roundStartReq(data, socket.id) });
  socket.on('ROUND_END_REQ', (data) => { roundEndReq(data, socket.id) });
  socket.on('PURCHASE_REQ', (data) => { purchaseReq(data, socket.id) });
  socket.on('ACTION_REQ', (data) => { actionReq(data, socket.id) });

  socket.on('FEED_REQ', (data) => { feedReq(data, socket.id) });
  socket.on('SEX_REQ', (data) => { sexReq(data, socket.id) });
  socket.on('SELL_REQ', (data) => { sellReq(data, socket.id) });
  socket.on('KILL_REQ', (data) => { killReq(data, socket.id) });
  socket.on('SHOT_REQ', (data) => { shotReq(data, socket.id) });
});

function sendToUser(label, uid, data) {
  console.log('[USER_STATUS]');
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

function sendGlobalStatus(roomId) {
  const room = rooms.find(x => x.rid === roomId);

  const globalStat = room.players.map(x => ({
    name: x.name,
    uid: x.uid,
    money: x.money,
  }));

  sendToRoom('GLOBAL_STATUS', roomId, globalStat);
}

function createReq(data, id) {
  if (!data.name) return;
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
        items: { knife: 0, shot: 0, feed: 0 },
        actions: { feed: 0, sex: 0, buy: 0, sell: 0 },
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
  if (room) {
    if (room.players.find(x => x.uid === id)) return;
    room.players.push({
      name: data.name,
      uid: id,
      money: initialMoney,
      items: { knife: 0, shot: 0, feed: 0 },
      actions: { feed: 0, sex: 0, buy: 0, sell: 0 },
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

  // room.timeout = setTimeout(() => {
  //   sendToRoom('ROUND_END', data.rid, {
  //     rid: data.rid,
  //     nextSeason: 1,
  //   });
  // }, 50 * 1000);
  // const next45Seconds = moment().add(45, 'seconds').toISOString();

  room.started = true;
  room.currentSeason = -1;
  sendToRoom('GAME_START', data.rid, {
    rid: data.rid,
    currentSeason: -1,
    // endTime: next45Seconds,
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
    room.players.map(user => {
      user.end = false;
      user.chickens.map(c => {
        if (!c.shot && Math.random() > 0.9) {
          c.sick = true;
        };
      });
      delete user.end;
    });
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
  if (!user || !data.item) return;
  if (room.currentSeason >= 0 && user.actions.purchase <= 0) return;

  switch (data.item) {
    case 'knife':
      if (3 <= user.money) {
        user.money -= 3;
        user.items.knife += 1;
      }
      break;
    case 'feed':
      if (1 <= user.money) {
        user.money -= 1;
        user.items.feed += 1;
      }
      break;
    case 'shot':
      if (1 <= user.money) {
        user.money -= 1;
        user.items.shot += 1;
      }
      break;
    case 'chick_s':
      if (6 <= user.money) {
        user.money -= 6;
        user.chickens.push({
          size: 'S',
          gender: (Math.random() <= 0.5 ? 'M' : 'F'),
          shot: false
        });
      }
      break;
    case 'chick_m':
      if (10 <= user.money) {
        user.money -= 10;
        user.chickens.push({
          size: 'M',
          gender: (Math.random() <= 0.5 ? 'M' : 'F'),
          shot: false
        });
      }
      break;
    case 'chick_l':
      if (15 <= user.money) {
        user.money -= 15;
        user.chickens.push({
          size: 'L',
          gender: (Math.random() <= 0.5 ? 'M' : 'F'),
          shot: false
        });
      }
      break;
    default:
      return;
  }
  if (room.currentSeason >= 0) user.actions.purchase -= 1;
  sendToUser('USER_STATUS', user.uid, user);
  sendGlobalStatus(data.rid);
}

function actionReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[ACTION_REQ ' + data.rid + ']');

  const user = room.players.find(x => x.uid === id);
  switch (data.item) {
    case 'feed':
    case 'sex':
    case 'purchase':
    case 'sell':
      user.actionEnd = data.item;
      break;
    default:
      return;
  }

  if (room.players.filter(x => x.actionEnd).length === room.players.length) {
    const feedUser = room.players.filter(x => x.actionEnd && x.actionEnd === 'feed');
    const sexUser = room.players.filter(x => x.actionEnd && x.actionEnd === 'sec');
    const purchaseUser = room.players.filter(x => x.actionEnd && x.actionEnd === 'purchase');
    const sellUser = room.players.filter(x => x.actionEnd && x.actionEnd === 'sell');

    if (feedUser.length > 0) {
      const maxSize = Math.floor(Math.random() * 24) + 1;
      feedUser.map(user => { user.actions.feed += Math.floor(maxSize / feedUser.length); });
    }
    if (sexUser.length > 0) {
      const maxSize = Math.floor(Math.random() * 24) + 1;
      sexUser.map(user => { user.actions.sex += Math.floor(maxSize / sexUser.length); });
    }
    if (purchaseUser.length > 0) {
      const maxSize = Math.floor(Math.random() * 24) + 1;
      purchaseUser.map(user => { user.actions.purchase += Math.floor(maxSize / purchaseUser.length); });
    }
    if (sellUser.length > 0) {
      const maxSize = Math.floor(Math.random() * 24) + 1;
      sellUser.map(user => { user.actions.sell += Math.floor(maxSize / sellUser.length); });
    }

    room.players.map(user => {
      user.actionEnd = false;
      delete user.actionEnd;
      sendToUser('USER_STATUS', user.uid, user);
    });

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
}

function feedReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[FEED_REQ ' + data.rid + ']');

  const user = room.players.find(x => x.uid === id);
  if (!user || !data.cid) return;

  if (user.items.feed <= 0 || user.actions.feed <= 0) return;

  const chick = user.chickens.find(x => x.cid === data.cid);
  if (!chick) return;
  if (chick.size === 'L') return;

  if (chick.size === 'S') {
    chick.size = 'M';
  } else if (chick.size === 'M') {
    chick.size = 'L';
  }
  user.actions.feed -= 1;
  user.items.feed -= 1;

  sendToUser('USER_STATUS', id, user);
}

function sexReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[SEX_REQ ' + data.rid + ']');

  const user = room.players.find(x => x.uid === id);
}

function sellReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[SELL_REQ ' + data.rid + ']');

  const user = room.players.find(x => x.uid === id);
  if (!user || !data.cid) return;
  if (user.actions.sell <= 0) return;

  const chick = user.chickens.find(x => x.cid === data.cid);
  if (!chick) return;

  switch (chick.size) {
    case 'S':
      user.money += 4;
      break;
    case 'M':
      user.money += 8;
      break;
    case 'L':
      user.money += 13;
      break;
    default:
      return;
  }
  user.chickens = user.chickens.filter(x => x.cid !== data.cid);

  user.actions.sell -= 1;
  sendToUser('USER_STATUS', id, user);
  sendGlobalStatus(data.rid);
}

function killReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[KILL_REQ ' + data.rid + ']');

  const user = room.players.find(x => x.uid === id);
  if (!user || !data.cid) return;

  if (user.items.knife <= 0) return;

  const chick = user.chickens.find(x => x.cid === data.cid);
  if (!chick) return;

  user.chicken = user.chicken.filter(x => x.cid !== data.cid);

  user.items.knife -= 1;
  sendToUser('USER_STATUS', id, user);
}

function shotReq(data, id) {
  const room = rooms.find(x => x.rid === data.rid);
  if (!room) return;
  console.log('[SHOT_REQ ' + data.rid + ']');

  const user = room.players.find(x => x.uid === id);
  if (!user || !data.cid) return;

  if (user.items.shot <= 0) return;

  const chick = user.chickens.find(x => x.cid === data.cid);
  if (!chick || chick.shot) return;

  chick.shot = true;
  user.items.shot -= 1;
  sendToUser('USER_STATUS', id, user);
}