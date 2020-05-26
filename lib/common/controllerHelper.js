const constants = require('./constants');

class ControllerHelper {
  constructor(res) {
    this._res = res;
  }

  /*****
   * Sends response and result if available
   *****/
  sendResponse(resObject) {
    this._res.status(this._validHttpCode(resObject.code) || constants.httpCodes.success).send(resObject.result);
  }

  /*****
  Sends error response
  *****/
  sendErrorResponse(resObject) {
    this._res.status(this._validHttpCode(resObject.code) || constants.httpCodes.internalServerError).send(resObject.result);
  }

  setCookie(key, value, options = {}) {
    this._res.cookie(key, value, options);
  }

  _validHttpCode(code) {
    return constants.httpCodesList.indexOf(code) >= 0 ? code : null;
  }
}

module.exports = ControllerHelper;