import passport  from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import userService from '../db/user.service'
import { Response, Request, NextFunction } from 'express'


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
            passReqToCallback: true,
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ],

          }, Auth.googleVerifyHandler)
        this._passport.use(this._GoogleStrategy)
    }

    private static googleVerifyHandler(accessToken, refreshToken, profile, cb, done) {
        const user = {
            google_id: cb.id,
            name: cb.displayName,
            email: cb._json.email, 
            login: cb._json.email,
            registration: 0
        } 
        return userService.createOne(user).then((result) => {
            if(result.name=="error") {
                return done({message: 'error', detail: result.ditail, code: result.code}, null)
            } else {
                return done(null, result)
            }  
        }).catch(err => done({err}, null))
    }

    public get passportMiddl() {
        return [
            this._passport.initialize(),
            this._passport.session() 
        ]
    }

    public get googleAuth() {        
        return this._passport.authenticate('google')
    }

    public get googleMiddleware() {
        return (req: Request, res: Response, next: NextFunction)  => {
            this._passport.authenticate('google', (err, user, info) => {
                err ? res.json({err}) : next()        
            })(req, res, next)
        }
    }

    public static get getInstance(): Auth {
        return this._instance || (this._instance = new this())
    }
}