import type { S } from "../lib/utils";
import type { User } from "./user";

export type ProjectRevision<
  T extends {
    ProjectId?: string;
    ProjectRevisionId?: string;
    SiteId?: string;
    CreatedByUserId?: string;
    CreatedByUsername?: string;
  } = {}
> = {
  _type: "project_revision";
  id: S<T["ProjectRevisionId"]>;
  version: number;
  created_at: string;
  visited_at: null;
  parent_id: string | null;
  parent_revision_version: number | null;
  parent_revision_project_id: string | null;
  created_by: User<{
    UserId: S<T["CreatedByUserId"]>;
    Username: S<T["CreatedByUsername"]>;
  }>;
  meta: { version: string };
  project_id: S<T["ProjectId"]>;
  updated_at: string;
  deleted_at: null;
  stats: { multiplayer_count: number };
  draft: boolean;
  site_id: S<T["SiteId"]>;
  chat_session_id: null;
  chat_session_run_index: null;
  current_screenshot_url: `https://${string}/${string}` | null;
};
