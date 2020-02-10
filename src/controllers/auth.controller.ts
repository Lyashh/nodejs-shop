import { Response, Request } from 'express'

export default class AuthControoller {
    public googleCallback(req: Request, res: Response) : Response {
        console.log(req.session);
        console.log('callback');
        return res.json('/secret');
    }
}