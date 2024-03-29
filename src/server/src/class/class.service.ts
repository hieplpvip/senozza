import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model, Types } from 'mongoose';
import { Class, ClassDocument } from 'src/schemas';
import { ClassCreateDto, ClassDto, ClassUpdateDto } from './dto';
import * as referralCodeGenerator from 'referral-code-generator';

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

  generateCode(): string {
    return referralCodeGenerator.alpha('uppercase', 6);
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

  async findByCourse({
    courseCode,
    year,
    semester,
  }: {
    courseCode: string;
    year: number;
    semester: string;
  }): Promise<Class> {
    return this.classModel.findOne({ courseCode, year, semester }).exec();
  }

  async findByCode(code: string): Promise<Class> {
    return this.classModel.findOne({ inviteCode: code }).exec();
  }

  async listStudent(id: Types.ObjectId): Promise<any> {
    return this.classModel
      .findById(id)
      .populate({
        path: 'members',
      })
      .exec();
  }

  // Update
  async addPost(id: Types.ObjectId, postId: Types.ObjectId) {
    await this.classModel.updateOne({ _id: id }, { $push: { post: postId } });
  }

  async addMembers(id: Types.ObjectId, userIds: Types.ObjectId[]) {
    await this.classModel.updateOne({ _id: id }, { $addToSet: { members: { $each: userIds } } });
  }

  async update(id: Types.ObjectId, classUpdateDto: ClassUpdateDto): Promise<Class> {
    return this.classModel.findByIdAndUpdate(id, classUpdateDto, { new: true }).exec();
  }

  // Delete
  async leave(id: Types.ObjectId, memberId: Types.ObjectId) {
    await this.classModel.updateOne({ _id: id }, { $pull: { members: memberId } });
  }

  async leaveMany(ids: Types.ObjectId[], memberId: Types.ObjectId) {
    await this.classModel.updateMany({ _id: { $in: ids } }, { $pull: { members: memberId } });
  }

  async removePost(id: Types.ObjectId, postId: Types.ObjectId) {
    await this.classModel.updateOne({ _id: id }, { $pull: { post: postId } });
  }

  async delete(id: Types.ObjectId) {
    await this.classModel.findByIdAndDelete(id);
  }
}
