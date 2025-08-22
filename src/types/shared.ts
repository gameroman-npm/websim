export interface Meta {
  count?: null;
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface User<
  TUserId extends string = string,
  TUsername extends string = string
> {
  _type: "user";
  id: TUserId;
  created_at: string;
  username: TUsername;
  discord_id: string | null;
  discord_username: string | null;
  avatar_url: `https://${string}/${string}` | null;
  is_admin: boolean;
}

export interface Project<TProjectId extends string = string> {
  _type: "project";
  id: TProjectId;
  created_at: string;
  updated_at: string;
  title: string | null;
  visibility: "public";
  slug: string | null;
  created_by: User;
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
    url: `https://${string}` | null;
  } | null;
  video: { url: `https://${string}` } | null;
}

export interface ProjectRevision<
  TProjectRevisiontId extends string = string,
  TProjectId extends string = string,
  TSiteId extends string = string
> {
  _type: "project_revision";
  id: TProjectRevisiontId;
  version: number;
  created_at: string;
  visited_at: null;
  parent_id: string | null;
  parent_revision_version: number | null;
  parent_revision_project_id: string | null;
  created_by: User;
  meta: { version: string };
  project_id: TProjectId;
  updated_at: string;
  deleted_at: null;
  stats: { multiplayer_count: number };
  draft: boolean;
  site_id: TSiteId;
  chat_session_id: null;
  chat_session_run_index: null;
  current_screenshot_url: `https://${string}/${string}` | null;
}

type PromptType =
  | { type: "plaintext"; text: string }
  | { type: "manual-edit"; text: "" }
  | { type: "refactor"; text: string }
  | { type: "fix"; text: string }
  | { type: "get"; text: string }
  | { type: "tweak-edit"; text: ""; data: null };

interface SiteLoreAttachment<TAttachmentId extends string = string> {
  id: TAttachmentId;
  mediaType: string;
  filename: string;
  description: string;
  useVision: boolean;
}

type SiteLore = {
  version: 1 | number;
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

export interface Site<TSiteId extends string = string> {
  _type: "site";
  id: TSiteId;
  parent_id: string | null;
  created_at: string;
  state: "done" | "generating";
  model: string;
  lore: SiteLore | null;
  title: string | null;
  url: string | null;
  prompt: PromptType;
  owner: User;
  link_url: string;
  versioned_link_url: string;
  deleted_at: string | null;
  yapping: string | null;
}
