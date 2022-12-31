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

// Constants
const PORT = 8080;
const INIT_DATA_URL = 'https://trace.vfsc.vn/iot/xxx?items=*';
const DATA_URL = 'https://trace.vfsc.vn/iot/xxx';
const BROADCAST_INTERVAL = 15000;

let data = null;
let tableData = null;
data = axios.get(INIT_DATA_URL).then((res) => {
  data = res.data.data;
  tableData = data;
});

server.listen(PORT);
console.log('Server listening on port', PORT);

io.on('connection', (socket) => {
  console.log('connected');
  if (!data)
    while (!data) {
      axios.get(INIT_DATA_URL).then((res) => {
        data = res.data.data;
        tableData = data;
      });
    }
  io.emit('stats_receive', { data, tableData });

  setInterval(async () => {
    const res = await axios.get(DATA_URL);
    const newData = res.data.data[0];
    if (
      newData.Id === data.slice(-1)[0].Id &&
      newData.Time === data.slice(-1)[0].Time
    )
      return;
    data.shift();
    data.push(newData);
    tableData.push(newData);
    io.emit('stats_receive', { data, tableData });
  }, BROADCAST_INTERVAL);
});
