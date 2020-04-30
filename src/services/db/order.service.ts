import MainDatabaseService from "./mainDatbase.service";
import CartService from "./cart.service";
import AddressService, { Address } from "./address.service";

interface Order {
  sum: number;
  address_id?: number;
  items?: Array<{ product_id: number; quantity: number }>;
  phone: string;
  delivery_id: number;
  payment_id: number;
  created_at: string;
  updated_at: string;
}

interface OrderInfo {
  address: Address;
  order: Order;
}

export default class OrderService extends MainDatabaseService {
  public cartService: CartService;
  public addressService: AddressService;

  constructor() {
    super();
    this.addressService = new AddressService();
    this.cartService = new CartService();
  }

  public toFormOrder(bodyOrder, sessionCart): Promise<OrderInfo> {
    /* get quantity from session cart */
    const items: Array<{
      product_id: number;
      quantity: number;
    }> = sessionCart.filter(
      (sessionEl: { product_id: number; quantity: number }) => {
        return bodyOrder.items.some((bodyEl: { product_id: number }) => {
          return sessionEl.product_id == bodyEl.product_id;
        });
      }
    );

    /* get current date */
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    return this.cartService
      .sumOfProducts(items)
      .then((sum: number) => {
        const orderInfo: OrderInfo = {
          order: {
            sum,
            items,
            phone: bodyOrder.phone,
            delivery_id: bodyOrder.delivery_id,
            payment_id: bodyOrder.payment_id,
            created_at: currentDate,
            updated_at: currentDate,
          },
          address: bodyOrder.address,
        };
        return orderInfo;
      })
      .catch((err) => err);
  }

  public insert(order: Order): Promise<any> {
    return this.knex("order")
      .insert(order)
      .returning(["*"])
      .then((res) => res)
      .catch((e) => e);
  }

  public insertAfterCreateAddress(
    bodyOrder,
    sessionCart
  ): Promise<Array<{ Order }>> {
    let tempOrderInfo: OrderInfo | any = {};
    return this.toFormOrder(bodyOrder, sessionCart)
      .then((orderInfo) => {
        tempOrderInfo = orderInfo.order;
        return this.addressService.insert(orderInfo.address);
      })
      .then((addressId: Array<{ id: number }>) => {
        const order: Order = {
          sum: tempOrderInfo.sum,
          phone: tempOrderInfo.phone,
          delivery_id: tempOrderInfo.delivery_id,
          payment_id: tempOrderInfo.payment_id,
          created_at: tempOrderInfo.currentDate,
          updated_at: tempOrderInfo.currentDate,
          address_id: addressId[0].id,
        };
        return this.insert(order);
      })
      .then((res) => res)
      .catch((e) => e);
  }
}
