export class AuthCredentials {
  public username: string;
  public password: string;

  constructor(model: Partial<AuthCredentials> = {}) {
    Object.assign(this, model);
  }
}
