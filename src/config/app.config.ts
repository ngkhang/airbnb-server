import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

import validateConfig from 'src/utils/validate-config';

import { type AppConfig } from './app-config.type';
import { configKey } from './config.type';

const APP_ENVIRONMENT_DEFAULT = 'development';
const APP_PORT_DEFAULT = 3000;
const APP_HOST_DEFAULT = 'localhost';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  APP_HOST: string;

  @IsString()
  APP_DOMAIN: string;

  @IsString()
  APP_VERSION: string;

  @IsString()
  API_PREFIX: string;

  @IsString()
  API_DOCS: string;
}
export default registerAs<AppConfig>(configKey.app, (): AppConfig => {
  const validated = validateConfig(process.env, EnvironmentVariables);

  return {
    nodeEnv: validated.NODE_ENV ?? APP_ENVIRONMENT_DEFAULT,
    port: validated.APP_PORT ?? APP_PORT_DEFAULT,
    host: validated.APP_HOST ?? APP_HOST_DEFAULT,
    domain: validated.APP_DOMAIN ?? 'http://localhost:3001',
    version: validated.APP_VERSION ?? 'v1',
    prefix: validated.API_PREFIX ?? 'api',
    docs: validated.API_DOCS ?? 'v1',
  };
});
