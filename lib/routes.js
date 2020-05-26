const express = require('express');

const messageController = require('./controllers/messages');
const MessageValidator = require('./middleware/validator/messageValidator');
class Routes extends express.Router {
  constructor() {
    super();
    const messageValidator = new MessageValidator()
    this.get('/messages', messageValidator.validateGetMessages, messageController.getMessages);
    this.get('/messages/new', messageValidator.validateGetNewMessages, messageController.getNewMessages);
  }
}

module.exports = Routes;