const messageService = require('./services/messages');

class SocketHandler {
  constructor(io) {
    io.on('connection', socket => this._connect(socket));
  }

  _connect(socket) {
    console.info('New socket connected.');
    socket.on('start_message_stream', (data) => {
      console.info('received start_message_stream req', data);
      messageService.startMessageStreaming(socket, data.sessionId, data.keyword);
    });
    socket.on('disconnect', (data) => {
      console.log('disconnected...');
    });
  }

}

module.exports = SocketHandler;