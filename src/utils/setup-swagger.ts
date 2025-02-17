import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllConfigType, configKey } from 'src/config/config.type';

const setupSwagger = (app: INestApplication): void => {
  const configService = app.get(ConfigService<AllConfigType>);
  const { version, docs, prefix, domain } = configService.getOrThrow(
    configKey.app,
    {
      infer: true,
    },
  );

  const url = `${domain}/${prefix}/${version}`;

  const config = new DocumentBuilder()
    .setTitle('Airbnb API')
    .setExternalDoc('API JSON Specification', `${url}/swagger.json`)
    .setDescription(
      'REST API for an Airbnb-like platform that enables users to list, discover, and book unique accommodations around the world.',
    )
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        description: 'Enter your JWT token',
      },
      'Token',
    )
    .addServer(url, 'Development')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/${version}/${docs}`, app, documentFactory, {
    jsonDocumentUrl: `${prefix}/${version}/swagger.json`,
  });

  // eslint-disable-next-line no-console
  console.info(`Documentation: ${url}/${docs}`);
};

export default setupSwagger;
