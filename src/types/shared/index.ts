export interface Meta {
  count?: null;
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

type Default<T extends D | undefined, D> = T extends D ? T : D;
type S<T extends string | undefined> = Default<T, string>;

export interface User<T extends { UserId?: string; Username?: string } = {}> {
  _type: "user";
  id: S<T["UserId"]>;
  created_at: string;
  username: S<T["Username"]>;
  discord_id: string | null;
  discord_username: string | null;
  avatar_url: `https://${string}/${string}` | null;
  is_admin: boolean;
}

export interface Project<
  T extends {
    ProjectId?: string;
    CreatedByUserId?: string;
    CreatedByUsername?: string;
  } = {}
> {
  _type: "project";
  id: S<T["ProjectId"]>;
  created_at: string;
  updated_at: string;
  title: string | null;
  visibility: "public";
  slug: string | null;
  created_by: User<{
    UserId: S<T["CreatedByUserId"]>;
    Username: S<T["CreatedByUsername"]>;
  }>;
  current_version: number | null;
  last_posted_version: number | null;
  parent_id: string | null;
  parent_version: number | null;
  deleted_at: null;
  posted: boolean;
  stats: { views: number; likes: number; comments: number };
  auto_set_current: boolean;
  description: string | null;
  comments_mode: "open" | "closed";
  enable_chat: boolean;
  from_template: boolean | null;
  domains: [{ name: string }] | { name: string }[];
  thumbnail: {
    moderation_state: "ok" | "bad";
    url: `https://${string}/${string}` | null;
  } | null;
  video: { url: `https://${string}/${string}` } | null;
}

export interface ProjectRevision<
  T extends {
    ProjectId?: string;
    ProjectRevisionId?: string;
    SiteId?: string;
    CreatedByUserId?: string;
    CreatedByUsername?: string;
  } = {}
> {
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
}

export type PromptType =
  | { type: "plaintext"; text: string }
  | { type: "manual-edit"; text: "" }
  | { type: "refactor"; text: string }
  | { type: "fix"; text: string }
  | { type: "get"; text: string }
  | { type: "tweak-edit"; text: ""; data: null };

export interface SiteLoreAttachment<T extends { AttachmentId?: string } = {}> {
  id: S<T["AttachmentId"]>;
  mediaType: string;
  filename: string;
  description: string;
  useVision: boolean;
}

export type SiteLore = {
  version: 1;
  attachments: SiteLoreAttachment[];
  enableApi?: boolean;
  enableMobilePrompt?: boolean;
  enableDB?: boolean;
  enableMultiplayer_v2?: boolean;
  enableDB_v2_1?: boolean;
  enableLLM2?: boolean;
  enableTweaks?: boolean;
  enableComments?: boolean;
};

export interface Site<
  T extends {
    SiteId?: string;
    ProjectId?: string;
    OwnerUserId?: string;
    OwnerUsername?: string;
  } = {},
  ProjectId extends S<T["ProjectId"]> = S<T["ProjectId"]>
> {
  _type: "site";
  id: S<T["SiteId"]>;
  parent_id: string | null;
  created_at: string;
  state: "initial" | "generating" | "done" | "failed";
  model: string;
  lore: SiteLore | null;
  title: string | null;
  url: string | null;
  prompt: PromptType;
  owner: User<{ UserId: T["OwnerUserId"]; Username: T["OwnerUsername"] }>;
  link_url: `/p/${ProjectId}`;
  versioned_link_url: `/p/${ProjectId}/${number}`;
  deleted_at: string | null;
  yapping: string | null;
}
