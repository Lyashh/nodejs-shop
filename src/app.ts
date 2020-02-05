import express from 'express'
import cors from 'cors'
import Router from './routes/index.router'
import DB from './database/connection/'

import doenv from 'dotenv'  //add env
doenv.config()

class App {
    private  static _app: App
    private _expressApp: express.Application
    private _db: DB
    private _router: Router
    private constructor() {
        this._db = DB.getInstance
        this._expressApp = express()
        this._router = new Router()
        this.config()
    }

    private config() {
        this._expressApp.use(cors())
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


