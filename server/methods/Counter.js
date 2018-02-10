Meteor.methods({
  getNextSequence: function(colName) {
    this.unblock();

    Counter.upsert(
      { _id: colName },
      {
        $inc: {
          seq: 1,
        },
        $set: {
          date_updated: new Date(),
        },
        $setOnInsert: {
          date_created: new Date(),
        },
      }
    );

    return Counter.findOne({ _id: colName }).seq;
  },
});