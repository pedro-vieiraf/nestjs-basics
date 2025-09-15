import { ValidationPipe, BadRequestException } from '@nestjs/common';

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          const constraints = err.constraints
            ? Object.values(err.constraints)
            : [];
          return constraints[0];
        });
        return new BadRequestException(messages);
      },
    });
  }
}
