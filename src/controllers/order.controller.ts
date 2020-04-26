import { Response, Request } from 'express';

export default class OrderController {
	
	constructor() {
		
    }
    
    public addNotAuth() {
        return (req: Request, res: Response) => {
			res.json('a')
		}
    }
}
