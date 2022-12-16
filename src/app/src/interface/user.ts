export enum UserRole {
  INSTRUCTOR = 'instructor',
  STUDENT = 'student',
  TEACHER_ASSISTANT = 'ta',
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  birth: string;
  role: UserRole;
}
