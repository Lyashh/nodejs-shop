import { Response, Request, NextFunction } from 'express';
import Validation from '../services/validation/joi';

export interface CartRequest extends Request {
	cart?: any;
}

export default class ValidationMiddleware {
	public async registerUserValidation(req: Request, res: Response, next: NextFunction) {
		if (req.body.user) {
			const validResult = await Validation.userValidation(req.body.user);
			if (validResult.error) {
				return res.status(422).json({
					detail: validResult.error.details[0],
					message: 'validation fails',
				});
			}
			return next();
		} else {
			return res.status(422).json({ detail: 'Request dont have field "user"', message: 'validation fails' });
		}
	}

	public async loginValidation(req: Request, res: Response, next: NextFunction) {
		if (req.body.password && req.body.email) {
			const validResult = await Validation.loginValidation({
				email: req.body.email,
				password: req.body.password,
			});
			if (validResult.error) {
				return res.status(422).json({ detail: validResult.error.details[0] });
			}
			return next();
		} else {
			return res.status(422).json({
				detail: 'Request dont have any of this fields "password", "email"',
				message: 'validation fails',
			});
		}
	}

	public cartValidation() {
		return async (req: CartRequest, res: Response, next: NextFunction) => {			
			if (req.body.item) {
				const validResult = await Validation.cartValidation(req.body.item);
				if (validResult.error) {
					return res.status(422).json({ detail: validResult.error.details[0] });
				} else {
					return next();
				}
			} else {
				return res.status(422).json({detail: 'Request dont have any of this fields "item"'})
			}
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
			const result = validation ? next() : res.status(422).json({ detail: `Propery "${errorParam}" must be number` });
			return result;
		};
	}
}
