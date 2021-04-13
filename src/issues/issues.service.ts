import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Issue from "src/database/entity/issues.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class IssuesService {
  constructor(@InjectRepository(Issue) private issues: Repository<Issue>) {}

  create(props: DeepPartial<Issue>) {
    const issue = new Issue();
    Object.assign(issue, props);
    return this.issues.save(issue);
  }

  findIssue(_id: string) {
    return this.issues.findOneOrFail(_id);
  }

  findAll(props?: DeepPartial<Issue>) {
    return this.issues.find(props);
  }

  async updateOne(
    _id: string,
    props: Omit<DeepPartial<Issue>, "_id">
  ): Promise<Issue> {
    const issue = await this.issues.findOneOrFail(_id);
    Object.assign(issue, props);
    return await this.issues.save(issue);
  }

  async deleteOne(_id: string): Promise<Issue> {
    const issue = await this.issues.findOneOrFail(_id);
    return await this.issues.remove(issue);
  }
}
