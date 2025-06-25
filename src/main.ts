import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', // Your React App
      // Add other origins if needed, e.g., your deployed app's URL
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // It's also good practice to use global pipes for validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000); // API runs on port 8000
  console.log(`🚀 API is running on: http://localhost:8000`);
}
bootstrap();