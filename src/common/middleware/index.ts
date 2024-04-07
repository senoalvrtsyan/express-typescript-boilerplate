import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from '@/common/config';
import errorHandler from '@/common/middleware/errorHandler';
import requestLogger from '@/common/middleware/requestLogger';

export const initializeMiddlewares = (app: express.Application) => {
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);
};

export const initializeErrorHandler = (app: express.Application) => {
  app.use(errorHandler);
};
