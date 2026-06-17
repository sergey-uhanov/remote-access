import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {WsAdapter} from "@nestjs/platform-ws";
import {getNetworkIp} from "./getIp";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;


  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(port, '0.0.0.0');

  const ip = getNetworkIp();
  console.log(`🚀 Server is running on:`);
  console.log(`   ➜  Local:   http://localhost:${port}/`);
  if (ip) {
    console.log(`   ➜  Network: http://${ip}:${port}/`);
  }
}
bootstrap();
