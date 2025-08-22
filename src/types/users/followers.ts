import type { Meta } from "../shared";
import type { Follow } from "./shared";

export interface FollowersData {
  followers: {
    data: { follow: Follow; cursor: string }[];
    meta: Meta;
  };
}
