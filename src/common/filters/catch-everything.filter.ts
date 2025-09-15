import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[];

    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as Record<string, unknown>;
        if (typeof r.message === 'string' || Array.isArray(r.message)) {
          message = r.message;
        } else {
          message = 'Unexpected error';
        }
      } else {
        message = 'Unexpected error';
      }
    } else {
      message = 'Internal server error';
    }

    console.error({
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      body: JSON.stringify(request.body),
      headers: request.headers,
      exception,
    });

    const responseBody = {
      message,
      statusCode: status,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
