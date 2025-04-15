
import { Model } from "sequelize";
import { image } from '../models'; 

import {BaseRepository} from "./base.repository";
class ImageRepository extends BaseRepository< Model> {
  
  constructor({ model }:any ) {
    super({ model });
  }
}
export default new ImageRepository({ model: image });
