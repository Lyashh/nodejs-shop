import { Response, Request } from 'express';

export default class RootController {
	public index(req: Request, res: Response): Response {
		return res.status(200).json({ name: 'expres-rest-api-shop', version: '1.0' });
	}
}
