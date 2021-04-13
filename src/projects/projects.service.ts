import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Project from "../database/entity/projects.entity";
import {
  Brackets,
  DeepPartial,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from "typeorm";

interface FindRelationWithFilter<T = Record<string, never>> {
  /**
   * Singular form of the relation or the joining table
   *
   * e.g `users` -> `user`
   */
  relation: string;
  where?:
    | Brackets
    | string
    | ((qb: SelectQueryBuilder<T>) => string)
    | ObjectLiteral
    | ObjectLiteral[];
  parameters?: ObjectLiteral;
  filters: {
    [key: string]: any;
  };
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>
  ) {}

  async findRelationWithFilter({
    filters,
    relation,
    where,
  }: FindRelationWithFilter<Project>) {
    const queryConditions = Object.entries(filters)
      .map(([key, value]) => `${relation}.${key} = '${value}'`)
      .join(" AND ");
    const project = await this.projectRepo
      .createQueryBuilder("projects")
      .leftJoinAndSelect(`projects.${relation}s`, relation, queryConditions)
      .where(where)
      .getOne();
    return project;
  }

  findAllProjects(
    conditions?: DeepPartial<Project>,
    options?: FindManyOptions<Project>
  ) {
    return this.projectRepo.find({ ...conditions, ...options });
  }

  findProject(
    project: FindConditions<Project>,
    options?: FindOneOptions<Project>
  ) {
    return this.projectRepo.findOne(project, options);
  }

  createProject(name: string) {
    const project = new Project();
    project.name = name;
    return this.projectRepo.save(project);
  }
}
