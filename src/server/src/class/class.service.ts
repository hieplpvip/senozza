import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model, Types } from 'mongoose';
import { Class, ClassDocument } from 'src/schemas';
import { ClassCreateDto, ClassDto } from './dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private classModel: Model<ClassDocument>,
  ) {}

  classMapper(foundClass: Class): ClassDto {
    const mapper = buildMapper(ClassDto);
    return mapper.serialize(foundClass);
  }

  // Create
  async create(classCreateDto: ClassCreateDto): Promise<Class> {
    const createdClass = new this.classModel(classCreateDto);
    return createdClass.save();
  }

  // Find
  async find(id: Types.ObjectId): Promise<Class> {
    return this.classModel.findById(id).exec();
  }

  async findByCourse(
    courseCode: string,
    year: number,
    semester: number,
  ): Promise<Class> {
    return this.classModel.findOne({ courseCode, year, semester }).exec();
  }

  // Update
  async addFeed(id: Types.ObjectId, feedId: Types.ObjectId) {
    const foundClass = await this.classModel.findById(id).exec();
    foundClass.feed.push(feedId);
    foundClass.save();
  }
}
