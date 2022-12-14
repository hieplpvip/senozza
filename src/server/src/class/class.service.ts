import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Class, ClassDocument } from 'src/schemas';
import { ClassCreateDto } from './dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private classModel: Model<ClassDocument>,
  ) {}

  // Create
  async create(classCreateDto: ClassCreateDto): Promise<Class> {
    const createdClass = new this.classModel(classCreateDto);
    return createdClass.save();
  }

  // Find
  async find(id: ObjectId): Promise<Class> {
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
}
