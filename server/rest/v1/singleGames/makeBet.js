import { mentionMandatoryFields,feildsCannotBeEdited } from '../../Payload';

import { successResponse, failResponse } from '../../Response';
import authentication from '../../Auth';
import  gamePricing from '../../../../collections/singleGamePricing';
// import  UserMaster from '../../../../collections/UserMaster';


Router.route(
  '/rest/v1/singleGames/makeABet',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request);
        field = mentionMandatoryFields(Data, [ 'userId',
                                               'token',
                                               'coins',
                                               'notes',
                                               'bonusNotes',
                                               ]);
        if(field){
          
          Utility.response(
            context,
            400,
            failResponse(field)
          );
          
        }else{
          let {userId,token,coins,notes,bonusNotes} = Data ;
          coins = -Number(coins);
          notes = -Number(notes);
          bonusNotes = -Number(bonusNotes);
          let{authorise,message} = authentication({userId,token});
          if(authorise){
            UserMaster.updateGains(userId,coins,notes,bonusNotes);
            Utility.response(
                  context,
                  200,
                  successResponse({
                                      msg: 'Deduction done successfully',
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