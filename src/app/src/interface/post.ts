import { CommentDto } from './comment';

export type PostDto = {
  _id: string;
  title: string;
  category: string;
  question: CommentDto;
  pin: boolean;
  classId: object;
};
