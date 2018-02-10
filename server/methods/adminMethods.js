Meteor.methods({
	verifyKYC:function(userId,status){
		return UserMaster.update({userId},{$set:{kycVerified:status}});
	},
	createTournament:function(Data){
		let mainFolder;
		let tournamentExists = tournament.serchByTitle(Data.mainFolder);
		if(tournamentExists){
		 	// register new sub folder
		}else{
		 	tournamentExists = tournament.registerTournament(Data.mainFolder);
		}
		 console.log('tournamentExists',tournamentExists);
		if(tournamentExists){
			// register sub folder
			if(tournamentSubFolder.registerSubFolder({
													title:Data.subFolder,
													mainFolder:tournamentExists,
													waitForPlayer:Data.waitForPlayer,
													regStartTime:Data.regStartTime,
													regEndTime:Data.regStartTime,
													regEndTime:Data.regEndTime,
													matchEndTime:Data.matchEndTime,
													recursivePlay:Data.recursivePlay,
													ticketTournament:Data.ticketTournament,
													country:Data.country,
													city:Data.city,
													gateEntryCoinAmount:Data.gateEntryCoinAmount,
													gateEntryNotesAmount:Data.gateEntryNotesAmount,
													gateEntryTicketAmount:Data.gateEntryTicketAmount,
													winnerCoins:Data.winnerCoins,
													winnerNotes:Data.winnerNotes,
													winnerTicket:Data.winnerTicket,
													runnerUpCoins:Data.runnerUpCoins,
													runnerUpNotes:Data.runnerUpNotes,
													runnerUpTicket:Data.runnerUpTicket,
										            looserCoins:Data.looserCoins,
										            looserNotes:Data.looserNotes,
										            round0Notes:Data.round0Notes,
										            round1Notes:Data.round1Notes,
										            round2Notes:Data.round2Notes,
										            round3Notes:Data.round3Notes,
										            round4Notes:Data.round4Notes,
										            round0Coins:Data.round0Coins,
										            round1Coins:Data.round1Coins,
										            round2Coins:Data.round2Coins,
										            round3Coins:Data.round3Coins,
										            round4Coins:Data.round4Coins,
													createdBy:Date.now()
													})){
				return true;
			}
		}else{	
			return false
		}
	},

	setSingleGameScore:function(_id,deduction){
		return gamePricing.editGameDeductions(_id,deduction)
	}

})