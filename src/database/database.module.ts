import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./../../ormconfig";
import Issue from "./entity/issues.entity";
import Project from "./entity/projects.entity";

@Module({
  imports: [TypeOrmModule.forRoot({ ...config, entities: [Project, Issue] })],
})
export class DatabaseModule {}
