import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use("/public", express.static(process.cwd() + "/public"));
    await app.listen(3000);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
