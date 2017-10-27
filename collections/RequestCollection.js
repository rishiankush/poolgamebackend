/*
Request collection is a kind of additional collection in which data of unverified user is stored.
After the user is verified, data from this collection is remived and added in main collection i.e 
UserMaster collection.
*/
class RequestCollection extends Mongo.Collection {
    
    registerUser(data) {
        /* save related data to RequestCollection */
        return super.insert(data);
    }
    // upsert user for Request collection

    upsertUser(Data) {
        console.log(Data, "%%%%%%%%%%%%%%%");
        let checkEmail = super.findOne({ email: Data.email }),
            checkPhone = super.findOne({ phoneNum: Data.phoneNum });
        // console.log(checkPhone, "check phoene is hereeeeee");
        // console.log(checkEmail, "check email is hereeeeee")
        if (checkEmail) {
            return super.update({
                email: Data.email
            }, Data, { upsert: true });
        } else if (checkPhone) {
            return super.update({
                phoneNum: Data.phoneNum
            }, Data, { upsert: true });
        } else {
            return super.update({
                email: Data.email,
                phoneNum: Data.phoneNum
            }, Data, { upsert: true });
        }
    }
}

Request = new RequestCollection("Request");