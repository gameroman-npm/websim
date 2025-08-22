import type { Meta } from "../shared";
import type { Follow } from "./shared";

export interface FollowingData {
  following: {
    data: { follow: Follow; cursor: string }[];
    meta: Meta;
  };
}
