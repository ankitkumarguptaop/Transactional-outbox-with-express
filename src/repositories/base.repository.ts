import { Model, ModelStatic, FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from "sequelize";


interface FindAllParams {
  criteria?: Record<string, any>;
  include?: any[];
  order?: any;
  attributes?: any;
  offset?: number;
  paranoid?: boolean;
  limit?: number | null;
}

interface FindAndCountAllParams {
  criteria: Record<string, any>;
  include?: any[];
  offset?: number;
  limit?: number;
}

interface CountParams {
  criteria?: Record<string, any>;
  options?: Omit<FindOptions, 'where'>;
}

interface SoftDeleteParams {
  criteria: Record<string, any>;
  options?: DestroyOptions;
}

export class BaseRepository<T extends Model> {
  private model: ModelStatic<T>;

  constructor({ model }: { model: ModelStatic<T> }) {
    this.model = model;
  }

  async create(payload: any, options: CreateOptions = {}): Promise<any> {
    const instance = await this.model.create(payload, options);
    return instance && instance.toJSON();
  }

  async update({ payload, criteria, options = {} }: any): Promise<[number, T[]]> {
    return await this.model.update(payload, { where: criteria, ...options });
  }

  async findAll({
    criteria = {},
    include = [],
    order,
    attributes = {},
    offset = 0,
    paranoid = true,
    limit = null,
  }: FindAllParams): Promise<T[]> {
    const findQuery: FindOptions = {
      where: criteria,
      include,
      attributes,
      offset,
      order,
      paranoid,
      subQuery: false,
    };
    if (limit) findQuery.limit = limit;
    return await this.model.findAll(findQuery);
  }

  async findAndCountAll({ criteria, include = [], offset = 0, limit = 10 }: FindAndCountAllParams) {
    return await this.model.findAndCountAll({
      where: criteria,
      include,
      offset,
      limit,
    });
  }

  async findOne(criteria: Record<string, any>, include: any[] = [], attributes: any = {}, options: FindOptions = {}): Promise<T | null> {
    return await this.model.findOne({
      where: criteria,
      include,
      attributes,
      ...options,
    });
  }

  async createBulk(payload: any[], options?: CreateOptions): Promise<T[]> {
    return await this.model.bulkCreate(payload, options);
  }

  async count({ criteria = {}, options = {} }: CountParams): Promise<number> {
    return await this.model.count({ where: criteria, ...options });
  }

  async softDelete({ criteria, options }: SoftDeleteParams|any): Promise<number> {
    return await this.model.destroy({ where: criteria, ...options });
  }
}
