import { Response, Request } from "express";
import ProductService from "../services/db/product.service";

export default class ProductControoller {
  public productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public getAll() {
    return (req: Request, res: Response): Promise<Response> => {
      return this.productService
        .findAll()
        .then((products) => {
          return res.json(products);
        })
        .catch((err) => res.json({ err }));
    };
  }

  public pagination() {
    return (req: Request, res: Response): Promise<any> => {
      return this.productService
        .paginate(Number(req.params.page), Number(req.params.limit))
        .then(async (page) => {
          if (page.items) {
            return res.json({
              items: page.items,
              maxPage: page.maxPage,
              rows: page.rows,
            });
          }
          res
            .status(404)
            .json({
              message: `Page ${req.params.page} does not exist`,
              maxPage: page.maxPage,
            });
        })
        .catch((err) => res.json(err));
    };
  }

  public getById() {
    return (req: Request, res: Response): Promise<any> => {
      return this.productService
        .findById(parseInt(req.params.id))
        .then((product) => {
          if (product.name != "error") {
            return res.json(product);
          }
          if (product.name == "error") {
            return res.status(500).json(product);
          }
          return res
            .status(404)
            .json({
              message: `Product with id: '${req.params.id}' does not exist`,
            });
        })
        .catch((err) => {
          if (Object.keys(err).length === 0) {
            return res
              .status(404)
              .json({
                message: `Product with id: '${req.params.id}' does not exist`,
              });
          }
          return res.json({ err });
        });
    };
  }
}
