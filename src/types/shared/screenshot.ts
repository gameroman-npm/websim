import type { S, N } from "../lib/utils";

export type Screenshot<
  T extends {
    ScreenshotId?: string;
    ProjectId?: string;
    ProjectVersion?: number;
  } = {}
> = {
  _type: "screenshot";
  id: S<T["ScreenshotId"]>;
  project_id: S<T["ProjectId"]>;
  project_version: N<T["ProjectVersion"]>;
  created_at: string;
  state: "done";
  height: number;
  width: number;
  content_type: "image/webp";
  moderation_state: "ok";
  source: "user" | "server";
  url: `https://${string}/${string}`;
}
