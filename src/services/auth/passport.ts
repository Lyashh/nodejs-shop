import passport  from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'

import doenv from 'dotenv'  //add env
doenv.config()

export default class Auth {
    private  static _instance: Auth
    public _GoogleStrategy: GoogleStrategy
    public _passport
    private constructor() {
        this._passport = passport
        this._passport.serializeUser((user, done) => {
            done(null, user)})
        this._passport.deserializeUser((user, done) => {
            done(null, user)})

        this._GoogleStrategy = new GoogleStrategy({
            clientID: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true
          }, Auth.verifyHandler)
        this._passport.use(this._GoogleStrategy)
    }

    private static verifyHandler(accessToken, refreshToken, profile, cb, done) {
        const data = {
            id: cb.id,
            name: cb.displayName,
            email: cb._json.email
        }
        return done(null, data)
    }

    public get passportMiddl() {
        return [
            this._passport.initialize(),
            this._passport.session() 
        ]
    }

    public get googleAuth() {
        return this._passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        })
    }

    public get googleMiddleware() {
        return this._passport.authenticate('google')
    }

    public static get getInstance(): Auth {
        return this._instance || (this._instance = new this())
    }
}