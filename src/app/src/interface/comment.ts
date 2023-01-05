import { UserDto } from './user';

export type CommentDto = {
  _id: string;
  user: UserDto;
  createdDate: string;
  content: string;
  vote: number;
  bestAnswer: boolean;
};
