import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Project from "../database/entity/projects.entity";
import { IssuesModule } from "src/issues/issues.module";

@Module({
  imports: [TypeOrmModule.forFeature([Project]), IssuesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
