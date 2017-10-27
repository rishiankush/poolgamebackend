Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('UsersList', function() {
  return UserMaster.find({});
});