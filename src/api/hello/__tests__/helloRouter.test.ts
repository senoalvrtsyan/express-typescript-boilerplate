import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { server } from '@/server';

describe('Hello API endpoint', () => {
  it('GET /hello/:username - success', async () => {
    const username: string = 'john';
    const response = await request(server.app).get(`/hello?username=${username}`);
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.message).toEqual('');
    expect(result.responseData).toEqual(`Hello ${username}`);
  });
});
