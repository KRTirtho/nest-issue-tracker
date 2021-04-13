import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Issue from "./issues.entity";

@Entity("projects")
export default class Project {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column("varchar", { length: 50 })
  name: string;

  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[];
}
