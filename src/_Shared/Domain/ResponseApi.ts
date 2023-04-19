export class ResponseApi<T> {
  private status: string;
  private httpStatus: number;
  private message?: string;
  private content: T;

  constructor() {
    this.status = "SUCCESS";
    this.httpStatus = 200;
    this.content = null;
  }

  getHttpStatus() {
    return this.httpStatus;
  }

  setContent(content: T) {
    this.content = content;
  }

  setError(ex, httpStatus = 500) {
    this.status = "ERROR";
    this.httpStatus = httpStatus;
    this.message = ex?.message ?? ex ?? "";
    this.content = null;
  }
}
