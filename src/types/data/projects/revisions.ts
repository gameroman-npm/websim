import type { ProjectRevision, Site, Project } from "../../shared";

export type ProjectsRevisionsData = {
  revisions: {
    data: {
      cursor: string;
      project_revision: ProjectRevision;
      site: Site;
    }[];
    meta: {
      has_next_page: boolean;
      has_previous_page: boolean;
      start_cursor: string;
      end_cursor: string;
    };
  };
  project: Project;
  token: null;
};
