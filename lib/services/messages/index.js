const TwitterManager = require('./twitterManager');
const config = require('config')

class Messages {
  constructor() {
    this.sessionStore = {};
    this._timer = null;
  }

  /**
   * it will call the twitter manager search api to get messages based on keyword
   * @param {string} keyword 
   */
  getMessages(keyword) {
    return new TwitterManager().getMessages(keyword);
  }
  /**
   * this function will return new (twitter streamed messages using sessionId)
   * @param {UUID} sessionId 
   */
  getNewMessages(sessionId) {
    this.sessionStore[sessionId].date = new Date();
    return {
      result: this.sessionStore[sessionId].newMessages.splice(0, config.messages.displayCount)
    };
  }
  /**
   * streaming will be started for searched keyword.
   * data will be stored in-memory in session store 
   * sessionStore for particular will be terminated after idle timeout  
   * @param {object} socket 
   * @param {UUID} sessionId 
   * @param {string} keyword 
   */
  startMessageStreaming(socket, sessionId, keyword) {
    this.terminateSession(sessionId);
    this.sessionStore[sessionId] = {};
    this.sessionStore[sessionId].date = new Date();
    this.sessionStore[sessionId].twitterManager = new TwitterManager();
    this.sessionStore[sessionId].socket = socket;
    this.sessionStore[sessionId].newMessages = [];
    this.sessionStore[sessionId].keyword = keyword;
    this.sessionStore[sessionId].sessionId = sessionId;
    this.sessionStore[sessionId].twitterManager.startStreaming(this.sessionStore[sessionId], keyword);
    this._startSessionTimer();
  }

  /**
   * this function terminated (inactive) session based on sessionId
   * @param {UUID} sessionId 
   */
  terminateSession(sessionId) {
    if (this.sessionStore[sessionId]) {
      this.sessionStore[sessionId].twitterManager = null;
      delete this.sessionStore[sessionId];
    }
  }

  /**
   * This function runs on regular interval
   * It checks for idle sessions
   * Trigger terminateSession for sessions idle for more than 15mins
   */
  _startSessionTimer() {
    const _this = this;
    this._timer = setInterval(() => {
      for (let id in _this.sessionStore) {
        if (new Date() > _this.sessionStore.date) _this.terminateSession(id);
      }
      if (Object.keys(_this.sessionStore).length === 0) clearInterval(_this._timer);
    }, config.session.ttlInSec);
  }

}

module.exports = new Messages();