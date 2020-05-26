module.exports = {
  httpCodes: {
    success: 200,
    successfulCreate: 201,
    redirect: 302,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    internalServerError: 500,
    notImplemented: 501,
  },
  httpCodesList: [200, 201, 302, 400, 401, 403, 404, 409, 500, 501],
  messages: {
    keywordNotFound: 'Please enter a valid keyword',
    invalidSessionId: 'Session Id is not valid',
    errorSearchingMessages: 'Error while searching messages. Please try again',
    errorNewMessages: 'Error while retreiving new messages. Please try again',
  }
};