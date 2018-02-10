Template.addTournament.onRendered(function() {
 $('#registrationStartTime').bootstrapMaterialDatePicker({ format:'MM/DD/YYYY HH:MM', time:true });
 $('#registrationEndTime').bootstrapMaterialDatePicker({ format:'MM/DD/YYYY HH:MM', time:true });
 $('#matchStartTime').bootstrapMaterialDatePicker({ format:'MM/DD/YYYY HH:MM', time:true });
 $('#matchEndTime').bootstrapMaterialDatePicker({ format:'MM/DD/YYYY HH:MM', time:true });
  Session.set('WFP',false);
  Session.set('ticketTournament',false);
  Session.set('recursive',false);
  Session.set('leftNotes',0);
  Session.set('leftCoins',0);
  Session.set('totalEnteryNotes',0);
  Session.set('winnerNotes',0);
  Session.set('runnerUpNotes',0);
  Session.set('totalEnteryCoins',0);
  Session.set('winnerCoins',0);
  Session.set('runnerUpCoins',0);
  Session.set('country','WholeWorld');
  Session.set('city','');
  Session.set('rounds',[]);


});

Template.addTournament.onDestroyed(function(){
  Session.set('WFP',false);
  Session.set('ticketTournament',false);
  Session.set('recursive',false);
  Session.set('leftCoins',0);
  Session.set('leftNotes',0);
  Session.set('totalEnteryNotes',0);
  Session.set('winnerNotes',0);
  Session.set('runnerUpNotes',0);
  Session.set('totalEnteryCoins',0);
  Session.set('winnerCoins',0);
  Session.set('runnerUpCoins',0);
  Session.set('country','WholeWorld');
  Session.set('city','');
  Session.set('rounds',[]);


});

Template.addTournament.events({
    'change .countries':function(event){
        Session.set('country',event.target.value);
    },
    'change .cities':function(event){
        Session.set('city',event.target.value);
    },
    'keyup .totalEnteryCoins':function(event){
        Session.set('leftCoins',Number(event.target.value))

    },
    'keyup .totalEnteryNotes':function(event){
        Session.set('leftNotes',Number(event.target.value))
        // Session.set('totalEnteryNotes',event.target.value);
        
    },
    'keyup .winnerCoins':function(event){
        Session.set('leftCoins',Session.get('leftCoins') - Number(event.target.value))
    },

    'keyup .winnerNotes':function(event){
        Session.set('leftNotes',Session.get('leftNotes') - Number(event.target.value))
        
    },
    'keyup .runnerUpCoins':function(event){
        Session.set('leftCoins',Session.get('leftCoins') - Number(event.target.value))
        
    },
    'keyup .runnerUpNotes':function(event){
        Session.set('leftNotes',Session.get('leftNotes') - Number(event.target.value))
        // Session.set('runnerUpNotes',event.target.value);
        
    },

    'focus #registrationStartTime': function(e, template){
        var f = Template.instance().$('#registrationStartTime');
        f.bootstrapMaterialDatePicker({format:'MM/DD/YYYY h:mm', time:true });
    },
    'keyup #registrationStartTime': function(e, template){
        console.log(e.target.value)
    },
     'focus #registrationEndTime': function(e, template){
        var f = Template.instance().$('#registrationEndTime');
        f.bootstrapMaterialDatePicker({format:'MM/DD/YYYY h:mm', time:true });
    },
    'focus #matchEndTime': function(e, template){
        var f = Template.instance().$('#matchStartTime');
        f.bootstrapMaterialDatePicker({format:'MM/DD/YYYY h:mm', time:true });
    },
    'focus #matchStartTime': function(e, template){
        var f = Template.instance().$('#matchEndTime');
        f.bootstrapMaterialDatePicker({format:'MM/DD/YYYY h:mm', time:true });
    },
    'keyup .round1Coins':function(event){
        Session.set('leftCoins',Session.get('leftCoins')-Number(event.target.value)*this.players)
    },
    'keyup .round2Coins':function(event){
        Session.set('leftCoins',Session.get('leftCoins')-Number(event.target.value)*this.players)
    },
    'keyup .round3Coins':function(event){
        Session.set('leftCoins',Session.get('leftCoins')-Number(event.target.value)*this.players)
    },
    'keyup .round4Coins':function(event){
        Session.set('leftCoins',Session.get('leftCoins')-Number(event.target.value)*this.players)
    },
    'keyup .round1Notes':function(event){
        Session.set('leftNotes',Session.get('leftNotes')-Number(event.target.value)*this.players)
    },
    'keyup .round2Notes':function(event){
        Session.set('leftNotes',Session.get('leftNotes')-Number(event.target.value)*this.players)
    },
    'keyup .round3Notes':function(event){
        Session.set('leftNotes',Session.get('leftNotes')-Number(event.target.value)*this.players)
    },
    'keyup .round4Notes':function(event){
        Session.set('leftNotes',Session.get('leftNotes')-Number(event.target.value)*this.players)
    },
    
    'click .WFP':function(){
        Session.set('WFP',!Session.get('WFP'));       
    },
     'click .ticketTournament':function(){
        Session.set('ticketTournament',!Session.get('ticketTournament'));       
    },
    'click .recursive':function(){
        Session.set('recursive',!Session.get('recursive'));
    },
    'change .numOfPlayers':function(event){
        let array = [];
        let arrayLength;
        if(event.target.value == 64){
            arrayLength = 4;
        }else if(event.target.value == 32){
            arrayLength = 3;

        }else if(event.target.value == 16){
            arrayLength = 2;

        }else if(event.target.value == 8){
            arrayLength = 1;

        }else{
            arrayLength=0;
        }
        let players = event.target.value
        for(let i = 0;i<=arrayLength;i++){
                players = players/2;

                array.push({round:i+1,players});
            }
           
            Session.set('rounds',array);
    },
    'submit .addTournament':function(event){
        event.preventDefault();
      //  console.log(event.target); totalEnteryCoins
        let Data = {
            mainFolder : event.target.folderName.value.trim(),
            subFolder : event.target.subFolderName.value.trim(),
            waitForPlayer : Session.get('WFP'),
            regStartTime : (!Session.get('WFP'))?Date.parse(new Date(event.target.regStartTime.value)) : 0,
            regEndTime : (!Session.get('WFP'))?Date.parse(new Date(event.target.regEndTime.value)) : 0,
            matchStartTime : (!Session.get('WFP'))?Date.parse(new Date(event.target.matchStartTime.value)) : 0,
            matchEndTime : (!Session.get('WFP'))?Date.parse(new Date(event.target.matchEndTime.value)) : 0,
            recursive : Session.get('recursive'),
            ticketTournament : Session.get('ticketTournament'),
            numOfPlayers : event.target.numOfPlayersName,
            country : Session.get('country'),
            city : Session.get('city'),
            recursivePlay : Session.get('recursive'),
            gateEnteryCoinAmount : (!Session.get('ticketTournament'))?event.target.coinsEnteryAmount.value.trim():0,
            gateEnteryNotesAmount : (!Session.get('ticketTournament'))?event.target.notesEnteryAmount.value.trim():0,
            gateEnteryTicketAmount : (Session.get('ticketTournament'))?event.target.ticketEnteryAmount.value.trim():0,
            totalEnteryCoins: (event.target.hasOwnProperty('totalEnteryCoins'))?event.target.totalEnteryCoins.value.trim():0,
            totalEnteryNotes: (event.target.hasOwnProperty('totalEnteryNotes'))?event.target.totalEnteryNotes.value.trim():0,
            winnerCoins : event.target.winnerCoins.value.trim(),
            winnerNotes : event.target.winnerNotes.value.trim(),
            winnerTicket : event.target.winnerTicket.value.trim(),
            runnerUpCoins : event.target.runnerUpCoins.value.trim(),
            runnerUpNotes : event.target.runnerUpNotes.value.trim(),
            runnerUpTicket : event.target.winnerTicket.value.trim(),
            looserCoins:Session.get('leftCoins'),
            looserNotes:Session.get('leftNotes'),
            round0Notes:(event.target.round0Notes)?event.target.round0Notes.value:0,
            round1Notes:(event.target.round1Notes)?event.target.round1Notes.value:0,
            round2Notes:(event.target.round2Notes)?event.target.round2Notes.value:0,
            round3Notes:(event.target.round3Notes)?event.target.round3Notes.value:0,
            round4Notes:(event.target.round4Notes)?event.target.round4Notes.value:0,
            round0Coins:(event.target.round0Coins)?event.target.round0Coins.value:0,
            round1Coins:(event.target.round1Coins)?event.target.round1Coins.value:0,
            round2Coins:(event.target.round2Coins)?event.target.round2Coins.value:0,
            round3Coins:(event.target.round3Coins)?event.target.round3Coins.value:0,
            round4Coins:(event.target.round4Coins)?event.target.round4Coins.value:0,
        };
        
       if(Data.regEndTime){
            if(Data.regEndTime <= Data.regStartTime){
                alert('Registration end time should be greater than registration start time');
                return
            }
       }

       if(Data.matchStartTime){
            if(Data.matchStartTime <= Data.regEndTime){
                alert('Match start time should be greater than registration end time.');
            }
       }

       if(Data.matchEndTime){
            if(Data.matchEndTime <= Data.matchStartTime){
                alert('Match end time should be greater than match start time');
                return
            }
       }

        let shouldBeNumber = ['regStartTime',
                                'regEndTime',
                                'matchStartTime',
                                'matchEndTime',
                                'gateEnteryCoinAmount',
                                'gateEnteryNotesAmount',
                            //  'gateEnteryTicketAmount',
                                'totalEnteryCoins',
                                'totalEnteryNotes',
                                'winnerCoins',
                                'winnerNotes',
                            //  'winnerTicket',
                                'runnerUpCoins',
                                'runnerUpNotes',
                            //    'runnerUpTicket',
                                'round0Notes',
                                'round1Notes',
                                'round2Notes',
                                'round3Notes',
                                'round4Notes',
                                'round0Coins',
                                'round1Coins',
                                'round2Coins',
                                'round3Coins',
                                'round4Coins',
                                ]
       
        for(let index = 0;index< shouldBeNumber.length;index++){
            console.log(Number(Data[shouldBeNumber[index]]));
            Data[shouldBeNumber[index]] = Number(Data[shouldBeNumber[index]]);
            if(Data[shouldBeNumber[index]] && !Number(Data[shouldBeNumber[index]])){
                alert(`Please enter a valid ${shouldBeNumber[index]}`);
                return
            }
        }


      
        if(!Session.get('country')){
            alert('Please select country');
            return
        }
        if( Session.equals('ticketTournament',false) && !Data.gateEnteryCoinAmount && !Data.gateEnteryNotesAmount){ 

            alert('Please specify gate entery in coins or notes');
            return
        }

        if(Session.equals('ticketTournament',false) && !Data.totalEnteryCoins && !Data.totalEnteryNotes){ 

            alert('Please specify coins or notes to distributed');
            return
        }



        if(Data.winnerCoins==0 && Data.winnerNotes == 0 && Data.winnerTicket == 0){
            alert('Please enter winner rewards')
            return
        }


        if(Data.runnerUpCoins == 0 && Data.runnerUpNotes == 0 && Data.runnerUpTicket == 0){
            alert('Please enter Runner up rewards')
            return
        }

        if(Data.looserCoins < 0 && Data.looserNotes < 0 ){
            alert('Please enter appropriate rewards')
            return
        }
        let leftCoins = Session.get('leftCoins')
        let leftNotes = Session.get('leftNotes')
        
        if(leftCoins < (Data.round0Coins+Data.round1Coins+Data.round2Coins+Data.round3Coins+Data.round4Coins)){
            alert('Looser rewards in coins cannot be greater than total looser coins')
            return
        }

        if(leftNotes <(Data.round0Notes+Data.round1Notes+Data.round2Notes+Data.round3Notes+Data.round4Notes)){
            alert('Looser rewards in notes cannot be greater than total looser notes')
            // alert('Please enter appropriate rewards')
            return
        }


        Meteor.call('createTournament',Data,function(error,res){
            alert('Tournament added Successfully');
        });
      //  alert('form submit')

    }
    
});
Template.addTournament.helpers({

    'setCountry': function(myCountry, country) {
        if (myCountry == country) {
            return 'selected'
        }
    },
    'rounds':function(){
        return Session.get('rounds');
    },
    'setCity': function(myCountry, myCity, city) {
        if (myCity == city) {
            Session.set('country', myCountry);
            return 'selected'
        }
    },
    'numberOfPlayers':function(){
        return [64,32,16,8,4]
    },
    'countries': function() {
        var json = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': 'places.json',
                'dataType': "json",
                'success': function(data) {
                    json = data;
                }
            });
            return json;
        })();
        var countriesList = [];
        for (var name in json) {
            countriesList.push(name);
        }
        return countriesList.sort();
    },
    'cities': function() {
        var json = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': 'places.json',
                'dataType': "json",
                'success': function(data) {
                    json = data;
                }
            });
            return json;
        })();
        var cityList = [];
        return (json[Session.get('country')].sort());

    },
    WFP:function(){
        return !Session.get('WFP')
    },
    ticketTournament:function(){
        return !Session.get('ticketTournament')
    },
    leftCoins:function(){

            //  Session.set('leftCoins',
            //     Number(Session.get('totalEnteryCoins')) - (Number(Session.get('winnerCoins'))+Number(Session.get('runnerUpCoins')))
            // );
            //  if(Session.get('winnerCoins') || Session.get('runnerUpCoins')){
                return Session.get('leftCoins'); 
             // }
    },
    leftNotes:function(){
         // Session.set('leftNotes',
         //        Number(Session.get('totalEnteryNotes')) - (Number(Session.get('winnerNotes'))+Number(Session.get('runnerUpNotes')))
         //    );
         //  if(Session.get('winnerNotes') || Session.get('runnerUpNotes')){
                return Session.get('leftNotes');
             // }
    },
    showCities:function(){
        if(Session.get('country') == 'WholeWorld'){
            return false;
        }else{
            return true
        }
    },
    required:function(field){
        if(field == 'coins'){
            return ( Session.get('totalEnteryCoins') )?'required':'';
        }else if(field == 'notes'){
            return ( Session.get('totalEnteryNotes') )?'required':'';
        }
    }

});