import { checkMandatoryFields } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

//import { Email } from 'meteor/email';
Router.route(
  '/rest/v1/user/verify',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    //SSR.compileTemplate('welcomeEmail', Assets.getText('emailOnVerification.html'));
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        hasQuery = Utility.hasData(Data),
        validData = Utility.validate(Data, {
          userId: NonEmptyString,
          phoneNum: NonEmptyString,
          otp: NonEmptyString,
        });
      field = checkMandatoryFields(Data);
      //console.log('data **** ', Data.otp)
      if (validData) {
        let requestData = UserMaster.findOne({ userId: Data.userId });
        console.log(requestData.code,Data.otp);
        if (requestData) {
          if (requestData.phoneNum != Data.phoneNum) {
            Utility.response(
              context,
              400,
              failResponse('Please enter your registered phone number')
            );
          } 
          else if(requestData.phoneNum == ''){
            Utility.response(
              context,
              400,
              failResponse('This user has not added phone number while sign up')
            );
          }
          else if (requestData.code != Data.otp) {
            Utility.response(context, 400, failResponse('Please enter a valid OTP'));
          } else {
          

            UserMaster.update({userId:Data.userId},{$set:{isPhoneNumVerified:true,code:''}})

            let data = UserMaster.findOne({userId:Data.userId});

            Utility.response(
              context,
              200,
              successResponse({ msg: 'Verified successfully', data: data })
            );
          }
        } else {
          Utility.response(context, 400, failResponse('Please enter a valid Phone Number'));
        }
      } else {
        //console.log(Data)
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