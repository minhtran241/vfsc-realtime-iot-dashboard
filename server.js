const axios = require('axios');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:1234',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

server.listen(8080);
console.log('Server listening on port :8080');

const DATA_URL = 'https://trace.vfsc.vn/iot/xxx?items=10';
io.on('connection', (socket) => {
  console.log('connected');
  setInterval(async () => {
    const res = await axios.get(DATA_URL);
    socket.broadcast.emit('stats_receive', res.data);
  }, 15000);
});
