export class ResponseApi<T> {
  status: string;
  httpStatus: number;
  message?: string;
  content: T;

  constructor() {
    this.status = "SUCCESS";
    this.httpStatus = 200;
    this.content = null;
  }

  setError(ex, httpStatus = 500) {
    this.status = "ERROR";
    this.httpStatus = httpStatus;
    this.message = ex.message ? ex.message : "";
    this.content = null;
  }
}
