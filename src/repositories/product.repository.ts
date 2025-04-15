import { Model } from "sequelize";
import { product } from "../models";

import { BaseRepository } from "./base.repository";
class ProductRepository extends BaseRepository<Model> {
  constructor({ model }: any) {
    super({ model });
  }
}
export default new ProductRepository({ model: product });
