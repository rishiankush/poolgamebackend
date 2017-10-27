class MasterCollection extends Mongo.Collection {

    registerUser(data) {
        /* save related data to masterCollection */
        return super.insert(data);
    }

    getUserLoacation(userId) {
        return super.findOne({ userId }).location;
    }

    generateToken(id) {
        return super.update({ userId: id }, {
            $set: {
                auth: {
                    token: Random.secret(),
                    date_created: Date.now()
                }
            }
        });
    }

    getDeviceInfo(userId) {
        return super.findOne({ userId }).deviceInfo;
    }

    // saveDeviceInfoLogOut(id, deviceType, gcmId, deviceToken,token) {
    saveDeviceInfoLogOut(id, deviceToken, token) {
        return super.update({ userId: id }, {
            $set: {
                'deviceInfo.deviceToken': deviceToken, // given device token is deleted
                'auth.token': token // given token is deleted to log out.
            }
        });
    }

    saveDeviceInfoLogIn(id, deviceType, deviceToken) {
        //console.log(id,deviceType,gcmId,deviceToken);
        return super.update({ userId: id }, {
            $set: {
                deviceInfo: {
                    deviceType: deviceType,
                    deviceToken: deviceToken
                }
            }
        });
    }

    updateStatus(condition, query) {
        return super.update(condition, query, { upsert: true });
    }

    checkToken(token, userId) {
        if (super.findOne({ "auth.token": token, userId: userId })) return true;
        else {
            return false;
        }
    }

    setNotification(Data) {
        return super.update({ userId: Data.userId }, {
            $set: {
                getNotification: Data.status
            }
        });
    }

    getNotification(id) {
        return super.findOne({ userId: id }).getNotification;
    }

    getUserData(Data) {
        return super.findOne({
            $or: [{ email: Data }, { phoneNum: Data }, { userId: Data }]
        });
    }

    // setUserLastActivityTime(userId) {
    //     return super.update({ userId }, {
    //         $set: {
    //             seen: Date.now() // last activity time
    //         }
    //     });
    // }      

}

UserMaster = new MasterCollection("UserMaster");