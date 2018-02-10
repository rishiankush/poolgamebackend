class gamePricings extends Mongo.Collection{
	addPrice(Data){
		return super.findOne({title});
	}

	getGamePriceByType(type,fields){
		return super.find({type},{fields}).fetch();
	}

	editGameDeductions(_id,deduction){
		return super.update({_id},{$set:{deduction}});
	}

	getPricingDetail(_id,fields){
		return super.findOne({_id},{fields});
	}
}

 export default gamePricing = new gamePricings("gamePricings");
