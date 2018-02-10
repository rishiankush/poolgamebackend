import { checkMandatoryFields } from '../../Payload';

import { successResponse, failResponse, suspendedAccount } from '../../Response';

Router.route(
  '/rest/v1/user/login',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        hasQuery = Utility.hasData(Data),
        validData = Utility.validate(Data, {
          email: NonEmptyString, // here email field is just a name of field which takes both phone number and email
          password: NonEmptyString,
          deviceToken:NonEmptyString,
          platform:NonEmptyString,
          //deviceInfo: Object,
        }),
        field = checkMandatoryFields(Data);
      // if (!nesteddeviceInfoObject(Data.deviceInfo)) {
      //   Utility.response(context, 400, failResponse('Device Information is not valid'));
      // }

      if (validData) {
          if (!isEmail(Data.email)) {
            Utility.response(context, 400, failResponse('Please enter valid email address.'));
            return;
          }else{
              Data.email = Data.email.toLowerCase(); 
             let result = serverSideLogin(Data.email, Data.password);
             if(result.error){
              Utility.response(context, 400, failResponse(result.message));
              return
             }else{
                if(result.user.emails[0].verified){
                  console.log(result.user._id)
                   let userData = UserMaster.findOne({userId:result.user._id});
                   UserMaster.update({userId:userData.userId},{$set:{ isEmailVerified:true,
                                                                      firstTimeLogin:false,
                                                                      deviceInfo:{
                                                                        deviceToken:Data.deviceToken,
                                                                        platform:Data.platform
                                                                      }
                                                                      }});
                   Utility.response(context, 200, successResponse({data:userData}));
                }else{
                   Utility.response(context, 400, failResponse('This email is not verified with us.'));           
                }
              
             }
          }
        // let UserData = '';
        // // if user has filled email, we get emailMatch
        // emailMatch =
        //   UserMaster.findOne({ email: Data.email.toLowerCase() })

        // if (emailMatch) {
        //   // checking whether account is verified or not
        //   if (emailMatch.isActive == 0) {
        //     Utility.response(context, 402, failResponse('Your account has been suspended'));
        //   } else if (emailMatch.isVerified) {
        //     UserData = serverSideLogin(emailMatch.email.toLowerCase(), Data.password);
        //   } else {
        //     UserData = '';
        //     Utility.response(
        //       context,
        //       400,
        //       failResponse('Credentials does not exists Please go for Sign up process')
        //     );
        //   }
        // } else {
        //   UserData = '';
        // }
        // // checking if login function response is undefined,blank or error
        // if (!(UserData == '' || UserData == null || UserData.error)) {
        //   //console.log(UserData.user._id , "userdata is here")
        //   UserMaster.generateToken(UserData.user._id);
        //   // console.log(token);
        //   // code to check whether a person is logged in and try to log in again.

        //   // console.log(loginInfo,"hahahh");
        //   UserMaster.saveDeviceInfoLogIn(
        //     UserData.user._id,
        //     Data.deviceInfo.deviceType,
        //     Data.deviceInfo.deviceToken
        //   );
        //   let data = UserMaster.getUserData(Data.email);
        //   //console.log('here is data****** ',data)

        // let userData = UserMaster.findOne({email:Data.email});
        // let emailMatch = Meteor.users.findOne({'emails.address':Data.email})
        //   console.log('emailMatch ****** ',emailMatch.emails[0].verified)
        //   if (!isEmail(Data.email)) {
        //     validData = false;
        //     Utility.response(context, 400, failResponse('Please enter valid email address.'));
        //   }

        //   else if(userData.email != Data.email){
        //     Utility.response(context, 400, failResponse('This email is not registered with us.'));           
        //   }

        //   else if(emailMatch.emails[0].verified == false){
        //     Utility.response(context, 400, failResponse('This email is not verified with us.'));           
        //   }

        //   else{
        //     Utility.response(
        //       context,
        //       200,
        //       successResponse({ msg: 'User logged in successfully', data: userData })
        //     );
        //   }
        
      } else {
        // in case of invalid data
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