import { get } from "./api";

import type {
  ProjectsData,
  FollowersData,
  FollowingData,
  TrendingFeedData,
  CommentsData,
  StatsData,
} from "./types";

const users = {
  /**
   * https://api.websim.com/api/v1/users/${username}/projects
   */
  getProjects: async (
    username: string,
    params?: {
      posted?: boolean;
      first?: number;
    }
  ) => {
    const path = `/users/${username}/projects`;
    return get<ProjectsData>({ path, params });
  },
  /**
   * https://api.websim.com/api/v1/users/${username}/followers
   */
  getFollowers: async (username: string, params?: {}) => {
    const path = `/users/${username}/followers`;
    return get<FollowersData>({ path, params });
  },
  /**
   * https://api.websim.com/api/v1/users/${username}/following
   */
  getFollowing: async (username: string, params?: {}) => {
    const path = `/users/${username}/following`;
    return get<FollowingData>({ path, params });
  },
} as const;

const feed = {
  /**
   * https://api.websim.com/api/v1/feed/trending
   */
  getTrending: async (params?: {
    limit?: number;
    offset?: number;
    range?: "all";
  }) => {
    const path = `/feed/trending`;
    return get<TrendingFeedData>({ path, params });
  },
} as const;

const projects = {
  /**
   * https://api.websim.com/api/v1/projects/${projectId}/comments
   */
  getComments: async (
    projectId: string,
    params?: {
      sort_by?: "best";
      only_tips?: boolean;
      first?: number;
    }
  ) => {
    const path = `/projects/${projectId}/comments`;
    return get<CommentsData>({ path, params });
  },
  /**
   * https://api.websim.com/api/v1/projects/${projectId}/stats
   */
  getStats: async (projectId: string, params?: {}) => {
    const path = `/projects/${projectId}/stats`;
    return get<StatsData>({ path, params });
  },
} as const;

export const api = { users, feed, projects } as const;
