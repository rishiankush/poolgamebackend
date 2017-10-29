import { checkMandatoryFields } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/user/signUp',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        hasQuery = Utility.hasData(Data),
        validData = Utility.validate(Data, {
          email: NonEmptyString,
          password: NonEmptyString,
          confirmPassword: NonEmptyString,
          fullName: NonEmptyString,
          phoneNum: MaybeEmptyString,
          gender: MaybeEmptyString,
          dob: MaybeEmptyString,
          martialStatus: MaybeEmptyString,
          //deviceInfo:Object
        }),
        field = checkMandatoryFields(_.omit(Data, 'phoneNum', 'gender','dob','martialStatus'));
      if (validData) {
        // Meteor.call('sendGCM','fgDnMNMDGx8:APA91bFD-JQrEcG4NPQaNLvvBhiv03t4V25H9z_ISfE6bJMlUag5W59wrpte3BB4UFLO40OMn4DJhGtOoClIj6nQ9eQcRBuUljR6A4ym0xbaJQXLNmUSVo4FyoiksxzSk4TBU7Wh3FnU');
        if (!isEmail(Data.email)) {
          validData = false;
          Utility.response(context, 400, failResponse('Please enter valid email address'));
        }
        else if(Data.phoneNum != '' && isPhoneNo(Data.phoneNum) == false){
          validData = false;
          Utility.response(
            context,
            400,
            failResponse('Please enter valid phone number along with countrycode.')
          );
        }
        // else if (nestedPositionObject(Data.position) == false) {
        //   validData = false;
        //   Utility.response(context, 400, failResponse('Please enter a valid position'));
        // } 
        else if((Data.password) != (Data.confirmPassword)){
          Utility.response(context, 400, failResponse('Passwords does not match'))
        }

        else if(Data.dob != '' && !isDob(Data.dob)){
          Utility.response(context, 400, failResponse('Please enter a valid date of birth'))
        }

        else if(Data.gender != '' && !isGender(Data.gender)){
          Utility.response(context, 400, failResponse('Please enter a valid gender'))
        }

        else if(Data.martialStatus != '' && !isMartialStatus(Data.martialStatus)){
          Utility.response(context, 400, failResponse('Please enter a valid martial status'))
        }

        else {
          //     else if(!(nesteddeviceInfoObject(Data.deviceInfo)))
          // {
          //      Utility.response(context, 200, failResponse('Device Information is not valid'));

          // }
          //let userExists = Meteor.users.findOne({ 'emails.address': Data.email.toLowerCase() });
          let checkUserEmail = UserMaster.findOne({ email: Data.email.toLowerCase() });
          let checkUserPhoneNum = UserMaster.findOne({ phoneNum: Data.phoneNum });

          if (!checkUserEmail) {
            checkUserEmail = {};
          }
          if (!checkUserPhoneNum) {
            checkUserPhoneNum = {};
            checkUserPhoneNum.email = '';
          }
          //let userExists = UserMaster.findOne({ email: Data.email.toLowerCase() });
          //console.log('userExists ********* ',userExists)
          if (checkUserEmail.email == Data.email) {
            Utility.response(
              context,
              400,
              failResponse(
                'This email address is already registered. Please try again with a different email address.'
              )
            );
          } else if (checkUserPhoneNum.phoneNum == Data.phoneNum && Data.phoneNum != '') {
            Utility.response(
              context,
              400,
              failResponse(
                'This phone number is already registered. Please try again with a different number.'
              )
            );
          } 
          else {
            //console.log(typeof(Data.favouriteFoods))
            //Data.favouriteFoods = Data.favouriteFoods.split(",");
            if(Data.phoneNum != ''){
              var randomNum = Math.floor(Math.random() * 9000) + 1000;
              sendSms(Data.phoneNum, randomNum);
            }
            
            accountId = Accounts.createUser({
              email: Data.email,
              password: Data.password,
              profile: { isActive: 1 },
            });
            let loginToken = Random.secret();
            let data = {
              userId: accountId,
              auth: {
                token: loginToken,
                date_created: new Date(),
              },
              //deviceInfo: Data.deviceInfo,
              fullName: Data.fullName,
              email: Data.email.toLowerCase(),
              //password: Data.password,
              phoneNum: Data.phoneNum,
              code: randomNum,
              firstTimeLogin: true,
              isVerified: false,
              isPhoneNumVerified: false,
              isBankVerified: false,
              createdAt: Date.now(),
              getNotification: 1,
              isActive: 1,
            };
            // Meteor.call('sendGCM','abc');
            console.log('before insert ******** ', data);
            /* save related data to masterCollection */
           //Request.upsertUser(data);
            UserMaster.registerUser(data);

            Accounts.sendVerificationEmail(accountId);

            // Utility.response(
            //   context,
            //   200,
            //   successResponse({
            //     msg:
            //       'An OTP has been sent to your mobile number to verify your account, please verify in order to complete your account signup',
            //   })
            // );


            //UserMaster.saveDeviceInfo(accountId, Data.deviceType, Data.gcmId, Data.deviceToken);
            Utility.response(
              context,
              200,
              successResponse({
                msg:
                  'An email has been sent to your registered address, click on verification link in order to complete your account signup',
                data: data
              })
            );
          }
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