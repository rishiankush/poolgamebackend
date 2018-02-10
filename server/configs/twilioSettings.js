/* 
settings to send the sms 
*/
import twilio from 'twilio';

sms = {
  accountSid: 'AC70c72bb8ed046cd6a1e461803309ed53',
  authToken: '8feb561cabe04896c981cdc8cd97d9c8',
};

const client = new twilio(sms.accountSid, sms.authToken);

//console.log(new twilio(sms.accountSid, sms.authToken))
//console.log(client)
sendSms = (phoneNum, randomNum) => {
  client
    .messages.create({
      body: 'PoolGame one time password:' + randomNum,
      to: phoneNum,
      from: '+16062631146',
    })
    .then((message, err) => {
      if (!err) {
        console.log(message);
      } else {
        console.log(err);
      }
    });
};
// customMessage = (phoneNum, body) => {
//   client
//     .sendSms({
//       body: body,
//       to: phoneNum,
//       from: '+12243863041',
//     })
//     .then((message, err) => {
//       if (!err) {
//         console.log(message);
//       } else {
//         console.log(err);
//       }
//     });
// };