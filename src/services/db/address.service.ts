import MainDatabaseService from "./mainDatbase.service";

export interface Address {
  country: string;
  state: string;
  street: string;
  index: number;
}

export default class AddressService extends MainDatabaseService {
  public insert(newAddress: Address): Promise<Array<{ id: number }>> {
    return this.knex("address")
      .insert(newAddress)
      .returning(["id"])
      .then((res) => res)
      .catch((err) => err);
  }
}
