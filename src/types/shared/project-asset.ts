import type { S, N, Expand } from "../lib/utils";
import type { User } from "./user";

export type ProjectAsset<
  T extends {
    AssetId?: string;
    ProjectId?: string;
    ProjectVersion?: number;
    CreatedByUserId?: string;
    CreatedByUsername?: string;
  } = {}
> = Expand<
  {
    _type: "project_asset";
    id: S<T["AssetId"]>;
    project_id: S<T["ProjectId"]>;
    path: string;
    state: "done";
    created_at: string;
    created_by: User<{
      UserId: S<T["CreatedByUserId"]>;
      Username: S<T["CreatedByUsername"]>;
    }>;
    updated_at: string;
    bucket_key: string;

    project_version: N<T["ProjectVersion"]>;

    size: number;
    is_liked: boolean;
  } & (
    | {
        meta: { version: "1"; in_generation: true };
        content_type: "text/javascript" | "text/css" | "text/html";
      }
    | {
        meta: {
          version: "1";
          description: string;
          title: string;
          transparent?: boolean;
          aspect?: "square";
          in_generation?: false;
          in_generation_asset?: true;
        };
        content_type: "image/png";
      }
    | {
        meta: { version: "1"; duration: number };
        content_type: "audio/mpeg";
      }
  )
>;
