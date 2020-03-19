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
      next();
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
      next();
    } else {
      return res.status(422).json({
        error: 'Request dont have any of this fields "password", "email"',
        message: 'validation fails',
      });
    }
  }
}
