import passport from 'passport';
import bcrypt from 'bcrypt';
import doenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Response, Request, NextFunction } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';

import UserService from '../db/user.service';

doenv.config();

export default class Auth {
	private static instance: Auth
	public _GoogleStrategy: GoogleStrategy
	public _LocalStrategy: LocalStrategy
	public _passport
	private userService: UserService

	private constructor() {
		this.userService = new UserService();
		this._passport = passport
		this._GoogleStrategy = new GoogleStrategy({
			clientSecret: process.env.CLIENT_SECRET as string,
			clientID: process.env.CLIENT_ID as string,
			callbackURL: 'api/v1/auth/google/callback',
			passReqToCallback: true,
		}, this.googleVerifyHandler)

		this._LocalStrategy = new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			session: true,
			passReqToCallback: true,
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

	private googleVerifyHandler(accessToken, refreshToken, profile, cb, done) {
		const user = {
			google_id: cb.id,
			name: cb.displayName,
			email: cb._json.email,
			registration_id: 2
		}
		return this.userService.createorFindOne(user).then((result) => {
			if (result.name == "error") {
				return done({ message: 'error', detail: result.ditail, code: result.code }, null)
			} else {
				return done(null, result)
			}
		}).catch(err => done({ err }, null))
	}

	private localVerifyHandler = (req, email, password, done) => {
		return this.userService.findByEmail(email, true).then(async (user) => {
			if (user) {
				try {
					const match = await bcrypt.compare(password, user.password);
					if (match) {
						return done(null,
							{
								id: user.id,
								email: user.email,
								name: user.name,
							});
					} else {
						req.session.loginError = { message: 'Wrong password', status: 422 };
						return done(null, false, { message: req.session.loginError.message });
					}
				} catch (e) {
					req.session.loginError = { message: e, status: 500 };
					return done(null, false, { message: e });
				}
			} else {
				req.session.loginError = { message: 'User with this email does not exist', status: 404 };
				return done(null, false, { message: req.session.loginError.message });
			}
		})
			.catch((err) => {
				req.session.loginError = { message: err, status: 500 };
				return done(null, false, { message: err });
			});
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
		return this._passport.authenticate('google');
	}

	public get localMiddleware() {
		return this._passport.authenticate('local', {
			failureRedirect: "/api/v1/auth/login/callback",
		})
	}

	public static get getInstance(): Auth {
		return this.instance || (this.instance = new this())
	}
}