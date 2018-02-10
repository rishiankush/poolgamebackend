import { mentionMandatoryFields,feildsCannotBeEdited } from '../../Payload';

import { successResponse, failResponse } from '../../Response';
import  singleGames from '../../../../collections/singleGames';
// import  UserMaster from '../../../../collections/UserMaster';
import authentication from '../../Auth';

Router.route(
  '/rest/v1/user/addCoinsNotesOrBonusNotes',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request);
        field = mentionMandatoryFields(Data, ['userId',
                                               'token',
                                               'coins',
                                               'notes',
                                               'bonusNotes'
                                               ]);
        if(field){
          
          Utility.response(
            context,
            400,
            failResponse(field)
          );
          
        }else{
          let {userId,token,coins,notes,bonusNotes} = Data ;
          coins = Number(coins);
          notes = Number(notes);
          bonusNotes = Number(bonusNotes);
          UserMaster.updateGains(userId,coins,notes,bonusNotes);
          
          let gains =  UserMaster.findOne({userId},{fields:{ 
                                                  coins:1,
                                                  notes:1,
                                                  bonusNotes:1
                                                }
                                        }); 
          
            Utility.response(
                  context,
                  200,
                  successResponse({
                                      data: gains,
                  })
                );

         
              
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