import express, { Application } from 'express';
import { pino } from 'pino';
import pretty from 'pino-pretty';

import initializeRoutes from '@/api';
import { env } from '@/common/config';
import { initializeErrorHandler, initializeMiddlewares } from '@/common/middleware';

class ExpressServer {
  public app: Application;
  public static logger = pino(pretty({ colorize: true }));

  constructor() {
    this.app = express();
    initializeMiddlewares(this.app);
    initializeRoutes(this.app);
    initializeErrorHandler(this.app);
  }

  public start() {
    return this.app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env;
      ExpressServer.logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });
  }
}

export const server = new ExpressServer();
export const logger = ExpressServer.logger;
