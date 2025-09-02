import type { WithIncluded } from "../../lib/utils";
import type { Project, ProjectRevision, Site } from "../../shared";

export type FeedTrendingProject<
  T extends {
    ProjectId?: string;
    ProjectRevisionId?: string;
    SiteId?: string;
    CreatedByUserId?: string;
    CreatedByUsername?: string;
  } = {}
> = {
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
};

export type FeedTrendingData = WithIncluded<{
  feed: {
    data: FeedTrendingProject[];
    meta: { offset: number; limit: number };
  };
}>;
