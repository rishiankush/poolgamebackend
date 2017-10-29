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
        let requestData = UserMaster.findOne({ phoneNum: Data.phoneNum });

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
            // accountId = Accounts.createUser({
            //   email: requestData.email,
            //   password: requestData.password,
            //   profile: { isActive: 1 },
            // });
            // let loginToken = Random.secret();
            //     let data = {
            //       userId: accountId,
            //       auth: {
            //         token: loginToken,
            //         date_created: new Date(),
            //       },
            //       deviceInfo: Data.deviceInfo,
            //       fullName: requestData.fullName,
            //       email: requestData.email.toLowerCase(),
            //       phoneNum: requestData.phoneNum,
            //       firstTimeLogin: true,
            //       isVerified: true,
            //       createdAt: Date.now(),
            //       getNotification: 1,
            //       isActive: 1,
            //       // rating: {
            //       //   avgRating: 0,
            //       //   count: 0,
            //       //   updated_at: Date.now(),
            //       // },
            //     }
            /* save related data to masterCollection */
            //UserMaster.registerUser(data);

            //Request.remove({ _id: requestData._id }); // Remove data from Request Collection

            //serverSideLogin(requestData.email.toLowerCase(), requestData.password);
            //    console.log(login , "login status============");
            ////Accounts.sendVerificationEmail(accountId);
            // Email.send({
            //   from: "e.life096@gmail.com",
            //   to: data.email,
            //   subject: "Welcome mail",
            //   html: SSR.render('welcomeEmail',data),
            // });

            UserMaster.update({userId:Data.userId},{$set:{isPhoneNumVerified:true}})

            let data = UserMaster.findOne({userId:Data.userId});

            //console.log('data is here ********* ', data)

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