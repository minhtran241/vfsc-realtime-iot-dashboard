const axios = require('axios');
const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:1234',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Constants
const PORT = parseInt(process.env.PORT, 10) || 8080;
const INIT_DATA_URL = 'https://trace.vfsc.vn/iot/xxx?items=*';
const DATA_URL = 'https://trace.vfsc.vn/iot/xxx';
const BROADCAST_INTERVAL = 15000;

let data = null;
let tableData = null;
let total = 0;
let plan = null;
let lastUpdated = new Date().toLocaleString();
data = axios.get(INIT_DATA_URL).then((res) => {
  total = res.data.data.length;
  plan = res.data.plan;
  data = res.data.data;
  tableData = [...data];
});

app.get('/health', (req, res) => {
  res.json({ status: 'Alive' });
});

app.post('/signal', (req, res) => {
  if (req.body.data.length > 0) {
    processNewData(req.body.data[0], true);
    res.json({ status: 'Received Data' });
  } else res.json({ status: 'Request Body Empty' });
});

server.listen(PORT);
console.log('Server listening on port', PORT);

io.on('connection', (socket) => {
  console.log('connected');
  if (!data) {
    while (!data) {
      axios.get(INIT_DATA_URL).then((res) => {
        total = res.data.data.length;
        plan = res.data.plan;
        data = res.data.data;
        tableData = [...data];
        lastUpdated = new Date().toLocaleString();
      });
    }
  }
  io.emit('stats_receive', { lastUpdated, plan, total, data, tableData });

  setInterval(async () => {
    const res = await axios.get(DATA_URL);
    processNewData(res.data.data[0], false);
  }, BROADCAST_INTERVAL);
});

const processNewData = (newData, isPostRequest) => {
  let insertNewData = false;
  if (newData) {
    insertNewData = true;
    const isValid = data.find(
      (obj) =>
        newData.Id === obj.Id && parseInt(newData.Time) <= parseInt(obj.Time)
    );
    if (isValid) return;
    if (data.length >= 10) data.shift();
    total += 1;
    data.push(newData);
    tableData.push(newData);
    lastUpdated = new Date().toLocaleString();
    io.emit('stats_receive', { lastUpdated, plan, total, data, tableData });
  }
  if (!isPostRequest && !insertNewData) {
    data = [];
    tableData = [];
  }
};
