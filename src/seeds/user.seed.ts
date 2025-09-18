import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  // Verifica se já existe
  const existing = await usersService.findOneOptional('Usuário');
  if (!existing) {
    await usersService.create({
      username: 'Usuário',
      password: 'usuario123', // como o projeto é a fins de aprendizado, não vou fazer hash.
    });
    console.log('✅ Usuário criado');
  } else {
    console.log('ℹ️ Usuário já existe');
  }

  await app.close();
}
bootstrap();
