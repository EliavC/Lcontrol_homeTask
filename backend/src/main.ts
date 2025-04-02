import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    cors: true, 
  };
  const app = await NestFactory.create(AppModule, appOptions);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
bootstrap();
