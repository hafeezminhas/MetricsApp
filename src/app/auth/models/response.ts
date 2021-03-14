import { User } from './user';

export class AuthResponse {
  public refreshToken: string;
  public token: string;
  public user: User;

  constructor(model: Partial<AuthResponse> = {}) {
    Object.assign(this, model);
  }
}
