import { User, UserRole } from './user';

export interface SignUpRequest {
  email: string;
  firstName: string;
  lastName: string;
  birth: string;
  role: UserRole;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
