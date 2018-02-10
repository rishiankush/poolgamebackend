Template.landingPage.onRendered(function(){

});

Template.landingPage.events({
	'submit .signInForm':function(event){
		event.preventDefault();
		let email = event.target.email.value;
		let password = event.target.password.value;

		Meteor.loginWithPassword(email,password,function(error){

			if(error){
				alert(error.reason);
			}else{
				let userType = Meteor.users.findOne({_id:Meteor.userId()}).roles[0];
				if(userType == 'checkDocs'){
					Router.go('/documentList')
				}else if(userType == 'superAdmin'){
					Router.go('/addTournament')
				}
				else{
					Meteor.logout();
				}
			}
		});
	}
});