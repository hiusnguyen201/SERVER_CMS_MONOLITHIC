import { Code } from '@core/code/Code';
import { Nullable } from '@core/type/CommonType';

export type CreateApiResponse<TData> = {
  statusCode: number;
  message: string;
  data?: TData;
};

export class CoreApiResponse<TData> {
  public readonly statusCode: number;

  public readonly message: string;

  public readonly timestamp: number;

  public readonly data: Nullable<TData>;

  private constructor(payload: CreateApiResponse<TData>) {
    this.statusCode = payload.statusCode;
    this.message = payload.message;
    this.timestamp = Date.now();
    this.data = payload.data || null;
  }

  public static success<TData>(data?: TData, message?: string): CoreApiResponse<TData> {
    const resultStatusCode: number = Code.SUCCESS.statusCode;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new CoreApiResponse({
      statusCode: resultStatusCode,
      message: resultMessage,
      data,
    });
  }

  public static error<TData>(statusCode?: number, message?: string, data?: TData): CoreApiResponse<TData> {
    const resultStatusCode: number = statusCode || Code.INTERNAL_SERVER_ERROR.statusCode;
    const resultMessage: string = message || Code.INTERNAL_SERVER_ERROR.message;

    return new CoreApiResponse({
      statusCode: resultStatusCode,
      message: resultMessage,
      data,
    });
  }
}
