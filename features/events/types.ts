export type EventFetchType = {
  token: string;
  page: number;
  limit: number;
};

export type EventSuccessResponseType = {
  success: true;
  message: string;
  data: EventTypes[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

export type EventTypes = {
  events: string;
  date1: string;
  ref: string;
};
