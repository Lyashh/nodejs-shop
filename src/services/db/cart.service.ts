import MainDatabaseService from "./mainDatbase.service";

export default class CartService extends MainDatabaseService {
  public findAll(): Promise<any> {
    return this.getAll("cart", ["*"]);
  }

  public addOrUpdateByAuth(item): Promise<any> {
    const cartQuery = this.knex("cart")
      .select("*")
      .where("user_id", item.user_id)
      .andWhere("product_id", item.product_id);
    return cartQuery
      .then((cart: Array<any>) => {
        if (cart.length > 0) {
          return cartQuery
            .update({ quantity: item.quantity + cart[0].quantity })
            .returning("*");
        } else {
          return this.knex("cart").insert(item).returning("*");
        }
      })
      .catch((err) => err);
  }

  public cartByUserId(id: number): Promise<any> {
    return this.knex("cart")
      .select("*")
      .where("user_id", id)
      .then((res) => res)
      .catch((err) => err);
  }

  public addArray = async (
    data: Array<{
      product_id: number;
      quantity: number;
      user_id: number;
    }>
  ): Promise<any> => {
    const result = await Promise.all(
      data.map((el) => {
        return this.addOrUpdateByAuth(el);
      })
    );
    return result;
  };

  public async sumOfProducts(
    data: Array<{
      product_id: number;
      quantity: number;
    }>
  ): Promise<number> {
    try {
      const sums: Array<{ sum: number }> = await Promise.all(
        data.map((product) => {
          return this.knex("products")
            .where("id", product.product_id)
            .select(
              this.knex.raw("sum(?? * ??) as ??", [
                "price",
                product.quantity,
                "sum",
              ])
            )
            .then((res) => res)
            .catch((err) => err);
        })
      );
      return sums
        .map((el: { sum: number }) => el[0].sum)
        .reduce((previous, current) => previous + current);
    } catch (e) {
      throw new Error(e);
    }
  }
}
