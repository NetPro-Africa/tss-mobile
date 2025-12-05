import axios from 'axios';
import { baseUrl } from '../shared/constants';
import { EventFetchType, EventSuccessResponseType } from './types';

export const fetchEvents = async ({
  token,
  page,
  limit,
}: Partial<EventFetchType>) => {
  const { data } = await axios.get<EventSuccessResponseType>(
    `${baseUrl}/parents/news?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
