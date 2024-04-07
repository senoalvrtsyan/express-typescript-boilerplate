import express, { Router } from 'express';

import { helloController } from '@/api/hello/helloController';

export const helloRouter: Router = (() => {
  const router = express.Router();

  router.get('/', helloController.helloUser);

  return router;
})();
