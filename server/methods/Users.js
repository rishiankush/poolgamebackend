Meteor.methods({
  authentication: function(userId, token) {
    //let UserData = Meteor.users.findOne({ _id: userId });
    let UserData = UserMaster.findOne({ userId: userId });
    let activeUser = UserData ? UserData.isActive : false;

    // console.log(userId, token);

    if (UserData) {
      // if (!UserData.profile.isActive) {
      if (!activeUser) {
        return {
          isActive: activeUser,
          authorise: false,
          message: 'Your account has been suspended',
        };
      } else if (UserMaster.checkToken(token, userId) && UserData.isActive) {
        //Meteor.call('setUserLastActivityTime', userId);
        return { isActive: activeUser, authorise: true, message: 'Authentication Pass' };
      } else {
        return { isActive: activeUser, authorise: false, message: 'Session Expired' };
      }
    } else {
      return { isActive: activeUser, authorise: false, message: 'User not found' };
    }
  },

  // setUserLastActivityTime: function(userId) {
  //   this.unblock();

  //   UserMaster.setUserLastActivityTime(userId);
  // },

  serverTime: function() {
    return Date.now();
  },
});