import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Class, ClassDocument, Feed } from 'src/schemas';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Class.name)
    private classModel: Model<ClassDocument>,
  ) {}

  /** CREATE */
  async create(classId: Types.ObjectId, feedCreateDto): Promise<Feed> {
    const foundClass = await this.classModel.findById(classId).exec();
    const len = foundClass.feed.push(feedCreateDto);
    return (await foundClass.save()).feed[len - 1];
  }

  /** READ */
}
