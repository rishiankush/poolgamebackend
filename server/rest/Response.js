/*

this class manages the response structure of web services

*/

class Response {
  static successResponse(resultObj) {
    //console.log('resultObj ****** ',resultObj.data)
    return {
      success: true,
      message: resultObj.msg,
      statusCode: 200,
      result: resultObj.data,
    };
  }

  static failResponse(errorDesc) {
    // console.log(errorDesc)
    return {
      success: false,
      message: errorDesc,
      //errorCode: Meteor.call('getMessagesCode', errorDesc),
      statusCode: 400,
    };
  }

  static sessionExpired(errorDesc) {
    return {
      success: false,
      message: errorDesc,
      errorCode: Meteor.call('getMessagesCode', errorDesc),
      statusCode: 401,
    };
  }

  static suspendedAccount(errorDesc) {
    // console.log(errorDesc)
    return {
      success: false,
      message: errorDesc,
      errorCode: Meteor.call('getMessagesCode', errorDesc),
      statusCode: 402,
    };
  }
}

module.exports = Response;