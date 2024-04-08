import express, { Router } from 'express';

import { userController } from '@/api/user/userController';
import { AddUserSchema, GetOrDeleteUserSchema } from '@/api/user/userModel';
import { validateRequest } from '@/common/utils/httpHandlers';

export const userRouter: Router = (() => {
  const router = express.Router();

  router.get('/', userController.getAllUsers);

  router.get('/:id', validateRequest(GetOrDeleteUserSchema), userController.getUserById);

  router.post('/', validateRequest(AddUserSchema), userController.addUser);

  router.delete('/:id', validateRequest(GetOrDeleteUserSchema), userController.deleteUserById);

  return router;
})();
