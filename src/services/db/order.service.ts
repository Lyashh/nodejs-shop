import MainDatabaseService from "./mainDatbase.service";
import CartService from "./cart.service";
import AddressService, { Address } from "./address.service";
import ProdToOrdService, { ProdToOrdItem } from "./productsToOrders.service";

/**
 *
 *
 * @export
 * @class OrderService
 * @extends {MainDatabaseService}
 */
export default class OrderService extends MainDatabaseService {
  public cartService: CartService;
  public addressService: AddressService;
  public prodToOrdService: ProdToOrdService;

  /**
   *Creates an instance of OrderService.
   * @memberof OrderService
   */
  constructor() {
    super();
    this.prodToOrdService = new ProdToOrdService();
    this.addressService = new AddressService();
    this.cartService = new CartService();
  }

  /**
   *
   *
   * @private
   * @param {*} bodyOrder
   * @param {*} sessionCart
   * @returns {Promise<OrderInfo>}
   * @memberof OrderService
   */
  private toFormOrder(bodyOrder, sessionCart): Promise<OrderInfo> {
    /* get quantity prop from session cart */
    const items: Array<{
      product_id: number;
      quantity: number;
    }> = sessionCart.filter(
      (sessionEl: { product_id: number; quantity: number }) => {
        return bodyOrder.items.some((bodyEl: { product_id: number }) => {
          return sessionEl.product_id === bodyEl.product_id;
        });
      }
    );

    /* get current date */
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    return (
      this.cartService

        // GET FULL SUM OF ORDER
        .sumOfProducts(items)
        .then((sum: number) => {
          // PUT SUM TO ORDER
          const orderInfo: OrderInfo = {
            order: {
              sum,
              email: bodyOrder.email,
              delivery_id: bodyOrder.delivery_id,
              payment_id: bodyOrder.payment_id,
              created_at: currentDate,
              updated_at: currentDate,
            },
            address: bodyOrder.address,
            items,
          };
          return orderInfo;
        })
        .catch((err) => err)
    );
  }

  /**
   *
   *
   * @private
   * @param {Order} order
   * @returns {Promise<any>}
   * @memberof OrderService
   */
  private insert(order: Order): Promise<any> {
    return this.knex("order")
      .insert(order)
      .returning(["*"])
      .then((res) => res)
      .catch((e) => e);
  }

  /**
   *
   *
   * @param {*} bodyOrder
   * @param {*} sessionCart
   * @returns {Promise<{ items: Array<ProdToOrdItem>; order: Order }>}
   * @memberof OrderService
   */
  public insertAfterCreateAddress(
    bodyOrder,
    sessionCart
  ): Promise<OrdersAndItems> {
    let tempOrderInfo: OrderInfo | any = {};

    return (
      // FORM ORDER
      this.toFormOrder(bodyOrder, sessionCart)
        .then((orderInfo) => {
          tempOrderInfo = orderInfo;
          return this.addressService.insert(orderInfo.address);
        })

        // CREATE ADDRESS FOR ORDER
        .then((addressId: Array<{ id: number }>) => {
          tempOrderInfo.order.address_id = addressId[0].id;
          return this.insert(tempOrderInfo.order);
        })

        // CREARE ORDER WITH ADDRESS
        .then((savedOrder) => {
          const productsToOrders: Array<ProdToOrdItem> = tempOrderInfo.items.map(
            (el: ProductsToOrdersItem) => {
              el.order_id = savedOrder[0].id;
              return el;
            }
          );
          return this.prodToOrdService.insertArray(productsToOrders);
        })
        .then((items) => {
          console.log(items);
          return {
            order: tempOrderInfo.order,
            items,
          };
        })
        .catch((e) => e)
    );
  }

  /**
   *
   *
   * @param {string} email
   * @returns {(Promise<Array<Order> | []>)}
   * @memberof OrderService
   */
  public getByEmail(email: string): Promise<Array<Order> | []> {
    return this.knex("order")
      .select("*")
      .where("email", email)
      .then((res) => res)
      .catch((err) => err);
  }
}

/**
 *
 *
 * @interface Order
 */
interface Order {
  sum: number;
  address_id?: number;
  email: string;
  delivery_id: number;
  payment_id: number;
  created_at: string;
  updated_at: string;
}

/**
 *
 *
 * @interface ProductsToOrdersItem
 */
interface ProductsToOrdersItem {
  product_id: number;
  quantity: number;
  order_id?: number;
}

/**
 *
 *
 * @interface OrderInfo
 */
interface OrderInfo {
  address: Address;
  order: Order;
  items: Array<{ product_id: number; quantity: number }>;
}

/**
 *
 *
 * @export
 * @interface OrdersAndItems
 */
export interface OrdersAndItems {
  items: Array<ProdToOrdItem>;
  order: Order;
}
