import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ProjectsModule } from "./projects/projects.module";
import { DatabaseModule } from "./database/database.module";
import { IssuesModule } from "./issues/issues.module";

@Module({
  imports: [ProjectsModule, DatabaseModule, IssuesModule],
  controllers: [AppController],
})
export class AppModule {}
