import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, UnauthorizedException } from '@nestjs/common';
import { CoreApiResponse } from '@core/api/CoreApiResponse';
import { Code } from '@core/code/Code';
import { Exception } from '@core/exception/Exception';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { CommonDITokens } from '@core/di/CommonDITokens';

@Catch()
export class HttpExceptionHandler implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_SERVER_ERROR.statusCode,
      Code.INTERNAL_SERVER_ERROR.message,
    );

    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    if (ApiServerConfig.LOG_ENABLE) {
      const message: string = `[${CommonDITokens.HttpTraffic.description}] {${request.method} ${request.path}} ${errorResponse.message}`;
      Logger.error(message);
      console.log(errorResponse);
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private handleNestError(error: Error, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(error.getStatus(), error.message, null);
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(Code.UNAUTHORIZED_ERROR.statusCode, Code.UNAUTHORIZED_ERROR.message, null);
    }

    return errorResponse;
  }

  private handleCoreException(error: Error, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (ApiServerConfig.LOG_ENABLE) {
      console.log(error);
    }

    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(error.statusCode, error.message, error.data);
    }

    return errorResponse;
  }
}
