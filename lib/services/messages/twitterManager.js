const Twitter = require('twitter');
const twitterConfig = require('config').get('twitter');
const messageConfig = require('config').get('messages');
/**
 * This class handles all twitter api requests
 * Search and live streaming
 */
class TwitterManager {

  /**
   * Initializes the twitter client objet
   */
  constructor() {
    this._client = new Twitter({
      consumer_key: twitterConfig.consumerKey,
      consumer_secret: twitterConfig.consumerSecret,
      access_token_key: twitterConfig.accessTokenKey,
      access_token_secret: twitterConfig.accessTokenSecret,
    });
  }

  /**
   * this function triggers twitter search api to get tweets based on keyword.
   * this will return n messages based on display count(which is stored in config)
   * @param {string} keyword 
   */
  getMessages(keyword) {
    return new Promise((resolve, reject) => {
      this._client.get('search/tweets', {
        q: keyword,
        count: messageConfig.displayCount
      }, function (error, tweets) {
        if (error) reject(error);
        else
          resolve({
            result: tweets.statuses.map(t => ({
              text: t.text,
              user: t.user,
              createdTime: t.created_at
            }))
          });
      });
    });
  }

  /**
   * this method will start twitter streaming based on keyword,
   * whenever new messages are received, it's notified to client using live socket connection
   * @param {object} sessionStore 
   * @param {string} keyword 
   */
  startStreaming(sessionStore, keyword) {
    const stream = this._client.stream('statuses/filter', {
      track: keyword
    });
    stream.on('data', (event) => {
      console.log('data....', event.text);
      sessionStore.newMessages.push({
        text: event.text,
        user: event.user,
        createdTime: event.created_at
      });
      sessionStore.socket.emit('new_messages', {
        result: sessionStore.newMessages.length
      });
    });
    stream.on('error', (error) => {
      console.log(`Error while connecting to stream for SessionId ${sessionStore.sessionId} : ${error}`);
    });
  }

}

module.exports = TwitterManager;