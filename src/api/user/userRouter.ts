import express, { Router } from 'express';

import { userController } from '@/api/user/userController';
import { GetUserSchema } from '@/api/user/userModel';
import { validateRequest } from '@/common/utils/httpHandlers';

export const userRouter: Router = (() => {
  const router = express.Router();

  router.get('/', userController.getAllUsers);

  router.get('/:id', validateRequest(GetUserSchema), userController.getUserById);

  return router;
})();
