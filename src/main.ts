import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllConfigType, configKey } from './config/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get host and port from the configuration
  const configService = app.get(ConfigService<AllConfigType>);
  const { host, port } = configService.getOrThrow(configKey.app, {
    infer: true,
  });

  // Start the application
  await app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://${host}:${port}`),
  );
}

bootstrap();
