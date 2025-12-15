import axios from 'axios';
import { baseUrl } from '../shared/constants';
import {
  AttendanceResponse,
  ChildrenResponse,
  FetchAttendanceType,
  FetchCAResponseType,
  FetchCAType,
  FetchResult,
  FetchResultSheetSuccessType,
  FetchSessionResponseType,
  FetchSessionType,
  FetchTermResponseType,
  FetchTestSummaryResponseType,
  FetchTestSummaryType,
  ResultApiResponse,
} from './types';

export const fetchStudent = async ({
  token,
}: {
  token: string;
}): Promise<ChildrenResponse> => {
  const { data } = await axios.get<ChildrenResponse>(
    `${baseUrl}/parents/children`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);

  return data;
};

export const fetchAttendance = async ({
  token,
  student_id,
  start_date,
  end_date,
}: FetchAttendanceType) => {
  const { data } = await axios.get<AttendanceResponse>(
    `${baseUrl}/parents/child-attendance/${student_id}?start_date=${start_date}&end_date=${end_date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export const fetchTerm = async ({
  token,
  regnum,
}: {
  token: string;
  regnum: string;
}) => {
  const { data } = await axios.get<FetchTermResponseType>(
    `${baseUrl}parents/filters/terms/${regnum}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const fetchTestSummary = async ({
  regnum,
  token,
  status,
}: FetchTestSummaryType) => {
  console.log({ status });

  try {
    const { data } = await axios.get<FetchTestSummaryResponseType>(
      `https://app.tss.sch.ng/api/parents/test-summary/${regnum}?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const fetchCA = async ({
  classname,
  regnum,
  session,
  term,
  token,
}: FetchCAType) => {
  const { data } = await axios.get<FetchCAResponseType>(
    `${baseUrl}parents/student/performance/${encodeURI(regnum)}?session=${encodeURI(session)}&classname=${encodeURI(classname)}&term=${encodeURI(term)}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const fetchSession = async ({ token, regnum }: FetchSessionType) => {
  const { data } = await axios.get<FetchSessionResponseType>(
    `${baseUrl}parents/filters/sessions/${regnum}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export const fetchClasses = async ({ token, regnum }: FetchSessionType) => {
  const { data } = await axios.get<FetchSessionResponseType>(
    `${baseUrl}parents/filters/classes/${regnum}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const fetchResultSheet = async ({
  token,
  regnum,
  term,
  session,
  classname,
}: FetchCAType) => {
  try {
    const { data } = await axios.get<FetchResultSheetSuccessType>(
      `${baseUrl}parents/result-sheet/${encodeURI(regnum)}?session=${encodeURI(
        session
      )}&classname=${encodeURI(classname)}&term=${encodeURI(term)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const fetchResult = async ({ token, id, page, limit }: FetchResult) => {
  const query =
    typeof page !== 'undefined' && typeof limit !== 'undefined'
      ? `?page=${page}&limit=${limit}`
      : '';
  const { data } = await axios.get<ResultApiResponse>(
    `${baseUrl}/parents/child-results/${id}${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
