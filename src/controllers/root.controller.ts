import { Response, Request } from 'express'

export default class RootController {
    public index(req: Request, res: Response) : Response {
        console.log(req);
        
        return res.json('Home')
    }
}