import { get } from "./api";

import type {
  UsersProjectsData,
  FollowersData,
  FollowingData,
  TrendingFeedData,
  ProjectsCommentsData,
  ProjectsStatsData,
} from "./types";

const feed = {
  /**
   * https://api.websim.com/api/v1/feed/trending
   */
  getTrending: async (params?: {
    limit?: number;
    offset?: number;
    range?: "day" | "month" | "week" | "all";
    feed?: "hot" | "new" | "top" | "viral" | "recommended";
  }) => {
    const path = `/feed/trending`;
    return get<TrendingFeedData>({ path, params });
  },

  /**
   * https://api.websim.com/api/v1/feed/posts
   */
  getPosts: async (params?: {
    limit?: number;
    offset?: number;
    sort?: "for_you" | "following" | "latest";
  }) => {
    const path = `/feed/posts`;
    return get({ path, params });
  },

  /**
   * https://api.websim.com/api/v1/feed/search/${sort}/${search}
   */
  search: async (
    sort: "best" | "newest" | "best_template",
    search: string,
    params?: {
      limit?: number;
      offset?: number;
      range?: "day" | "month" | "week" | "all";
    }
  ) => {
    const path = `/feed/search/${sort}/${encodeURIComponent(search)}`;
    return get({ path, params });
  },
} as const;

const project = (projectId: string) => {
  return {
    /**
     * https://api.websim.com/api/v1/projects/${projectId}
     */
    getProject: async (params?: {}) => {
      const path = `/projects/${projectId}`;
      return get({ path, params });
    },

    /**
     * https://api.websim.com/api/v1/projects/${projectId}/comments
     */
    getComments: async (params?: {
      first?: number;
      sort_by?: "best" | "created_at";
      sort_order?: "desc" | "asc";
      only_tips?: boolean;
    }) => {
      const path = `/projects/${projectId}/comments`;
      return get<ProjectsCommentsData>({ path, params });
    },

    comment: (commentId: string) => ({
      /**
       * https://api.websim.com/api/v1/projects/${projectId}/comments/${commentId}/replies
       */
      getReplies: async (params?: {
        first?: number;
        sort_by?: "best" | "created_at";
      }) => {
        const path = `/projects/${projectId}/comments/${commentId}/replies`;
        return get({ path, params });
      },
    }),

    /**
     * https://api.websim.com/api/v1/projects/${projectId}/stats
     */
    getStats: async (params?: {}) => {
      const path = `/projects/${projectId}/stats`;
      return get<ProjectsStatsData>({ path, params });
    },

    /**
     * https://api.websim.com/api/v1/projects/${projectId}/revisions
     */
    getRevisions: async (params?: { first?: number }) => {
      const path = `/projects/${projectId}/revisions`;
      return get({ path, params });
    },

    revision: (version: number) => ({
      /**
       * https://api.websim.com/api/v1/projects/${projectId}/revisions/${version}
       */
      getRevision: async (params?: {}) => {
        const path = `/projects/${projectId}/revisions/${version}`;
        return get({ path, params });
      },

      /**
       * https://api.websim.com/api/v1/projects/${projectId}/revisions/${version}/assets
       */
      getAssets: async (params?: {}) => {
        const path = `/projects/${projectId}/revisions/${version}/assets`;
        return get({ path, params });
      },
    }),
  } as const;
};

const projects = {
  /**
   * https://api.websim.com/api/v1/projects
   */
  listPublicProjects: async (params?: {
    first?: number;
    query?: string;
    sort_by?: "updated_at" | "created_at";
    posted?: boolean;
  }) => {
    const path = `/projects`;
    return get({ path, params });
  },

  project,
  byId: project,
} as const;

const user = (
  user:
    | { username: string; userId?: undefined }
    | { userId: string; username?: undefined }
) => {
  const userId = user.username ?? user.userId;

  return {
    /**
     * https://api.websim.com/api/v1/users/${userId}
     */
    getUser: async (params?: { posted?: boolean; first?: number }) => {
      const path = `/users/${userId}`;
      return get({ path, params });
    },

    /**
     * https://api.websim.com/api/v1/users/${userId}/projects
     */
    getProjects: async (params?: { posted?: boolean; first?: number }) => {
      const path = `/users/${userId}/projects`;
      return get<UsersProjectsData>({ path, params });
    },

    /**
     * https://api.websim.com/api/v1/users/${userId}/followers
     */
    getFollowers: async (params?: { first?: number; count?: boolean }) => {
      const path = `/users/${userId}/followers`;
      return get<FollowersData>({ path, params });
    },

    /**
     * https://api.websim.com/api/v1/users/${userId}/following
     */
    getFollowing: async (params?: { first?: number; count?: boolean }) => {
      const path = `/users/${userId}/following`;
      return get<FollowingData>({ path, params });
    },

    /**
     * https://api.websim.com/api/v1/users/${userId}/likes
     */
    getLikedSites: async (params?: { first?: number }) => {
      const path = `/users/${userId}/likes`;
      return get({ path, params });
    },
  } as const;
};

const users = {
  user,
  byId: (userId: string) => user({ userId }),
  byUsername: (username: string) => user({ username }),
} as const;

export const api = {
  feed,
  projects,
  project,
  users,
  user,
} as const;
