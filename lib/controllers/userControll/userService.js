const devConfig = require('../../config/devConfig');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/userSchema');

async function userLogin(req, google) {

    let query = {
        email: req.body.email,
        password: req.body.password
    }

    if (google == 'google') {
        return userSchema.findOne({ email: req.body.email }).then(async result => {
            if (result) {

                let encodeData = {
                    _id: result._id,
                    email: result.email
                };
                let token = await jwt.sign(encodeData, devConfig.secretKey, { expiresIn: '1 day' });

                result = result.toObject();
                result['token'] = token;
                return result;

            } else {
                return 1;
            }
        })
    }

    return await userSchema.findOne(query).then(async result => {
        if (result) {

            let encodeData = {
                _id: result._id,
                email: result.email
            };
            let token = await jwt.sign(encodeData, devConfig.secretKey, { expiresIn: '1 day' });

            result = result.toObject();
            result['token'] = token;
            return result;

        } else {
            return 1;
        }
    })
}

async function addUser(req) {

    req.body.status = 'ACTIVE';
    req.body.u_type = 'STUDENT';

    let existUser = await userSchema.findOne({ email: req.body.email })
    if (existUser) {
        return 1;
    } else {
        return await userSchema.create(req.body).then(result => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
}


async function userList(req) {
    return await userSchema.find({ email: { $not: { $eq: devConfig.superAdminConfig.email } } }).sort({ 'createdAt': -1 })
}

module.exports = {
    userLogin,
    addUser,
    userList
}