import { Meteor } from 'meteor/meteor';
var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

Meteor.startup(() => {
  // code to run on server at startup
 // console.log(UserMaster.findOne({userId: 'vSAxTps8TqSbYARm9'}))
  // let account = Accounts.createUser({username:'superAdmin',password:'admin@123'});
  // // console.log('account',account);
  // Roles.addUsersToRoles(account, ['superAdmin']);
  var pricings = [
  	{
  		price: 10000,
  		deduction:3000,
  		type:1,
  		createdAt:Date.now(),
  		updatedAt:Date.now()
  	},
  	{
  		price: 50000,
  		deduction:15000,
  		type:1,
  		createdAt:Date.now(),
  		updatedAt:Date.now()
  	},
  	{
  		price: 25000,
  		deduction:50,
  		type:1,
  		createdAt:Date.now(),
  		updatedAt:Date.now()
  	},

  ]

  // pricings.forEach(each => {
  // 	gamePricing.insert(each)
  //   console.log('type added');
  // });

  // connectHandler.use(function (req, res, next) {
  //   res.setHeader('Access-Control-Allow-Origin', 'http://www.uslenterprise.com');
  //   res.setHeader('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']);
  //   res.setHeader('Access-Control-Max-Age', '1000');
  //   res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization', 'X-Requested-With']);
  //   return next();
  // });

});
