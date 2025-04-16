import { Model } from "sequelize";
import { image } from '../models'; 

import {BaseRepository} from "./base.repository";
class InboxMessageRepository extends BaseRepository< Model> {
  
  constructor({ model }:any ) {
    super({ model });
  }
}
export default new InboxMessageRepository({ model: image });
