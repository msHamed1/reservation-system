import { Model, Types, UpdateQuery, _FilterQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepositiry<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
  
    return (await newDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filter: _FilterQuery<TDocument>): Promise<TDocument> {
    const doc = await this.model.findOne(filter).lean<TDocument>(true);

    if (!doc) {
      this.logger.warn('Doc not found ', filter);
      throw new NotFoundException('doc not found');
    }
    return doc;
  }

  async findOrUpdate(
    filter: _FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const doc = await this.model
      .findOneAndUpdate(filter, update, {
        new: true,
      })
      .lean<TDocument>(true);
    if (!doc) {
      this.logger.warn('Doc not found ', filter);
      throw new NotFoundException('doc not found');
    }
    return doc;
  }
  async find(filter: _FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filter).lean<TDocument[]>(true);
  }


  async findOneAndDelete(filter: _FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOneAndDelete(filter).lean<TDocument>(true);
  }
}
