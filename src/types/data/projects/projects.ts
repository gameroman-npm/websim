import type { WithIncluded } from "../../lib/utils";
import type { Project, ProjectRevision, Site } from "../../shared";
import type { Meta } from "../meta";

export type ProjectInfo<
  T extends {
    ProjectId?: string;
    ProjectRevisionId?: string;
    SiteId?: string;
    CreatedByUserId?: string;
    CreatedByUsername?: string;
  } = {}
> = {
  project: Project<T>;
  project_revision: ProjectRevision<T> | null;
  site: Site<
    T & {
      OwnerUserId: T["CreatedByUserId"];
      OwnerUsername: T["CreatedByUsername"];
    }
  > | null;
  token: null;
  cursor: string;
}

export type ProjectData = WithIncluded<ProjectInfo>;

export type ProjectsData = WithIncluded<{
  projects: {
    data: ProjectInfo[];
    meta: Meta;
  };
}>;
