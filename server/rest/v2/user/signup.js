import { mentionMandatoryFields,feildsCannotBeEdited } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v2/user/signUp',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        field = mentionMandatoryFields(Data, ['email', 'password','fullName']);
        if(field){
          Utility.response(
            context,
            400,
            failResponse(field)
          );
          
        }else{
          Data.email = Data.email.toLowerCase();

          let userExists = UserMaster.getUserData(Data.email);

          if(userExists){
            Utility.response(
              context,
              400,
              failResponse(
                'This email address is already registered. Please try again with a different email address.'
              )
            );
          }else{
            let accountId = Accounts.createUser({
                                              email: Data.email,
                                              password: Data.password,
                                              profile: { isActive: 1 },
                                            });
            Roles.addUsersToRoles(accountId,[1])
            let loginToken = Random.secret();

            let data = {
                        userId: accountId,
                        auth: {
                          token: loginToken,
                          date_created: Date.now(),
                        },
                        deviceInfo: {platform:'',deviceToken:''},
                        fullName: Data.fullName,
                        email: Data.email,
                        code: randomNum,
                        phoneNum: '',
                        gender: '',
                        dob:'',
                        maritalStatus:'',
                        firstTimeLogin: true,
                        isEmailVerified: false,
                        isPhoneNumVerified: false,
                        kycSubmitted: false,
                        createdAt: Date.now(),
                        getNotification: 1,
                        isActive: 1,
                      };

            UserMaster.registerUser(data);
            Accounts.sendVerificationEmail(accountId);
            
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