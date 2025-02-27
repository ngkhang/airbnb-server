import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';

import { configKey } from 'src/config/config.type';
import validateConfig from 'src/utils/validate-config';

import { AuthConfig } from './auth-config.type';

class EnvironmentVariables {
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  JWT_REFRESH_EXPIRES: string;
}
export default registerAs<AuthConfig>(configKey.auth, (): AuthConfig => {
  const validated = validateConfig(process.env, EnvironmentVariables);

  return {
    jwtSecret: validated.JWT_SECRET,
    jwtExpires: validated.JWT_EXPIRES,
    jwtRefreshSecret: validated.JWT_REFRESH_SECRET,
    jwtRefreshExpires: validated.JWT_REFRESH_EXPIRES,
  };
});
