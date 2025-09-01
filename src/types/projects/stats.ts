interface DailyStat {
  day: string;
  views: number;
  engagement_rewards_earned: number;
  offplatform_engagement_rewards_earned: number;
}

interface TopReferrer {
  referrer: string;
  views: number;
}

interface TopCountry {
  country: string;
  views: number;
}

interface PlaytimeStat {
  total_active_dur: number;
  avg_active_dur: number;
}

type S<T extends string | undefined> = T extends string ? T : string;

interface TopTipper<T extends { UserId?: string; Username?: string } = {}> {
  user_id: S<T["UserId"]>;
  username: S<T["Username"]>;
  total_tips: number;
}

export interface ProjectsStatsData {
  daily_stats: DailyStat[];
  top_referrers: TopReferrer[];
  top_countries: TopCountry[];
  mobile_ratio: number;
  playtime_stats: [PlaytimeStat];
  top_tippers: TopTipper[];
  total_tip_amount: number;
}
