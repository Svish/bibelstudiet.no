export interface ErrorResponse {
  type: string;
  status: string;
  statusCode: number;
  message: string;
  reason?: string;
}

export interface DevErrorResponse extends ErrorResponse {
  file: string;
  line: number;
  trace: string;
}

export default class ApiError extends Error {
  readonly statusCode: number;
  readonly status: string;
  readonly details: ErrorResponse;

  constructor(response: ErrorResponse) {
    super(response.message);
    this.status = response.status;
    this.statusCode = response.statusCode;
    this.details = response;
  }
}
