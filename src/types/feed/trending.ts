import type { Site, Project, ProjectRevision } from "../shared";

interface TrendingFeedProject {
  site: Site;
  likes: number;
  views: number;
  remixes: number;
  comments: number;
  is_multiplayer: boolean;
  project: Project;
  project_revision: ProjectRevision;
  token: null;
}

export interface TrendingFeedData {
  feed: {
    data: TrendingFeedProject[];
    meta: { offset: number; limit: number };
  };
  included: [];
}
