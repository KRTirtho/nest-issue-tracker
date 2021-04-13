import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Issue from "src/database/entity/issues.entity";
import { IssuesService } from "./issues.service";

@Module({
  imports: [TypeOrmModule.forFeature([Issue])],
  providers: [IssuesService],
  exports: [IssuesService],
})
export class IssuesModule {}
