import type { Meta, User } from "../shared";

type S<T extends string | undefined> = T extends string ? T : string;

type CommentContent =
  | { type: "text"; text: string; italic?: boolean }
  | { type: "break" }
  | { type: "user"; username: string }
  | {
      type: "link";
      url: `https://${string}/${string}`;
      children: [CommentContent];
    }
  | { type: "image"; url: `https://${string}/${string}`; alt: string };

export interface WebsimComment<
  T extends {
    CommentId?: string;
    ProjectId?: string;
    AuthorUserId?: string;
    AuthorUsername?: string;
  } = {}
> {
  id: S<T["CommentId"]>;
  project_id: S<T["ProjectId"]>;
  content: {
    type: "document";
    children: { type: "paragraph"; children: CommentContent[] }[];
  };
  raw_content: string;
  created_at: string;
  deleted: boolean;
  author: User<{
    UserId: S<T["AuthorUserId"]>;
    Username: S<T["AuthorUsername"]>;
  }>;
  reply_count: number;
  parent_comment_id: null;
  reply_to_data: null;
  pinned: boolean;
  pinned_by: User | null;
  reactions: unknown[];
  source: "comments";
  type: "text";
  card_data: { type: "tip_comment"; credits_spent: number };
  project_data: null;
}

export interface ProjectsCommentsData {
  comments: {
    data: { comment: WebsimComment; cursor: string }[];
    meta: Meta;
  };
}
