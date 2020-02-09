import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Router from './routes/index.router'
import passport  from 'passport'
import session from 'express-session'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'


const verifyHandler = (accessToken, refreshToken, profile, cb, done) => {
    const data = {
      id: cb.id,
      name: cb.displayName,
    }
    return done(null, data)
  };



import doenv from 'dotenv'  //add env
doenv.config()

class App {
    private  static _app: App
    private _expressApp: express.Application
    private _router: Router
    private constructor() {
        this._expressApp = express()
        this._router = new Router()
        this.config()
    }

    private config() {
        this._expressApp.use(session({
            secret: 'cookie_secret',
            name: 'cookie_name',
            //store: sessionStore, 
            proxy: true,
            resave: true,
            saveUninitialized: true
           })
         );
        this._expressApp.use(bodyParser.urlencoded({ extended: false }))
        this._expressApp.use(bodyParser.json())
        this._expressApp.use(cors())

        this._expressApp.use(passport.initialize()); // Used to initialize passport
        this._expressApp.use(passport.session()); // Used to persist login sessions

        passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true
          }, verifyHandler)); 

          // Used to stuff a piece of information into a cookie
            passport.serializeUser((user, done) => {
                done(null, user);
            });

            // Used to decode the received cookie and persist session
            passport.deserializeUser((user, done) => {
                done(null, user);
            });

            this._expressApp.get('/auth/google', passport.authenticate('google', {
                scope: ['profile'] // Used to specify the required data
            }));   
            
            this._expressApp.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
                console.log('callback');
                res.json('/secret');
            });

        this._expressApp.set('port', process.env.PORT || 3000)
        this._expressApp.use('/', this._router.routes)
        this._expressApp.use((req, res, next) => {
            res.status(404);
            return res.json({ error: 'Not found' })
        });
    }

    public init() {
        this._expressApp.listen(this._expressApp.get('port'), () => {
            console.log(`SERVER RUN ON PORT ${ this._expressApp.get('port') }`);
        })
    }

    public static get getInstance(): App {
        return this._app || (this._app = new this())
    }
}

const server = App.getInstance
server.init()


