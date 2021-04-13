import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import Issue from "src/database/entity/issues.entity";
import { IssuesService } from "src/issues/issues.service";
import Project from "../database/entity/projects.entity";
import { IssueUpdateDto, ProjectsDto } from "./projects.dto";
import { ProjectsService } from "./projects.service";

type ProjectQueries = Omit<Issue, "project" | "open"> & {
  open?: string | boolean;
};

@Controller("/api/issues/")
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly issueService: IssuesService
  ) {}

  @Get()
  async getAllProject(): Promise<Project[]> {
    return this.projectsService.findAllProjects();
  }

  @Get(":project")
  async getProjectIssues(
    @Param("project") name: string,
    @Query() query: ProjectQueries
  ) {
    try {
      if (Object.entries(query).length !== 0) {
        const { open } = query;
        if (open !== undefined) {
          query.open = open === "true";
        }
        const project = await this.projectsService.findRelationWithFilter({
          filters: query,
          relation: "issue",
          where: { name },
        });
        return project.issues;
      }
      const project = await this.projectsService.findProject(
        { name },
        { relations: ["issues"] }
      );
      return project && project.issues ? project.issues : [];
    } catch (error) {
      console.error("[GET failed for Project]: ", error);
      return { error: error.message };
    }
  }

  @Post(":project")
  @UsePipes(new ValidationPipe())
  async postIssues(@Param("project") name: string, @Body() issue: ProjectsDto) {
    try {
      if (!(issue.issue_title && issue.issue_text && issue.created_by)) {
        return { error: "required field(s) missing" };
      }
      const project = await this.projectsService.findProject({ name });
      if (!project) {
        const newProject = await this.projectsService.createProject(name);
        const newIssue = await this.issueService.create({
          ...issue,
          project: newProject,
        });
        return { ...newIssue, project: undefined };
      }
      const newIssue = await this.issueService.create({ ...issue, project });
      return newIssue;
    } catch (error) {
      console.error("[POST failed for Project]: ", error);
    }
  }

  @Put(":project")
  @UsePipes(new ValidationPipe())
  async updateIssues(@Body() body: IssueUpdateDto) {
    const { _id, ...fields } = body;
    try {
      if (!_id) {
        return { error: "missing _id" };
      } else if (Object.entries(fields).length === 0) {
        return { error: "no update field(s) sent", _id };
      }
      await this.issueService.updateOne(_id, fields);
      return { result: "successfully updated", _id };
    } catch (error) {
      console.error("[PUT failed for Project]: ", error);
      return { error: "could not update", _id };
    }
  }

  @Delete(":project")
  async deleteIssue(@Body("_id") _id: string) {
    try {
      if (!_id) {
        return { error: "missing _id" };
      }
      await this.issueService.deleteOne(_id);
      return { result: "successfully deleted", _id };
    } catch (error) {
      console.error("[DELETE failed for Project]: ", error);
      return { error: "could not delete", _id };
    }
  }
}
