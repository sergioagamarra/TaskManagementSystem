const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config");

const User = require("./users");
//const dbError = require("../helpers/dbError");

class Auth {
    async login(data){
        try {
            const {email, password} = data;
            const userServ = new User();
            const user = await userServ.getByEmail(email);
            //console.log(user);
            if (user && await this.#compare(password, user.password)){
                return this.#getUserData(user);
            }
            return {
                success: false,
                errors: [{
                    credentials: "The credentials are incorrect"
                }]
            }
        } catch (error) {
            console.log(error);
            //return dbError(error);
        }

    }

    async signup(data){
        try {
            if (data && data.password){
                data.password = await this.#encrypt(data.password);
            }
            data.provider = {
                local: true
            }
            const userServ = new User();
            const result = await userServ.create(data);
            if (!result.created){
                return {
                    success: false,
                    errors: result.errors
                }
            }
            return this.#getUserData(result.user);

        } catch (error) {
            console.log(error);
            //return dbError(error);
        }
    }

    async socialLogin(data){
        try {
            const userServ = new User();
            const user = {
                idProvider: data.id,
                name: data.displayName,
                email: data.emails[0].value,
                profilePic: data.photos[0].value,
                provider: data.provider
            }
            const result = await userServ.getOrCreateByProvider(user);
            if (!result.created){
                return {
                    success: false,
                    errors: result.errors
                }
            }
            return this.#getUserData(result.user);
        } catch (error) {
            console.log("socialLogin() ", error);
            return error;
            //return dbError(error);
        }
    }

    async #encrypt(string){
        try {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(string, salt);
            return hash;
        } catch (error) {
            return false;
        }
    }

    #getUserData(user){
        const userData = {
            name: user.name,
            email: user.email,
            id: user.id,
            provider: user.provider,
            idProvider: user.idProvider
        }

        const token = this.#createToken(userData);
        return {
            success: true,
            user: userData,
            token
        }
    }

    #createToken(payload){
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: "7d"
        });
        return token;
    }

    async #compare(string, hash){
        try {
            console.log(string, hash);
            return await bcrypt.compare(string, hash);
            
        } catch (error) {
            return false;
        }
    }

}

module.exports = Auth