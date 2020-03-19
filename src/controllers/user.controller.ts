import { Response, Request } from 'express';
import UserService from '../services/db/user.service';

export default class UserControoller {
  public getAll(req: Request, res: Response) {
    return UserService.findAll().then((users) => {
      if (users.errno) {
        return res.json({ error: users });
      }
      return res.json({ users });
    }).catch((err) => res.json({ err }));
  }

  public pagination(req: Request, res: Response) {
    return UserService.paginate(Number(req.params.page), Number(req.params.limit))
      .then(async (data: { users?: Object; maxPage: Object; }) => {
        if (data.users) {
          return res.json({
            data: {
              users: data.users,
              maxPage: data.maxPage,
            },
          });
        }
        res.status(404).json({ message: `Page ${req.params.page} does not exist`, maxPage: data.maxPage });
      }).catch((err) => res.json(err));
  }

  public getById(req: Request, res: Response) {
    return UserService.findById(Number(req.params.id)).then((user) => {
      if (user) {
        return res.json({ user });
      }
      return res.status(404).json({ message: `User with id: '${req.params.id}' does not exist` });
    }).catch((err) => res.json({ err }));
  }

  public deleteUser(req: Request, res: Response) {
    return UserService.deleteById(Number(req.params.id)).then((user) => {
      if (user) {
        return res.json({ message: `User with id: '${req.params.id}' deleted` });
      }
      return res.status(404).json({ message: `User with id: '${req.params.id}' does not exist` });
    }).catch((err) => res.json({ err }));
  }
}
