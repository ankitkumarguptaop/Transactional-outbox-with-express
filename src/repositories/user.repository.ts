
import { Model } from "sequelize";
import { User } from '../models'; 

import {BaseRepository} from "./base.repository";
class UserRepository extends BaseRepository< Model> {
  
  constructor({ model }:any ) {
    super({ model });
  }
}
export default new UserRepository({ model: User });
