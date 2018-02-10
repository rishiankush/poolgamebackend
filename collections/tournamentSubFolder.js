class TournamentSubFolder extends Mongo.Collection{
	registerSubFolder(Data){
		//console.log('registerSubFolder',Data);
		return super.insert({...Data});
	}
	getAllTournaments(){
		return super.find().fetch();
	}
	getSubTournamentsByMainTournament(id){
		return super.find({mainFolder:id}).fetch()
	}
}

 tournamentSubFolder = new TournamentSubFolder("TournamentSubFolder");
