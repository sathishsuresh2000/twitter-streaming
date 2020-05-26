const ControllerHelper = require('../../common/controllerHelper');
const constants = require('../../common/constants');
const messageService = require('../../services/messages');
const UniqueIdGenerator = require('../../common/uniqueIdGenerator');
const sessionConfig = require('config').get('session');

class Messages {

  /** 
   *controller to get messages based on search keyword
   *Session gets created if not there, session expired in 15mins from time of idle 
   */
  async getMessages(req, res) {
    const controllerHelper = new ControllerHelper(res);
    console.log('searching messages for the keyword:', req.query.keyword);
    try {
      let sessionId = req.cookies['sessionId'];
      if (!sessionId) sessionId = new UniqueIdGenerator().getTimeBasedId();
      const result = await messageService.getMessages(req.query.keyword);
      console.log('Successfully retreived messages for the keyword:', req.query.keyword);
      controllerHelper.setCookie('sessionId', sessionId, {
        maxAge: sessionConfig.ttlInSec * 1000,
        httpOnly: false,
      });
      controllerHelper.sendResponse({
        code: constants.httpCodes.success,
        result,
      });
    } catch (err) {
      console.log('Error while getting messages.', err);
      controllerHelper.sendErrorResponse({
        result: {
          message: constants.messages.errorSearchingMessages
        }
      });
    }
  }
  /**
   * Used to get new (twitter streamed) messages
   * session TTL is updated for every request
   */
  async getNewMessages(req, res) {
    const controllerHelper = new ControllerHelper(res);
    console.log('Getting new messages for sessionId:', req.cookies['sessionId']);
    try {
      let sessionId = req.cookies['sessionId']
      const result = await messageService.getNewMessages(sessionId);
      console.log('successfully retreived new messages.');
      controllerHelper.setCookie('sessionId', sessionId, {
        maxAge: sessionConfig.ttlInSec * 1000,
        httpOnly: false,
      });
      controllerHelper.sendResponse({
        code: constants.httpCodes.success,
        result: result
      });
    } catch (err) {
      console.log('Error while getting new messages:', err);
      controllerHelper.sendErrorResponse({
        result: {
          message: constants.messages.errorNewMessages
        }
      });
    }
  }


}

module.exports = new Messages();