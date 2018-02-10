Meteor.methods({
  getMessagesCode: function(text) {
    this.unblock();

    let message = SystemMessages.findOne({ message: text });
    if (message) return message.code;
    else {
      SystemMessages.insert({
        message: text,
        code: Meteor.call('getNextSequence', 'SystemMessages'),
        date_created: new Date(),
      });

      return SystemMessages.findOne({ message: text }).code;
    }
  },
});