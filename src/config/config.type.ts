import { AppConfig } from './app-config.type';

/**
 * Define types for the application configuration.
 */
export type AllConfigType = {
  app: AppConfig;
};

export const configKey: { [K in keyof AllConfigType]: K } = {
  app: 'app',
};
