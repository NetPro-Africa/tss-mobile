export type EventFetchType = {
  token: string;
  page: number;
  limit: number;
};

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  recipients: 'parents' | 'all'; // currently only these two values appear
  status: 'active' | 'inactive'; // "active" is present; adding common alternative
  datecreated: string; // ISO-like datetime string, e.g. "2025-11-25 10:00:00"
  user_id: number;
};

export type Pagination = {
  page: number;
  limit: number;
  count: number; // number of items returned in this page
  total: number; // total items available
  total_pages: number;
};

export type EventData = {
  news: NewsItem[];
  pagination: Pagination;
};

// Full response (if you want the whole thing)
export type EventSuccessResponseType = {
  success: boolean;
  message: string;
  data: EventData;
  meta: {
    timestamp: string; // e.g. "2025-11-27 17:44:51"
    version: string; // e.g. "v1"
  };
};
