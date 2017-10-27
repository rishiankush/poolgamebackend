import { checkMandatoryFields } from '../../Payload';
import { Email } from 'meteor/email';
import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/user/forgotpwd',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method === 'POST') {
      SSR.compileTemplate('htmlEmail', Assets.getText('emailTemplate.html'));
      let context = this,
        feild = '',
        Data = Utility.getRequestContents(context.request),
        hasQuery = Utility.hasData(Data),
        validData = Utility.validate(Data, {
          phoneNum: NonEmptyString, // edited phoneNumber to phoneNum
        });

      field = checkMandatoryFields(Data);

      if (validData) {
        if (isPhoneNo(Data.phoneNum) == false) {
          validData = false;
          Utility.response(
            context,
            400,
            failResponse('Please enter valid phone number along with countrycode.')
          );
        } else {
          let UserData = UserMaster.findOne({ phoneNum: Data.phoneNum });

          if (UserData) {
            if (Data && hasQuery && validData) {
              let randomNum = Math.floor(Math.random() * 9000) + 1000;
              console.log('otp *********** ', UserData.otp);
              sendSms(Data.phoneNum, randomNum);

              UserMaster.update(
                { phoneNum: Data.phoneNum },
                { $set: { otp: randomNum, verifiedOtp: false } }
              ); // otp for forgot password

              // let emailData = {
              //   msg: 'Your one time password is: ' + randomNum,
              //   fullName: capitalizeFirstLetter(UserData.fullName),
              // };
              Email.send({
                from: 'e.life096@gmail.com',
                to: UserData.email,
                subject: 'Chef Order: Forgot Password OTP',
                text: 'Your one time password is: ' + randomNum,
              });

              Utility.response(
                context,
                200,
                successResponse({ msg: 'An OTP is sent to your registered Mobile number.' })
              );
            } else {
              Utility.response(context, 200, failResponse('Invalid OTP'));
            }
          } else {
            Utility.response(context, 200, failResponse('Your number is not registered with us'));
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