export enum UserRole {
  INSTRUCTOR = 'instructor',
  STUDENT = 'student',
}

export type UserDto = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  birth: string;
  role: UserRole;
  imgUrl: string;
};
