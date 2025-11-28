import axios from 'axios';
import { baseUrl } from '../shared/constants';
import {
  ChildrenResponse,
  FetchAttendanceResponseType,
  FetchAttendanceType,
  FetchCAResponseType,
  FetchCAType,
  FetchResultSheetSuccessType,
  FetchSessionResponseType,
  FetchSessionType,
  FetchTermResponseType,
  FetchTestSummaryResponseType,
  FetchTestSummaryType,
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
  return data;
};

export const fetchAttendance = async ({
  token,
  regnum,
  term,
}: FetchAttendanceType) => {
  const { data } = await axios.get<FetchAttendanceResponseType>(
    `${baseUrl}parents/attendance?regnum=${encodeURI(regnum)}&term=${encodeURI(
      term
    )}`,
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
