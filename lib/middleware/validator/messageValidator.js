const constants = require('../../common/constants');
const ControllerHelper = require('../../common/controllerHelper');
const messageService = require('../../services/messages');

class Validator {
  /*
   *This function validates for search keyword in request object query variables
   If not, it will throw 400 bad request error  
   */
  validateGetMessages(req, res, next) {
    if (!req.query || !req.query.keyword || req.query.keyword.trim() === '') {
      new ControllerHelper(res).sendErrorResponse({
        code: constants.httpCodes.badRequest,
        result: {
          message: constants.messages.keywordNotFound
        }
      });
    } else next();
  }

  /**
   * This function validates for sessionId,
   * sessionId will be enabled (added to cookie) only for search messages
   * If sessionId does not exist, it will throw unauthorized error
   */
  validateGetNewMessages(req, res, next) {
    let sessionId = req.cookies['sessionId']
    if (!sessionId || !messageService.sessionStore[sessionId]) {
      console.log("comming")
      new ControllerHelper(res).sendErrorResponse({
        code: constants.httpCodes.unauthorized,
        result: {
          message: constants.messages.invalidSessionId
        }
      });
    } else next();
  }
}

module.exports = Validator;