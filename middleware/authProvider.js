const { 
    production, 
    oauthClientID,
    oauthClientSecret,
    callbackURL,
    callbackURLDev, 
    facebookAppID, 
    facebookAppSecret, 
    githubClientID,
    githubClientSecret
} = require("../config")

const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const GitHubStrategy = require("passport-github2").Strategy

const callbackUrl = (provider) => `${production?callbackURL:callbackURLDev}/api/auth/${provider}/callback`

const getProfile = (accessToken, refreshToken, profile, done) => {
    done(null,{profile})
}

const useGoogleStrategy = () => {
    return new GoogleStrategy({
        clientID: oauthClientID,
        clientSecret: oauthClientSecret,
        callbackURL: callbackUrl("google")
    },getProfile)
}

const useFacebookStrategy = () => {
    return new FacebookStrategy({
        clientID: facebookAppID,
        clientSecret: facebookAppSecret,
        callbackURL: callbackUrl("facebook"),
        profileFields: ['id', 'emails', 'displayName', 'name', 'photos']
    }, getProfile)
}

const useGitHubStrategy = () =>{
    return new GitHubStrategy({
        clientID: githubClientID,
        clientSecret: githubClientSecret,
        callbackURL: callbackUrl("github"),
        scope:["user:email"]
    },getProfile)
}

module.exports = {
    useGoogleStrategy,
    useFacebookStrategy,
    useGitHubStrategy
}