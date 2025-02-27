import { AuthConfig } from 'src/api/v1/auth/config/auth-config.type';

import { AppConfig } from './app-config.type';

/**
 * Define types for the application configuration.
 */
export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
};

export const configKey: { [K in keyof AllConfigType]: K } = {
  app: 'app',
  auth: 'auth',
};
