import axios from 'axios';
import { baseUrl } from '../shared/constants';
import { PaginateRequestType } from '../shared/types';
import {
  AssignmentsResponse,
  SubmitAssignmentResponseType,
  SubmitAssignmentsType,
} from './types';

export const fetchAssignments = async ({
  token,
  page,
  limit,
  status,
}: PaginateRequestType) => {
  console.log({ status });

  const { data } = await axios.get<AssignmentsResponse>(
    `${baseUrl}/parents/assignments?page=${page}&limit=${limit}&status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export const submitAssignments = async ({
  token,
  regnum,
  testid,
  answers,
}: SubmitAssignmentsType) => {
  const { data } = await axios.post<SubmitAssignmentResponseType>(
    `${baseUrl}parents/test/submit`,
    {
      regnum,
      testid,
      answers,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
