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

static mentionMandatoryFields(Data,fields){
  for(let i=0; i< fields.length ; i++){

    if(!Data.hasOwnProperty([fields[i]]) || !Data[fields[i]]){
      return `Please enter ${fields[i]}`;
    }
  }
}

static feildsCannotBeEdited(Data,fields){
   for(let i=0; i< fields.length ; i++){
    if(Data.hasOwnProperty([fields[i]])){
      return `${fields[i]} cannot be edited`;
    }
  }
}

}



module.exports = Payload;