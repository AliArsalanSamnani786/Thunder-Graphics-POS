import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { IncomingMessage, ServerResponse } from "node:http";
import { AppModule } from "./app.module";

type ExpressHandler = (request: IncomingMessage, response: ServerResponse) => void;

let server: ExpressHandler | undefined;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  app.enableCors({
    origin: "*",
    credentials: true
  });
  await app.init();
  return app.getHttpAdapter().getInstance() as ExpressHandler;
}

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  server = server ?? (await bootstrap());
  return server(request, response);
}
