import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import Validation from '../services/validation/joi';
import UserService from '../services/db/user.service';

export default class AuthControoller {
	private userService: UserService

	constructor() {
		this.userService = new UserService()
	}

	public googleCallback(req: Request, res: Response): Response {
		if (req.isAuthenticated()) {
			return res.json({ message: 'success', detail: req.session!.passport.user });
		}
		return res.json({ message: 'error', detail: 'cant auth' });
	}

	public registration = (req: Request, res: Response) => {
		req.body.user.registration_id = 1;
		return bcrypt.hash(req.body.user.password, 10).then((hash) => {
			req.body.user.password = hash;
			return this.userService.createorFindOne(req.body.user).then((result) => {
				if (result.name === 'error') {
					return res.json({ message: 'error', detail: result.detail });
				}
				return res.status(201).json({ data: result });
			}).catch((err) => res.json({ err }));
		});
	}

	public login(req: Request, res: Response) {
		res.json({ message: 'success', detail: req.session!.passport.user });
	}

	public localCallback(req: Request, res: Response) {
		res.json({ message: 'error', detail: req.session!.messages });
	}

	public logout(req: Request, res: Response) {
		req.logout();
		return res.json({ message: 'success', detail: 'success logout' });
	}

	public failLogin(req: Request, res: Response): Response {
		return res.status(req.session!.loginError.status || 422)
			.json({ message: 'login error', detail: req.session!.loginError.message || 'Invalid username or password' });
	}

	public profile(req: Request, res: Response) {
		return res.json({user: req.session!.passport.user });
	}
}
