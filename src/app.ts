import log4js from 'log4js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import doenv from 'dotenv';

import DB from './database/connection';
import Router from './routes/index.router';
import auth from './services/auth/passport';

doenv.config();
const logger = log4js.getLogger();
const knex = DB.getInstance.getConnection;
const Passport = auth.getInstance;

class App {
	private static app: App
	private expressApp: express.Application
	private router: Router

	private constructor() {
		this.expressApp = express();
		this.router = new Router();
		this.config();

		knex.raw('SET timezone="UTC";').then(() => logger.info('Success connection to Database')).catch((err) => {
			logger.error({
				message: 'Database failed to connect',
				error: err,
			});
			throw new Error('Database failed to connect');
		});
	}

	private config(): void {
		this.expressApp.use(session({
			secret: 'cookie_secret',
			name: 'cookie_name',
			//store: sessionStore, 
			resave: false,
			saveUninitialized: true,
		}));
		this.expressApp.use(bodyParser.urlencoded({ extended: false }));
		this.expressApp.use(bodyParser.json());
		this.expressApp.use(cors());
		this.expressApp.use(express.static(__dirname + '/static'));

		this.expressApp.use(Passport._passport.initialize());
		this.expressApp.use(Passport._passport.session());

		this.expressApp.set('port', process.env.PORT || 3000)
		this.expressApp.use(`/api/${process.env.API_VERSION}/`, this.router.routes);
		this.expressApp.use((req, res, next) => {
			res.status(404);
			return res.json({ error: `Not found${req.originalUrl}` });
		});
	}

	public init(): void {
		this.expressApp.listen(this.expressApp.get('port'), () => {
			logger.info(`SERVER RUN ON PORT ${this.expressApp.get('port')}`);
		});
	}

	public static get getInstance(): App {
		const app: App = this.app || (this.app = new this());
		return app;
	}
}

const server = App.getInstance;
server.init();

export default App;
