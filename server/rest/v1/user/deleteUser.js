import { mentionMandatoryFields,feildsCannotBeEdited } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/user/deleteUser',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request),
        field = mentionMandatoryFields(Data, ['email']);
        if(field){
          Utility.response(
            context,
            400,
            failResponse(field)
          );
          
        }else{
          Data.email = Data.email.toLowerCase();
          let user = UserMaster.findOne({email:Data.email});
          if(user){
             Meteor.users.remove({_id:user.userId})
              UserMaster.remove({email:Data.email});
            
             
          
                     Utility.response(
                      context,
                      200,
                      successResponse({
                                          msg:'Profile deleted successfully'
                      })
                    );
           }else{
            Utility.response(
                context,
                400,
                failResponse('emailId not found')
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