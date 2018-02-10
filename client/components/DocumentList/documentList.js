Template.documentList.onRendered(function(){
 Session.set('currentPage',1);
 Session.set('firstPage',1);
 let totalResult = UserMaster.find().count();
 let lastPage = Math.ceil(totalResult/10);
 Session.set('LastPage',lastPage);
});

Template.documentList.helpers({
 'users':function(){
 	return UserMaster.find({kycSubmitted:true},{sort:{updatedAt:-1},limit:10,skip:(10*(Session.get('currentPage')-1))}).fetch();
 },
 'usersCount':function(){
 	return UserMaster.find({kycSubmitted:true}).count()
 },
'usersPages':function(){
		let pages = [];
		let results = UserMaster.find({kycSubmitted:true}).count();
		 for(let i=0;i<=(results)/10;i++) {
				pages[i]={'pageNo': i+1};
			}
			
		return pages;
	},
 'isClassActive':function(page){
	if(page == Session.get('currentPage')){
		return 'active'
	}
 },
 'getUrl':function(url){
 	if(url){
 	 	return Meteor.absoluteUrl()+url;
 	}else{
 		return "#"
 	}
 },
 'isUrl':function(url,type){
 	if(url){
 		if(type == 'Idproof'){
 			return 'Id Proof' 			
 		}else if(type == 'passport'){
 			return 'Passport'
 		}else{
 			return 'addressProof'
 		}
 	}else{
 		return 'NA'
 	}

 },
 kycStatus:function(status){
 	if(status==1){
 		return 'Verified'
 	}else if(status == 2){
 		return 'Denied'
 	}
 }
});

Template.documentList.events({
	'click .userPage':function(){
		Session.set('currentPage',this.pageNo);
	},
	'click .nextPage':function(){
		let totalResult = UserMaster.find({kycSubmitted:true}).count();
 		let lastPage = Math.ceil(totalResult/10);
 		if(Session.get('currentPage') < lastPage){
			Session.set('currentPage',Session.get('currentPage')+1);
 		}
	},
	'click .prevPage':function(){
		if(Session.get('currentPage') > 1){
			Session.set('currentPage',Session.get('currentPage')-1);
		}
	},
	'click .deny':function(){
		Meteor.call('verifyKYC',this.userId,2);
	},
	'click .accept':function(){
		Meteor.call('verifyKYC',this.userId,1);
	},
	'click .logout':function(){
		Meteor.logout();
	}
});