import { Response, Request } from 'express';

export default class RootController {
  public index(req: Request, res: Response) : Response {
    return res.json('Home');
  }
}
