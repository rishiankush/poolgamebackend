NonEmptyString = Match.Where(function(x) {
  //console.log('function called for non empty string *******',x)
  return x.length > 0 && typeof String(x) === "string";
});

checkNumber = Match.Where(function(x) {
   // console.log('function called for number check *******',x)
    return parseInt(x);
});

MaybeEmptyString = Match.Where(function(x) {
  return x.length >= 0;
});

isEmail = function(email) {
  let filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (filter.test(email)) {
    return true;
  }
};

isPhoneNo = function(mobile) {
  // return (mobile.match(/^\d{10,15}$/));
  //if (mobile.match(/^\d{11,15}$/)) {
  if (mobile.match(/^\+(?:[0-9] ?){6,14}[0-9]$/)) {
    return true;
  } else {
    return false;
  }
};

isDob = function(dob) {
  // return (mobile.match(/^\d{10,15}$/));
  //if (mobile.match(/^\d{11,15}$/)) {
  if (dob.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/)) {
    return true;
  } else {
    return false;
  }
};

isGender = function (gender) {
  if(gender.match(/^male$|^Male$|^female$|^Female$|^others$|^Others$/)){
      return true;
    } else{
      return false;
    }
}

isMartialStatus = function (martialStatus) {
  if(martialStatus.match(/^single$|^Single$|^married$|^Married$|^divorced$|^Divorced$/)){
      return true;
    } else{
      return false;
    }
}

onlyNumber = function(experience) {
 // let filter = /^[0-4][0-9]?$/;
 let filter = /^((\d|[1-9]\d+)(\.\d{0,1})?|\.\d{0,1})$/
  if (filter.test(experience)) {
    return true;
  } else{
    return false;
  }
};

capitalizeFirstLetter = function(name) {
    return name.charAt(0)
        .toUpperCase() + name.slice(1);
};

capitalizeEachLetter = function() {
    return this.toLowerCase()
        .split(' ')
        .map(function(word) {
            return word.capitalizeFirstLetter();
        })
        .join(' ');
};