import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@vendia/serverless-express";
import { AppModule } from "./app.module";

type LambdaCallback = (error?: Error | null, result?: unknown) => void;
type LambdaContext = Record<string, unknown>;
type LambdaHandler = (
  event: unknown,
  context: LambdaContext,
  callback: LambdaCallback
) => unknown;

let server: LambdaHandler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: "*",
    credentials: true
  });
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: LambdaHandler = async (
  event: unknown,
  context: LambdaContext,
  callback: LambdaCallback
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
