import log4js from "log4js";
import DB from "../../database/connection";
import MainDatabaseService, { PaginationData } from "./mainDatbase.service";
import { seed } from "../../database/seeds/users";

const logger = log4js.getLogger();
logger.level = "debug";

export default class UserService extends MainDatabaseService {
  public createorFindOne(newUser): Promise<any> {
    return this.knex("users")
      .where("email", newUser.email)
      .then((res) => {
        if (res.length === 0) {
          return this.knex("users")
            .insert(newUser)
            .returning(["id", "email", "role_id", "name"])
            .then((res) => ({
              message: "New User",
              user: res,
            }))
            .catch((err) => err);
        }
        return {
          message: "User already exists",
          user: {
            id: res[0].id,
          },
        };
      })
      .catch((err) => err);
  }

  public findByEmail(email: string, password = false): Promise<any> {
    const fields: Array<string> = ["id", "name", "email"];
    if (password) {
      fields.push("password");
    }
    return this.knex
      .select(fields)
      .from("users")
      .where("email", email)
      .first()
      .then((user) => user)
      .catch((err) => err);
  }

  public findAll(): Promise<any> {
    return this.getAll("users", ["id", "name", "email"]);
  }

  public findById(id: number): Promise<any> {
    return this.knex
      .select(
        "u.name",
        "u.id",
        "u.email",
        "rol.title AS role",
        "reg.title AS registration"
      )
      .from("users AS u")
      .leftJoin("roles AS rol", "u.role_id", "rol.id")
      .leftJoin("registration AS reg", "u.registration_id", "reg.id")
      .where("u.id", id)
      .first()
      .then((user) => user)
      .catch((err) => err);
  }

  public findByRole(roleId: number): Promise<any> {
    return this.knex("users")
      .select("*")
      .where("role_id", roleId)
      .then((res) => res);
  }

  public deleteById(id: number): Promise<any> {
    return this.knex("users")
      .where("id", id)
      .del()
      .then((user) => user)
      .catch((err) => err);
  }

  public paginate(page: number, limit: number): Promise<PaginationData> {
    return this.paginateTable(page, limit, "users", ["name", "id", "email"]);
  }

  public clearTable() {
    return this.knex("users").del();
  }

  public seedTable(): Promise<any> {
    return seed(this.knex);
  }
}
