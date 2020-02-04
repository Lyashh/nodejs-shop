import { Response, Request } from 'express'

export default class UserControoller {
    public static createOne(req: Request, res: Response) : Response {
        return res.json('Create one user')
    }
}