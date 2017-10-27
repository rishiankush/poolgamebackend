import { successResponse, failResponse, sessionExpired, suspendedAccount } from './Response';
import authentication from './Auth';
import { getUserDataFromHeaders } from './Payload';

const authNotRequiredURL = [
  // '/rest/v1/stripe/createCustomer',
  // '/rest/v1/stripe/cardToken',
  // '/rest/v1/stripe/cron',
  '/rest/v1/user/signUp',
  '/rest/v1/user/verify',
  // '/rest/v1/user/checkuser',
  // '/rest/v1/user/forgotpwd',
  // '/rest/v1/user/login',
  '/rest/v1/user/resendOtp',
  // '/rest/v1/user/resetpwd',
  // '/rest/v1/user/verifyOtp',
  // '/rest/v1/files/upload',
  // '/rest/v1/consumer/home',
  // '/rest/v1/stripe/webhook',
  // '/rest/v1/user/contact',
];

Router.configureBodyParsers();

Router.onBeforeAction(function(req, res, next) {
  const context = this,
    Data = getUserDataFromHeaders(req.headers);

  if (!_.contains(authNotRequiredURL, req.url)) {
    console.log('authentication *****', req.url, Data);

    const checkUser = authentication(Data);

    if (checkUser) {
      if (!checkUser.isActive) {
        Utility.response(context, 402, suspendedAccount(checkUser.message));
      } else if (!checkUser.authorise) {
        Utility.response(context, 401, sessionExpired(checkUser.message));
      } else {
        this.next();
      }
    } else {
      Utility.response(context, 401, sessionExpired('userId is not provided '));
    }
  } else {
    this.next();
  }
});