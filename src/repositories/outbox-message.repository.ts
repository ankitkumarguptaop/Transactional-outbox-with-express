
import { Model } from "sequelize";
import { OutboxMessage } from '../models'; 

import {BaseRepository} from "./base.repository";
class OutboxMessageReository extends BaseRepository< Model> {
  
  constructor({ model }:any ) {
    super({ model });
  }
}
export default new OutboxMessageReository({ model: OutboxMessage });
