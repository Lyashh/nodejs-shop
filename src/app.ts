import log4js  from 'log4js'
const logger = log4js.getLogger();


import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Router from './routes/index.router'
import session from 'express-session'

import DB from './database/connection/'
const knex = DB.getInstance.getConnection

import auth from './services/auth/passport'
const passport = auth.getInstance

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

        knex.raw('SET timezone="UTC";').then(result => logger.info('Success connection to Database')).catch(err => {
            logger.error({
                message: 'Database failed to connect',
                error: err
            })
            throw new Error('Database failed to connect');
        })
    }

    private config() {
        
        this._expressApp.use(session({
            secret: 'cookie_secret',
            name: 'cookie_name',
            //store: sessionStore, 
            resave: false,
            saveUninitialized: true
           })
         );
        this._expressApp.use(bodyParser.urlencoded({ extended: false }))
        this._expressApp.use(bodyParser.json())
        this._expressApp.use(cors())
        
        this._expressApp.use(passport._passport.initialize())
        this._expressApp.use(passport._passport.session())

        this._expressApp.set('port', process.env.PORT || 3000)
        this._expressApp.use('/', this._router.routes)
        this._expressApp.use((req, res, next) => {
            res.status(404);
            return res.json({ error: 'Not found '  + req.originalUrl})
        });
    }

    public init() {
        this._expressApp.listen(this._expressApp.get('port'), () => {
            logger.info(`SERVER RUN ON PORT ${ this._expressApp.get('port') }`)
        })
    }

    public static get getInstance(): App {
        return this._app || (this._app = new this())
    }
}

const server = App.getInstance
server.init()


