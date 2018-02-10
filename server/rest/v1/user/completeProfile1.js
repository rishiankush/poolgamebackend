import { checkMandatoryFields } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/user/completeProfile1',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        hasQuery = Utility.hasData(Data),
        validData = Utility.validate(Data, {
          userId: NonEmptyString,
          token: NonEmptyString,
          phoneNum: NonEmptyString,
          gender: NonEmptyString,
          dob: NonEmptyString,
          maritalStatus: NonEmptyString,
          //deviceInfo:Object
        }),
        field = checkMandatoryFields(_.omit(Data, 'userId', 'token'));
      if (validData) {
        // Meteor.call('sendGCM','fgDnMNMDGx8:APA91bFD-JQrEcG4NPQaNLvvBhiv03t4V25H9z_ISfE6bJMlUag5W59wrpte3BB4UFLO40OMn4DJhGtOoClIj6nQ9eQcRBuUljR6A4ym0xbaJQXLNmUSVo4FyoiksxzSk4TBU7Wh3FnU');
   
        if(Data.phoneNum != '' && isPhoneNo(Data.phoneNum) == false){
          validData = false;
          Utility.response(
            context,
            400,
            failResponse('Please enter valid phone number along with countrycode.')
          );
        }

        else if(!Number(Data.dob)){
          Utility.response(context, 400, failResponse('Please enter a valid date of birth'))
        }

        else if(!Number(Data.maritalStatus)){
          Utility.response(context, 400, failResponse('Please enter a valid martial status'))
        }

        else {
          let randomNum = Math.floor(Math.random() * 9000) + 1000;
          let update = UserMaster.update({userId:Data.userId},{$set:{ gender:Number(Data.gender),
                                                                      dob:Number(Data.dob),
                                                                      phoneNum:Data.phoneNum,
                                                                      code: randomNum,
                                                                      firstTimeLogin:false,
                                                                      maritalStatus:Number(Data.maritalStatus)
                                                                      }});
          let data = UserMaster.findOne({userId:Data.userId});
              if(update){
                 sendSms(Data.phoneNum, randomNum);
                 Utility.response(
                  context,
                  200,
                  successResponse({
                                      data: data
                  })
                );
              }else{
                Utility.response(
                  context,
                  400,
                  failResponse(
                    'Technical Error'
                  )
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