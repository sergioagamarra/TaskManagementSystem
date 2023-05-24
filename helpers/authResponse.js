const {production} = require("../config")

function authResponse(res, result, statusCode){
    if (result.success){
        const {token, ...data} = result;
        return res.cookie("token", token, {
            httpOnly: true,
            secure: production,
            sameSite: "none",
            expires: new Date(new Date().setDate(new Date().getDate()+7))
        }).json(data);
    }

    return res.status(statusCode).json(result);

}

function deleteCookie(res){
    return res.cookie("token", "", {
        expires: new Date(),
        httpOnly: true,
        sameSite: "none",
        secure: production
    }).json({
        success: true,
        message: "Successfully logged out"
    })
}

function providerResponse(res, result, statusCode){
    if (result.success){
        const {token, ...data} = result;
        return res.cookie("token", token, {
            httpOnly: true,
            secure: production,
            sameSite: "none",
            expires: new Date(new Date().setDate(new Date().getDate()+7))
        }).redirect("http://localhost:3000/login-callback")
    }
    return res.status(statusCode).json(result)
}

module.exports = {authResponse, deleteCookie, providerResponse}