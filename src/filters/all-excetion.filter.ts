import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>(); 
      const request = ctx.getRequest<Request>(); 
      let status =
        exception?.status ||
        exception?.response?.status ||
        HttpStatus.INTERNAL_SERVER_ERROR; 
      let message =
        exception?.response?.message ||
        exception?.message ||
        'Internal server error';
  
      if (exception?.code === 11000) {
        status = HttpStatus.CONFLICT;
        message = 'Valor duplicado, ya existe un registro con ese valor';
      }
  
      if (exception?.status === 401) {
        status = HttpStatus.UNAUTHORIZED;
        message = 'Usuario no autorizado.';
      }
  
      // Return the custom response for all exceptions
      response.status(status).json({
        statusCode: status,
        typeError: exception?.name,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: Array.isArray(message) ? message[0] : message,
      });
    }
  }
  