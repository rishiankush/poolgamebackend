import { mentionMandatoryFields,feildsCannotBeEdited } from '../../Payload';

import { successResponse, failResponse } from '../../Response';
import  singleGames from '../../../../collections/singleGames';
// import  UserMaster from '../../../../collections/UserMaster';
import authentication from '../../Auth';

Router.route(
  '/rest/v1/singleGames/saveGameResult',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request);
        field = mentionMandatoryFields(Data, ['userId',
                                               'token',
                                               'priceRoomId',
                                               'roomId',
                                               'looserId',
                                               'winnerId',
                                               'winnerPots',
                                               'looserPots',
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
          let {userId,token,coins,notes,bonusNotes,winnerId} = Data ;
          coins = Number(coins);
          notes = Number(notes);
          bonusNotes = Number(bonusNotes);
          let matchesWon,matchesLost; 
          let{authorise,message} = authentication({userId,token});
          if(authorise){
            let{userId,roomId,looserId,priceRoomId} = Data;
            let game = singleGames.addSingleGame({winner:winnerId,looserId,photonRoomId:roomId});
            game = singleGames.findOne({_id:game});
            matchesWon = singleGames.find({winner:winnerId}).count();          
            matchesLost = singleGames.find({looserId:userId}).count();
            UserMaster.updateGains(winnerId,coins,notes,bonusNotes,1);
            UserMaster.endStreak(looserId);
            
            let gains =  UserMaster.findOne({userId},{fields:{ 
                                                  coins:1,
                                                  notes:1,
                                                  bonusNotes:1,
                                                  winningStreak:1
                                                }
                                        });    
            game = {...game,
                    matchesWon,
                    matchesLost,
                    coins:gains.coins,
                    notes:gains.notes,
                    bonusNotes:gains.bonusNotes,
                    rank:1,
                    winPercent:singleGames.winningPercentage(userId)
                  };

            Utility.response(
                  context,
                  200,
                  successResponse({
                                      data: game,
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