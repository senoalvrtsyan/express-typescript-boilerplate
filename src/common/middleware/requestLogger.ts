import { randomUUID } from 'crypto';
import { IncomingMessage, ServerResponse } from 'http';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { LevelWithSilent } from 'pino';
import { pinoHttp } from 'pino-http';

enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Trace = 'trace',
  Silent = 'silent',
}

export default pinoHttp({
  genReqId: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const existingID = req.id ?? req.headers['x-request-id'];
    if (existingID) return existingID;
    const id = randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },
  customLogLevel: (_req: IncomingMessage, res: ServerResponse<IncomingMessage>, err?: Error): LevelWithSilent => {
    if (err || res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) return LogLevel.Error;
    if (res.statusCode >= StatusCodes.BAD_REQUEST) return LogLevel.Warn;
    if (res.statusCode >= StatusCodes.MULTIPLE_CHOICES) return LogLevel.Silent;
    return LogLevel.Info;
  },
  customSuccessMessage: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    if (res.statusCode === StatusCodes.NOT_FOUND) return getReasonPhrase(StatusCodes.NOT_FOUND);
    return `${req.method} completed`;
  },
  customReceivedMessage: (req) => `request received: ${req.method}`,
  customErrorMessage: (_req, res) => `request errored with status code: ${res.statusCode}`,
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
  },
});
