interface Image {
  height: number;
  width: number;
  url: string
}
type TikTokStats = {
  followingCount: number;
  followerCount: number;
  heartCount: number;
  videoCount: number;
  diggCount: number;
  // Add any other properties based on the actual structure of 'stats'
  // For example: shareCount, commentCount, etc.
};
export interface TikTokUser {
  stats: TikTokStats;
  user: {
    avatarLarger: string;
    avatarMedium: string;
    avatarThumb: string;
    commentSetting: number;
    duetSetting: number;
    ftc: boolean;
    id: string;
    isADVirtual: boolean;
    isUnderAge18: boolean;
    nickname: string;
    openFavorite: null | any;
    privateAccount: boolean;
    relation: number;
    secUid: string;
    secret: boolean;
    signature: string;
    stitchSetting: number;
    uniqueId: string;
    verified: boolean;
  };
};



type Author = {
  id: string;
  unique_id: string;
  nickname: string;
  // Add more properties as needed
};

type MusicInfo = {
  id: string;
  title: string;
  // Add more properties as needed
};

type CommerceInfo = {
  adv_promotable: boolean;
  auction_ad_invited: boolean;
  branded_content_type: number;
  // Add more properties as needed
};

export interface CreaterData{
  cursor: string;
  hasMore: boolean;
  videos:{
  anchors: null;
  anchors_extras: string;
  author: Author;
  aweme_id: string;
  collect_count: number;
  comment_count: number;
  commerce_info: CommerceInfo;
  commercial_video_info: string;
  cover: string;
  create_time: number;
  digg_count: number;
  download_count: number;
  duration: number;
  is_ad: boolean;
  is_top: number;
  music: string;
  music_info: MusicInfo;
  origin_cover: string;
  play: string;
  play_count: number;
  region: string;
  share_count: number;
  size: number;
  title: string;
  video_id: string;
  wm_size: number;
  wmplay: string;
  }[]
}

interface Links {
  href: string,
  label: string
}

 export interface Footer {
  Cards: string[];
  Links: Links[];
}