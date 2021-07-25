/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse {
  status: number;
  body: any;
}

export interface HttpRequest {
  body?: any;
}
