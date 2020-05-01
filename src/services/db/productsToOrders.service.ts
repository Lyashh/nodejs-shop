import MainDatabaseService from "./mainDatbase.service";

/**
 *
 *
 * @export
 * @class ProdToOrdService
 * @extends {MainDatabaseService}
 */
export default class ProdToOrdService extends MainDatabaseService {
  public insertArray(
    items: Array<ProdToOrdItem>
  ): Promise<Array<ProdToOrdItem>> {
    return this.knex("productsToOrders")
      .insert(items)
      .returning(["*"])
      .then((res) => res)
      .catch((e) => e);
  }
}

/**
 *
 *
 * @export
 * @interface ProdToOrdItem
 */
export interface ProdToOrdItem {
  product_id: number;
  quantity: number;
  order_id: number;
  id?: number;
}
