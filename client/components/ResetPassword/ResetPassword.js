import { Template } from 'meteor/templating';

Template.resetPassword.onCreated(function() {});

Template.resetPassword.events({
  'submit .form': function(event, template) {
    event.preventDefault();
    let newPassword = event.target.newPassword.value,
      confirmPassword = event.target.confirmPassword.value;
    if (newPassword.trim().length != 0 && confirmPassword.trim().length != 0) {
      if (confirmPassword == newPassword) {
        Accounts.resetPassword(Router.current().params.token, newPassword, function(error) {
          if (!error) {
            swal('', 'Your password has been changed successfully', 'success');
          } else {
            swal('', 'You have already reset your password', 'error');
          }
        });
      } else {
        swal('', 'Password mismatched', 'error');
      }
    } else {
      swal('', 'Password cannot accept blank spaces', 'error');
    }
    event.target.newPassword.value = '';
    event.target.confirmPassword.value = '';
  },
});