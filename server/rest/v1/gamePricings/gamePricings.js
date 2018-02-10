import { mentionMandatoryFields,feildsCannotBeEdited } from '../../Payload';

import { successResponse, failResponse } from '../../Response';
import authentication from '../../Auth';

Router.route(
  '/rest/v1/gamePricings/getGamePricings',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request);
        field = mentionMandatoryFields(Data, ['userId', 'token']);
        if(field){
          
          Utility.response(
            context,
            400,
            failResponse(field)
          );
          
        }else{
          let {userId,token} = Data ; 
          let{authorise,message} = authentication({userId,token});
          if(authorise){
            let pricings = gamePricing.getGamePriceByType(1,{deduction:1,price:1,name:1});
            Utility.response(
                  context,
                  200,
                  successResponse({
                                      data: pricings,
                  })
                );

          }else{
            Utility.response(
            context,
            400,
            failResponse(message)
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