import { Response, Request } from 'express'

export class RootController {
    public static index(req: Request, res: Response) : Response {
        return res.json('Home')
    }
}