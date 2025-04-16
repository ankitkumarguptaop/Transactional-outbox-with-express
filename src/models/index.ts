import { Sequelize } from 'sequelize';
import { initUserModel, User } from './user';
import { initProductModel, product } from './product';
import { initImageModel ,image } from './image';
import { initOutBoxMessageModel ,OutboxMessage } from './outbox-message';
import { initInBoxMessageModel ,InboxMessage } from './inbox-message';
import configObj from '../configs/dbconfig';

const config = configObj['development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password ?? undefined,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

initUserModel(sequelize);
initProductModel(sequelize);
initImageModel(sequelize);
initOutBoxMessageModel(sequelize)
initInBoxMessageModel(sequelize)

User.associate?.({});
product.associate?.({image,User});
image.associate?.({product});
OutboxMessage.associate?.({});
InboxMessage.associate?.({});

export { sequelize, User  ,product ,image  ,OutboxMessage  ,InboxMessage};
