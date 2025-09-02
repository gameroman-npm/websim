import type { S } from "../lib/utils";

export type User<T extends { UserId?: string; Username?: string } = {}> = {
  _type: "user";
  id: S<T["UserId"]>;
  created_at: string;
  username: S<T["Username"]>;
  discord_id: string | null;
  discord_username: string | null;
  avatar_url: `https://${string}/${string}` | null;
  is_admin: boolean;
};
