import axios from 'axios';
import { baseUrl } from '../shared/constants';
import { EventFetchType, EventSuccessResponseType } from './types';

export const fetchEvents = async ({ token }: Partial<EventFetchType>) => {
  const { data } = await axios.get<EventSuccessResponseType>(
    `${baseUrl}common/news`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
