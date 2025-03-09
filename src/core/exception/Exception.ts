import { CodeDescription } from '@core/code/Code';
import { Optional } from '@core/type/CommonType';

export type CreateExceptionPayload<TData> = {
  code: CodeDescription;
  overrideMessage?: string;
  data?: TData;
};

export class Exception<TData> extends Error {
  public readonly statusCode: number;

  public readonly data: Optional<TData>;

  private constructor(codeDescription: CodeDescription, overrideMessage?: string, data?: TData) {
    super();
    this.statusCode = codeDescription.statusCode;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;
    Error.captureStackTrace(this, this.constructor);
  }

  public static new<TData>(payload: CreateExceptionPayload<TData>): Exception<TData> {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }
}
