import { PlatformServerlessHttp } from '@tsed/platform-serverless-http';
import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './app/Server';

const platform = PlatformServerlessHttp.bootstrap(Server, {
  adapter: PlatformExpress,
});

export const handler = platform.handler();
