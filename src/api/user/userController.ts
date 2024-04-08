import { Request, Response } from 'express';

import { userService } from '@/api/user/userService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const userController = {
  getAllUsers: async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    handleServiceResponse(serviceResponse, res);
  },

  getUserById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await userService.findById(id);
    handleServiceResponse(serviceResponse, res);
  },

  addUser: async (req: Request, res: Response) => {
    const userData = req.body;
    const serviceResponse = await userService.addUser(userData);
    handleServiceResponse(serviceResponse, res);
  },

  deleteUserById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await userService.deleteById(id);
    handleServiceResponse(serviceResponse, res);
  },
};
