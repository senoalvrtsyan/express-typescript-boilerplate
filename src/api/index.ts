import express from 'express';

import { helloRouter } from './hello/helloRouter';
import { userRouter } from './user/userRouter';

export default function initializeRoutes(app: express.Application) {
  app.use('/hello', helloRouter);
  app.use('/users', userRouter);
}
