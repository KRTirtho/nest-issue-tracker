import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Project from "./projects.entity";

@Entity("issues")
export default class Issue {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ type: "varchar", length: 100 })
  issue_title: string;

  @Column({ type: "varchar", length: 100 })
  created_by: string;

  @Column({ type: "text" })
  issue_text: string;

  @Column({ type: "varchar", length: 100, default: "" })
  assigned_to: string;

  @Column({ default: true })
  open: boolean;

  @Column({ type: "varchar", length: 50, default: "" })
  status_text: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project;
}
