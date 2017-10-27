class Payload {
  static getUserDataFromHeaders(data) {
    return { userId: data['x-user-id'], token: data['x-auth-token'] };
  }

  static checkMandatoryFields(Data, fields) {
    let field = '';
    let i = 0;
    for (let each in Data) {
      /*checks which field is blank*/
      if (!Data[each]) {
        field = each;
      }
    }

    return field;
  }
}

module.exports = Payload;