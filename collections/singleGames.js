class singleGames extends Mongo.Collection{
	addSingleGame(Data){
		console.log(Data)
		return super.insert({...Data});
	}
	winningPercentage(userId){
		let wins = super.find({winner:userId}).count();
		let losses = super.find({looserId:userId}).count();
		return (wins/(wins+losses))*100;
	}
}

export default	singleGames = new singleGames("singleGames");
