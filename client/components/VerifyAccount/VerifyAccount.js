import { Template } from 'meteor/templating';

Template.verifyEmail.onRendered(function() {
    Accounts.verifyEmail(Router.current()
        .params.token, (error) => {
            if (error) {
                console.log(error.reason)
                swal(
                    '',
                    error.reason,
                    'error'
                );
                Router.go('/');
            } else {
                console.log('Your account is verified');
                swal(
                    '',
                    'Your account is verified',
                    'success'
                );
                Router.go('/');
            }

        });
});