import { checkMandatoryFields } from '../../Payload';
import { Email } from 'meteor/email';
import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/user/forgotpwd',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method === 'POST') {
      let context = this,
        feild = '',
        Data = Utility.getRequestContents(context.request),
        hasQuery = Utility.hasData(Data),
        validData = Utility.validate(Data, {
          email: NonEmptyString,
        });

      field = checkMandatoryFields(Data);

      if (validData) {
        if (isEmail(Data.phoneNum) == false) {
          validData = false;
          Utility.response(
            context,
            400,
            failResponse('Please enter valid email address')
          );
        } else {
          let UserData = UserMaster.findOne({ email: Data.email });
          // let checkVerifiedUser = Meteor.users.findOne({ 'emails.verified': true })
             console.log(UserData)
          if (UserData ) {
            if (Data && hasQuery && validData) {
              let userId = UserData.userId;
              //console.log('userId ******** ', userId)
             Accounts.sendResetPasswordEmail(userId,Data.email)
              Utility.response(
                context,
                200,
                successResponse({ msg: 'An email is sent to your registered address.' })
              );
            } else {
              Utility.response(context, 400, failResponse('Invalid email address'));
            }
          } else {
            Utility.response(context, 400, failResponse('Your email is not registered with us'));
          }
        }
      } else {
        Utility.response(context, 400, failResponse(`Please fill ${field} field`));
      }
    } else {
      this.response.setHeader(
        'Access-Control-Alatlongow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      this.response.setHeader('Access-Control-Alatlongow-Methods', 'GET, POST, OPTIONS');
      this.response.end('Set OPTIONS.');
      //console.log(Data, hasQuery, validData);
    }
  },
  { where: 'server' }
);