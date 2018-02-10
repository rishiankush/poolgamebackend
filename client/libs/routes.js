let isLoggedIn = function() {
  if (Meteor.userId()) {
    this.next();
  } else {
    Router.go('/');
  }
};

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner',
  subscriptions: function() {
    return [Meteor.subscribe('users')];
  },
});

Router.route('/', {
  name: 'home',
  template: 'landingPage',
});

Router.route('/documentList', {
  name: 'documentList',
  template: 'documentList',
  subscriptions:function(){
    return Meteor.subscribe('UsersList');
  },
  onBeforeAction: function() {
    if (!Meteor.userId()) {
       Router.go('/');
    } else {
     this.next();
    }
  },
});

Router.route('/addTournament', {
  name: 'addTournament',
  template: 'addTournament',
  subscriptions:function(){
    return Meteor.subscribe('UsersList');
  },
  // onBeforeAction: function() {
  //   if (!Meteor.userId()) {
  //      Router.go('/');
  //   } else {
  //    this.next();
  //   }
  // },
});

Router.route('/SingleGameFees', {
  name: 'SingleGameFees',
  template: 'SingleGameFees',
  subscriptions:function(){
    return Meteor.subscribe('gamePricings');
  },
  // onBeforeAction: function() {
  //   if (!Meteor.userId()) {
  //      Router.go('/');
  //   } else {
  //    this.next();
  //   }
  // },
});

Router.route('/sendNotifications', {
  name: 'sendNotifications',
  template: 'sendNotifications',
  });

// Router.route('/bookingDetails', {
//   name: 'bookingDetails',
//   template: 'bookingDetails',
//   onBeforeAction: isLoggedIn,
//   waitOn: function() {
//     return [
//       Meteor.subscribe('BookingData'),
//       //Meteor.subscribe("users")
//     ];
//   },
// });

// Router.route('/userManagement', {
//   name: 'userManagement',
//   template: 'userManagement',
//   onBeforeAction: isLoggedIn,
//   waitOn: function() {
//     return [
//       Meteor.subscribe('UsersList'),
//       //Meteor.subscribe("users")
//     ];
//   },
// });

// Router.route('/disputeManagement', {
//   name: 'disputeManagement',
//   template: 'disputeManagement',
//   onBeforeAction: isLoggedIn,
//   waitOn: function() {
//     return [Meteor.subscribe('BookingData'), Meteor.subscribe('UsersList')];
//   },
// });

// Router.route('/settings/changePassword', {
//   name: 'settings',
//   template: 'settings',
// });

// Router.route('/settings/changeRateOfCommission', {
//   name: 'changeRateOfCommission',
//   template: 'changeRateOfCommission',
//   waitOn: function(){
//     return [Meteor.subscribe('AdminRateOfCommission')]
//   }
// });

// Router.route('/privacy', {
//   name: 'privacy',
//   template: 'privacy',
// });

// Router.route('/howItWorks', {
//   name: 'howItWorks',
//   template: 'howItWorks',
// });

// Router.route('/terms', {
//   name: 'terms',
//   template: 'terms',
// });

// Router.route('/aboutUs', {
//   name: 'aboutUs',
//   template: 'aboutUs',
// });

Router.route('/reset-password/:token', {
    name: 'resetPassword',
    template: 'resetPassword',
});

Router.route('/verify-email/:token', {
  name: 'verify-email',
  template: 'verifyEmail',
});