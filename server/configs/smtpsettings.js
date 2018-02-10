smtp = {
  username: 'rishiankush',
  password: 'Hello@1a', //igniva@3197
  secure: false,
  port: 2525,
  server: 'mail.smtp2go.com',
};

process.env.MAIL_URL =
  'smtp://' +
  encodeURIComponent(smtp.username) +
  ':' +
  encodeURIComponent(smtp.password) +
  '@' +
  encodeURIComponent(smtp.server) +
  ':' +
  smtp.port;

// By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
Accounts.emailTemplates.from = '<notifications@PoolGame.com>';

// The public name of your application.
Accounts.emailTemplates.siteName = 'PoolGame';