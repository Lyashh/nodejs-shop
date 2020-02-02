import express from 'express'
import cors from 'cors'
import router from './routes/'
import DB from './database/connection/'

import doenv from 'dotenv'  //add env
doenv.config()

class App {
    private  static _app: App
    private _expressApp: express.Application
    private _db: DB
    private constructor() {
        this._db = DB.getInstance
        this._expressApp = express()
        this.config()
    }

    private config() {
        this._db.getConnection()
        this._expressApp.use(cors())
        this._expressApp.set('port', process.env.PORT || 3000)
        this._expressApp.use('/', router.routes)
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


