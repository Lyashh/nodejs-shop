import MainDatabaseService from "./mainDatbase.service";

export default class RoleService extends MainDatabaseService {
  public findAll() {
    return this.getAll("roles", ["*"]);
  }
}
