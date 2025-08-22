import type { Meta, Project, ProjectRevision, Site } from "../shared";

export interface ProjectInfo {
  project: Project;
  project_revision: ProjectRevision | null;
  site: Site | null;
  token: null;
  cursor: string;
}

export interface ProjectsData {
  projects: {
    data: ProjectInfo[];
    meta: Meta;
  };
  included: [];
}
