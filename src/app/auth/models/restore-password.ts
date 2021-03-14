export class RestorePasswordRequest {
  public token: string;
  public password: string;

  constructor(model: Partial<RestorePasswordRequest> = {}) {
    Object.assign(this, model);
  }
}
