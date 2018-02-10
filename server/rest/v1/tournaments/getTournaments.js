import { mentionMandatoryFields,feildsCannotBeEdited } from '../../Payload';

import { successResponse, failResponse } from '../../Response';

Router.route(
  '/rest/v1/tournaments/getTournaments',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    if (this.request.method == 'POST') {
      let context = this,
        Data = Utility.getRequestContents(context.request);
        // field = mentionMandatoryFields(Data, ['userId', 'token']);
        // if(field){
        //   Utility.response(
        //     context,
        //     400,
        //     failResponse(field)
        //   );
          
        // }else{

          let data = tournament.getAllTournaments();
          data.map(function(each){
            each.subFolders = tournamentSubFolder.getSubTournamentsByMainTournament(each._id);
          });
            
                 Utility.response(
                  context,
                  200,
                  successResponse({
                                      data: data,
                  })
                );
              
        // }

     
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