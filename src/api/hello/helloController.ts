import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const helloController = {
  helloUser: (req: Request, res: Response) => {
    const username = req.query.username;
    const serviceResponse = new ServiceResponse<string>(
      ResponseStatus.Success,
      '',
      `Hello ${username}`,
      StatusCodes.OK
    );
    handleServiceResponse(serviceResponse, res);
  },
};
