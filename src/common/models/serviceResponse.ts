export enum ResponseStatus {
  Success,
  Failed,
}

export class ServiceResponse<T = null> {
  success: boolean;
  message: string;
  responseData: T;
  statusCode: number;

  constructor(status: ResponseStatus, message: string, responseData: T, statusCode: number) {
    this.success = status === ResponseStatus.Success;
    this.message = message;
    this.responseData = responseData;
    this.statusCode = statusCode;
  }
}
