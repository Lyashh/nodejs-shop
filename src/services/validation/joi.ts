import joi from "@hapi/joi";

/**
 *
 *
 * @export
 * @class Joi
 */
export default class Joi {
  public static userValidation(user): UserValidationResult {
    const schema = joi.object({
      name: joi.string().alphanum().min(1).max(40),
      email: joi.string().email().min(8).max(30).required(),
      password: joi.string().alphanum().min(8).max(30).required(),
    });
    return schema.validate(user);
  }

  public static loginValidation(user): UserValidationResult {
    const schema = joi.object({
      email: joi.string().email().min(8).max(100).required(),
      password: joi.string().alphanum().min(8).max(30).required(),
    });
    return schema.validate(user);
  }

  public static cartValidation(item): CartValidationResult {
    const schema = joi.object({
      product_id: joi.number().integer().min(1).required(),
      quantity: joi.number().integer().min(1).required(),
    });
    return schema.validate(item);
  }

  public static orderValidationNotAuth(item): Promise<any> {
    const carts = joi.object({
      product_id: joi.number().integer().required(),
    });

    const schema = joi.object({
      items: joi.array().items(carts).min(1),
      email: joi.string().email().min(5).max(100).required(),
      delivery_id: joi.number().integer().required(),
      payment_id: joi.number().integer().required(),
      address: joi
        .object({
          country: joi.string().min(2).max(50).required(),
          state: joi.string().min(2).max(50).required(),
          street: joi.string().min(2).max(150).required(),
          index: joi.number().integer().required(),
        })
        .required(),
    });
    return schema.validate(item);
  }

  public static emailValidation(email: string): Promise<any> {
    const schema = joi.string().email().min(5).max(100).required();
    return schema.validate(email);
  }
}

/**
 *
 *
 * @interface UserValidationResult
 */
interface UserValidationResult {
  value: { [key: string]: string | number };
  error: { [key: string]: string | number | object | Array<string | object> };
}

/**
 *
 *
 * @interface CartValidationResult
 */
interface CartValidationResult {
  value: { [key: string]: number };
  error: { [key: string]: string | number | object | Array<string | object> };
}
