import { mentionMandatoryFields,feildsCannotBeEdited } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/user/editProfile',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        field = mentionMandatoryFields(Data, ['userId', 'token']);
        if(field){
          Utility.response(
            context,
            400,
            failResponse(field)
          );
          
        }else{
          let fieldsNotAllowed = feildsCannotBeEdited(Data,['email',
                                                          'firstTimeLogin',
                                                          'isEmailVerified',
                                                          'isPhoneNumVerified',
                                                          'kycSubmitted',
                                                          'code',
                                                          'isActive',
                                                          'auth',
                                                          '_id']);
          if(fieldsNotAllowed){
               Utility.response(
                context,
                400,
                failResponse(fieldsNotAllowed)
              );
              return
          }
          if(Data.hasOwnProperty('phoneNum')){
             if(Data.phoneNum != '' && isPhoneNo(Data.phoneNum) == false){
                validData = false;
                Utility.response(
                  context,
                  400,
                  failResponse('Please enter valid phone number along with countrycode.')
                );
                return
            }
            let userData = UserMaster.findOne({userId:Data.userId});
            let checkPhone = UserMaster.findOne({phoneNum:Data.phoneNum});
            if(checkPhone && (checkPhone.userId != Data.userId)) {
                Utility.response(
                  context,
                  400,
                  failResponse('Phone number already in use')
                );
                return
            }
            if(userData.phoneNum != Data.phoneNum){
              var randomNum = Math.floor(Math.random() * 9000) + 1000;
              sendSms(Data.phoneNum, randomNum);
              Data.code = randomNum;
              Data.isPhoneNumVerified = false;

            }else{
              Utility.response(
                  context,
                  400,
                  failResponse('Phone number is same as before')
                );
                return
            }
            

          }
          if(Data.hasOwnProperty('gender')){
            Data.gender = Number(Data.gender);
          }

          if(Data.hasOwnProperty('dob')){
            Data.dob = Number(Data.dob);
          }

          if(Data.hasOwnProperty('martialStatus')){
            Data.martialStatus = Number(Data.martialStatus);
          }
          if( Data.hasOwnProperty('addressProof') || 
              Data.hasOwnProperty('passportNum') ||
              Data.hasOwnProperty('idProof')
              ){
            Data.kycVerified = 0;
            Data.updateAt = Date.now();
          }
          delete Data.token;

          let update = UserMaster.update({userId:Data.userId},{$set:Data});
         
          let data = UserMaster.findOne({userId:Data.userId});
              if(update){
                 Utility.response(
                  context,
                  200,
                  successResponse({
                                      data: data,
                                      msg:'Profile updated successfully'
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