import { checkMandatoryFields } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/user/resendOtp',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        hasQuery = Utility.hasData(Data),
        validData = Utility.validate(Data, {
          phoneNum: NonEmptyString,
        }),
        field = checkMandatoryFields(Data);
      if(validData) {
        let randomNum = Math.floor(Math.random() * 9000) + 1000,
          userPhoneNumData = UserMaster.findOne({ phoneNum: Data.phoneNum });
        if(userPhoneNumData) {
          sendSms(userPhoneNumData.phoneNum, randomNum);
          UserMaster.update({ phoneNum: Data.phoneNum }, { $set: { otp: randomNum } });
          Utility.response(
            context,
            200,
            successResponse({
              msg: 'A verification code has been sent to your registered phone number.',
            })
          );
        } else {
          Utility.response(context, 400, failResponse('User does not exist'));
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
    }
  },
  { where: 'server' }
);