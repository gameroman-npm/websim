import type { Site, Project, ProjectRevision } from "../shared";

export interface TrendingFeedProject<
  T extends {
    ProjectId?: string;
    ProjectRevisionId?: string;
    SiteId?: string;
    CreatedByUserId?: string;
    CreatedByUsername?: string;
  } = {}
> {
  site: Site<
    T & {
      OwnerUserId: T["CreatedByUserId"];
      OwnerUsername: T["CreatedByUsername"];
    }
  >;
  likes: number;
  views: number;
  remixes: number;
  comments: number;
  is_multiplayer: boolean;
  project: Project<T>;
  project_revision: ProjectRevision<T>;
  token: null;
  cursor: string;
}

export interface TrendingFeedData {
  feed: {
    data: TrendingFeedProject[];
    meta: { offset: number; limit: number };
  };
  included: [];
}
