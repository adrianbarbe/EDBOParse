const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const models = require('./models');

const io = socketIo(server, {
    origins: "http://localhost:* http://127.0.0.1:*",
});

io.on('connection', (socket) => {
    console.log("io on connect");
});

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

const port = process.env.PORT || 9000;

require('./routes')(app, io);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(path.join(__dirname, '/client', '/dist'), 'index.html'));
});

// start the server on specified port
// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
    server.listen(port);
    console.log('Server runs on port ' + port);
});
