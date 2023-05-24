//const dbError = require("../helpers/dbError")
const UserModel = require("../models/user")
const uuid = require("uuid")
const bcrypt = require("bcryptjs")

class User {

    async create(data){
        try {
            const user = await UserModel.create({
                ...data
            })
            return {
                created: true,
                user
            }
        } catch (error) {
            console.log("create() ", error);
            return error;
            //return dbError(error);
        }
    }

    async getAll(){
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            console.log("getAll() ", error);
            return error;
        }
    }

    async getByEmail(email){
        try {
            const user = await UserModel.findOne({email});
            console.log(user);
            return user;
        } catch (error) {
            console.log("getByEmail ", error);
            return error;
        }
    }

    async getOrCreateByProvider(data){
        const userData = {
            provider: {
                [data.provider]: true
            },
            idProvider: {
                [data.provider]: data.idProvider 
            }
        }
        let user = await UserModel.findOne(userData);
        if (!user) {
            data.password = uuid.v4()
            const newData = {
                ...data, 
                ...userData
            }

            try {
                user = await UserModel.create({
                    ...newData
                })
            } catch (error) {
                if(error.code === 11000 && error.keyValue.email){
                    const email = error.keyValue.email
                    const provider = "provider." + data.provider;
                    const idProvider = "idProvider." + data.provider;
                    user = await UserModel.findOneAndUpdate({
                        email
                    }, {
                        [provider]: true,
                        [idProvider]: data.idProvider
                    }, {
                        new: true
                    })

                    return {
                        created: true,
                        user
                    }
                }
                console.log(error);
                return error;
                //return dbError(error);
            }
        }
        return {
            created: true,
            user
        }
    }

}

module.exports = User