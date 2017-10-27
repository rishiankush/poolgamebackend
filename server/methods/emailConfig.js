Accounts.emailTemplates.resetPassword.text = function(user, url) {
  var uName = Meteor.user().profile.name,
    msg =
      'Your Credentials -\n-----------------------\nemail: ' +
      Meteor.user().emails +
      '\npassword: ' +
      Meteor.user().password +
      '\n\nTo reset your account password click on the following link. \n',
    from = '\n\n\nThank you! \n\nThe PoolGame Team. \n';

  return 'Hello ' + uName + ', \n\n' + msg + url + from + Meteor.absoluteUrl() + '\n';
};

Accounts.emailTemplates.verifyEmail.subject = function(user, url) {
  return 'Pool Game Verification Link';
};

Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  url = url.replace("#/", "");
  //url = url.replace('-', '')
  name = UserMaster.findOne({ userId: user._id }).fullName;
  return (
    " Hi " +
    name +
    "\n\nPlease click on the below verification link to activate your account:\n\n" +
    url +
    "\n\n Regards,\nnotifications@PoolGame.com"
  );
};