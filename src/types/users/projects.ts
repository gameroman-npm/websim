import type { Meta, Project, ProjectRevision, Site } from "../shared";

export interface ProjectInfo<
  T extends {
    ProjectId?: string;
    ProjectRevisionId?: string;
    SiteId?: string;
    CreatedByUserId?: string;
    CreatedByUsername?: string;
  } = {}
> {
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

export interface UsersProjectsData {
  projects: {
    data: ProjectInfo[];
    meta: Meta;
  };
  included: [];
}
