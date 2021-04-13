import { OmitType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsUUID, MaxLength } from "class-validator";

export class IssueUpdateDto {
  @IsNotEmpty()
  @IsUUID()
  _id: string;

  @MaxLength(100)
  issue_title?: string;

  issue_text?: string;

  @MaxLength(100)
  created_by?: string;

  @MaxLength(100)
  assigned_to?: string;

  @MaxLength(50)
  status_text?: string;

  @IsBoolean()
  open?: boolean;
}

export class ProjectsDto extends OmitType(IssueUpdateDto, [
  "_id",
  "open",
] as const) {
  @IsNotEmpty()
  @MaxLength(100)
  issue_title: string;

  @IsNotEmpty()
  issue_text: string;

  @IsNotEmpty()
  @MaxLength(100)
  created_by: string;

  @MaxLength(100)
  assigned_to?: string;

  @MaxLength(50)
  status_text?: string;
}
