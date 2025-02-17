/* eslint-disable no-console */
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

const validateConfig = <T extends object>(
  config: Record<string, unknown>,
  envVariableClass: ClassConstructor<T>,
): T => {
  const validatedConfig = plainToInstance(envVariableClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const { property, constraints } = errors[0];
    const errorsMessages = errors;

    if (constraints) {
      const detailError: string = `
      ---------------------
      Error in ${property} variable
      ${Object.values(constraints)
        .map(
          (value, index) =>
            `${index !== 0 ? '      ' : ''}- ${value.replace(property, '').trim()}\n`,
        )
        .join('')}      ---------------------`;

      console.error('🚀 ~ errorsMessages:', detailError);
      throw new Error(detailError);
    }
    console.error('🚀 ~ errorsMessages:', errorsMessages);
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

export default validateConfig;
