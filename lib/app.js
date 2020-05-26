const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
  path: '/socket'
});
const cookieParser = require('cookie-parser');
const serverConfig = require('config').server;

const Routes = require('./routes');
const SocketHandler = require('./socket');

app.use(cookieParser());
app.use('/', new Routes());
app.use(express.static('build'))

server.listen(process.env.PORT || serverConfig.port, (err) => {
  if (err) {
    console.log('Error while starting server:', err);
    process.exit(1);
  } else console.log('Server successfully started at the port:', process.env.PORT || serverConfig.port);
});

new SocketHandler(io);