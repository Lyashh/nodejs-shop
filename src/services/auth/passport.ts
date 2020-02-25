import passport  from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import userService from '../db/user.service'
import { Response, Request, NextFunction } from 'express'
import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcrypt'

import doenv from 'dotenv'  //add env
doenv.config()

export default class Auth {
    private  static _instance: Auth
    private _localErrror: string
    public _GoogleStrategy: GoogleStrategy
    public _LocalStrategy:  LocalStrategy
    public _passport
    private constructor() {
        this._localErrror = ''
        this._passport = passport
        this._GoogleStrategy = new GoogleStrategy({
            clientID: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true,
          }, this.googleVerifyHandler)

        this._LocalStrategy = new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: true
        }, this.localVerifyHandler)
          
        this._passport.use(this._GoogleStrategy)
        this._passport.use(this._LocalStrategy)
        
        this._passport.serializeUser((user, done) => {
            done(null, user)
        })

        this._passport.deserializeUser((user, done) => {
            done(null, user)
        })
    }

    private  googleVerifyHandler(accessToken, refreshToken, profile, cb, done) {
        const user = {
            google_id: cb.id,
            name: cb.displayName,
            email: cb._json.email, 
            registration_id: 2
        } 
        return userService.createorFindOne(user).then((result) => {
            if(result.name=="error") {                
                return done({message: 'error', detail: result.ditail, code: result.code}, null)
            } else {
                return done(null, result)
            }  
        }).catch(err => done({err}, null))
    }

    private  localVerifyHandler(email, password, done) {
        return userService.findByEmail(email).then(async user => {
            if(user) {
                const match = await bcrypt.compare(password, user.password)
                if(match) {
                    return done(null, {id: user.id, email: user.email, name: user.name, role: user.role_id});
                } else {
                    return done(null, false, { message:  'Wrong password' })
                }
            } else {
                return done(null, false, { message: 'User with this email not found' })
            }
        })
    }


    public get googleAuth() {        
        return this._passport.authenticate('google', { 
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ],
        })
    }

    public get googleMiddleware() {
        return this._passport.authenticate('google')
    }

    public get localMiddleware() {
        return this._passport.authenticate('local', {   failureRedirect: "/auth/login/callback", 
                                                        failureMessage: "Invalid username or password" })
    }

    public static get getInstance(): Auth {
        return this._instance || (this._instance = new this())
    }
}