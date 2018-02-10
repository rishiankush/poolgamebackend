class TournamentFolder extends Mongo.Collection{
	serchByTitle(title){
		return super.findOne({title});
	}
	registerTournament(title){
		return super.insert({title,createdAt:Date.now(),updateAt:Date.now()});
	}
	searchById(_id){
		return super.findOne({_id});
	}
	getAllTournaments(){
		return super.find().fetch();
	}
}

 tournament = new TournamentFolder("TournamentFolder");
