Template.SingleGameFees.onRendered(function(){

});

Template.SingleGameFees.helpers({
	pricings:function(){
		return gamePricing.find().fetch();
	},
	edit:function(_id){
		return !Session.equals('edit',_id);
	}
});

Template.SingleGameFees.events({
	'click .edit' : function(){
		Session.set('edit',this._id);
		Session.set('deduction',this.deduction);
	} ,

	'click .save' : function(){
		let _id = Session.get('edit');
		let deduction = Number(Session.get('deduction'));
		Meteor.call('setSingleGameScore',_id,deduction,(err,res)=>{
			console.log(err,res);
			Session.set('edit','');
			Session.set('deduction','');
		});
		
	},
	'keyup .deduction':function(event){
		Session.set('deduction',event.target.value)
	}
});