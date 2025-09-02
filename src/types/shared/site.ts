import type { S } from "../lib/utils";
import type { User } from "./user";

export type WebsimPromptType =
  | { type: "plaintext"; text: string }
  | { type: "manual-edit"; text: "" }
  | { type: "refactor"; text: string }
  | { type: "fix"; text: string }
  | { type: "get"; text: string }
  | { type: "tweak-edit"; text: ""; data: null };

export type SiteLoreAttachment<T extends { AttachmentId?: string } = {}> = {
  id: S<T["AttachmentId"]>;
  mediaType: string;
  filename: string;
  description: string;
  useVision: boolean;
};

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

export type Site<
  T extends {
    SiteId?: string;
    ProjectId?: string;
    OwnerUserId?: string;
    OwnerUsername?: string;
  } = {},
  ProjectId extends S<T["ProjectId"]> = S<T["ProjectId"]>
> = {
  _type: "site";
  id: S<T["SiteId"]>;
  parent_id: string | null;
  created_at: string;
  state: "initial" | "generating" | "done" | "failed";
  model: string;
  lore: SiteLore | null;
  title: string | null;
  url: string | null;
  prompt: WebsimPromptType;
  owner: User<{ UserId: T["OwnerUserId"]; Username: T["OwnerUsername"] }>;
  link_url: `/p/${ProjectId}`;
  versioned_link_url: `/p/${ProjectId}/${number}`;
  deleted_at: string | null;
  yapping: string | null;
};
