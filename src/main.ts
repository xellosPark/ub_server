import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = serverConfig.port;

  //await app.listen(4050);
  await app.listen(port);
  Logger.log(`Application running on port ${port}` )
}
bootstrap();
