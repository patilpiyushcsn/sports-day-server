import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

interface CustomResponse {
  statusCode: number;
  success: boolean;
  body: any;
}

export abstract class BaseApiController {
  successResponse<T>(data: T, res: Response) {
    const successObject: CustomResponse = {
      statusCode: HttpStatus.OK,
      success: true,
      body: data,
    };

    return res.status(HttpStatus.OK).send(successObject);
  }

  serverErrorResponse(msg: string, res: Response) {
    const errorObject: CustomResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      body: msg,
    };

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorObject);
  }
}
