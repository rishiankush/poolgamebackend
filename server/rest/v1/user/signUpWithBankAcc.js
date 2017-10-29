import { checkMandatoryFields } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/user/signUpWithBankAcc',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        hasQuery = Utility.hasData(Data),
        validData = Utility.validate(Data, {
          userId:NonEmptyString,
          idProof: MaybeEmptyString,
          passportNum: MaybeEmptyString,
          addressProof: MaybeEmptyString,
          bankName: MaybeEmptyString,
          accNum: MaybeEmptyString,
          ifscNum: MaybeEmptyString
        }),
        field = checkMandatoryFields(_.omit(Data, 'idProof', 'passportNum', 'addressProof','bankName','accNum','ifscNum'));
      if (validData) {
        let userData = UserMaster.findOne({userId: Data.userId});
        console.log('userdata ***** ',userData)
        if(Data.userId != userData.userId && userData == undefined){
          Utility.response(
            context,
            400,
            failResponse('Invalid user or user id. Please check with your user details')
          );
        }
        else{
          if((Data.idProof != '') && (Data.passportNum != '') && (Data.addressProof != '') && (Data.bankName != '') && (Data.accNum != '') && (Data.ifscNum != '')){
            UserMaster.update({userId:Data.userId},{$set:{
              idProof: Data.idProof,
              passportNum: Data.passportNum,
              addressProof: Data.addressProof,
              bankName: Data.bankName,
              accNum: Data.bankName,
              ifscNum: Data.ifscNum,
              isBankVerified:true
            }})
          }

            //let data = UserMaster.findOne({userId:Data.userId})
          else{
            UserMaster.update({ userId:Data.userId }, {
              $set:{
                idProof: Data.idProof,
                passportNum: Data.passportNum,
                addressProof: Data.addressProof,
                bankName: Data.bankName,
                accNum: Data.bankName,
                ifscNum: Data.ifscNum
              }
            })
          }
          
          Utility.response(
              context,
              200,
              successResponse({
                msg:
                  'User account details updated successfully',
                data: userData
              })
            );
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