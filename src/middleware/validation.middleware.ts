import { Response, Request, NextFunction } from 'express';
import Validation from '../services/validation/joi';

export default class ValidationMiddleware {
	public async registerUserValidation(req: Request, res: Response, next: NextFunction) {
		if (req.body.user) {
			const validResylt = await Validation.userValidation(req.body.user);
			if (validResylt.error) {
				return res.status(422).json({
					error: validResylt.error.details[0],
					message: 'validation fails',
				});
			}
			return next();
		} else {
			return res.status(422).json({ error: 'Request dont have field "user"', message: 'validation fails' });
		}
	}

	public async loginValidation(req: Request, res: Response, next: NextFunction) {
		if (req.body.password && req.body.email) {
			const validResylt = await Validation.loginValidation({
				email: req.body.email,
				password: req.body.password,
			});
			if (validResylt.error) {
				return res.status(422).json({ error: validResylt.error.details[0] });
			}
			return next();
		} else {
			return res.status(422).json({
				error: 'Request dont have any of this fields "password", "email"',
				message: 'validation fails',
			});
		}
	}

	public paramIsNumber(params: Array<string>) {
		return (req: Request, res: Response, next: NextFunction): void | Response => {
			let errorParam: null | string = null;
			const validation: boolean = params.some((el) => {
				if (Number.isInteger(Number(req.params[el]))) {
					return 1;
				} else {
					errorParam = el;
					return 0;
				}
			});
			const result = validation ? next() : res.status(422).json({ error: `Propery "${errorParam}" must be number` });
			return result;
		};
	}
}
