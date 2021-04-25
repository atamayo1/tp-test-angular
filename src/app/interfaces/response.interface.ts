export interface AppHttpResponse<T> {
  body: T;
  hasErrors: boolean;
  errors: Error[];
  inscriptionErrorMessage: string;
}

interface Error {
  error: string;
  errorCode: string;
  errorDescription: string;
}

export class TrackHttpError implements AppHttpResponse<any> {
  body: any;
  hasErrors: boolean;
  errors: Error[];
  inscriptionErrorMessage: string;
}
