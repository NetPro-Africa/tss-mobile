import axios, { isAxiosError } from 'axios';
import {
  AssignmentResponse,
  SemesterType,
  SessionType,
  TakeTestType,
} from '../assignments/types';
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
  ResponseAssignmentType,
  ResultApiResponse,
  SingleAssignmentParams,
} from './types';

export const fetchStudent = async ({
  token,
}: {
  token: string;
}): Promise<ChildrenResponse> => {
  try {
    const { data } = await axios.get<ChildrenResponse>(
      `${baseUrl}/parents/children`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status;
      console.log('message', message);
      console.log('status', status);
    } else {
      console.log('error', JSON.stringify(error));
    }

    throw new Error(`${error}`);
  }
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
export const fetchResult = async ({
  token,
  id,
  page,
  limit,
  session_id,
  semester_id,
}: FetchResult) => {
  const query =
    typeof page !== 'undefined' && typeof limit !== 'undefined'
      ? `?page=${page}&limit=${limit}`
      : '';
  console.log({ query, session_id, semester_id });

  const { data } = await axios.get<ResultApiResponse>(
    `${baseUrl}/parents/child-results/${id}${query}&session_id=${session_id}&semester_id=${semester_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const fetchAssignment = async ({
  id,
  studentId,
  token,
}: SingleAssignmentParams) => {
  try {
    const { data } = await axios.get<AssignmentResponse>(
      `${baseUrl}/parents/assignments/${id}/view/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
export const startAssignment = async ({
  id,
  studentId,
  token,
}: SingleAssignmentParams) => {
  try {
    const { data } = await axios.get<AssignmentResponse>(
      `${baseUrl}/parents/assignments/${id}/start/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({ data });

    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
export const takeAssignment = async ({
  id,
  studentId,
  token,
  answers,
  details,
}: SingleAssignmentParams & ResponseAssignmentType) => {
  try {
    const { data } = await axios.post<TakeTestType>(
      `${baseUrl}/parents/assignments/${id}/take/${studentId}`,
      {
        answers,
        details,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

export const getTerms = async (token: string) => {
  try {
    const { data } = await axios.get<SemesterType>(
      `${baseUrl}/common/semesters`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
export const getSessions = async (token: string) => {
  try {
    const { data } = await axios.get<SessionType>(
      `${baseUrl}/common/sessions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
