export type StudentSuccessResponseType = {
  success: boolean;
  message: string;
  data: StudentType[];
};

export type StudentType = {
  name: string;
  id: number;
  class: string;
};

export type FetchAttendanceType = {
  token?: string;
  student_id: number;
  start_date?: string;
  end_date?: string;
};

export type AttendanceType = {
  class: string;
  date: string;
  present: boolean;
  session: string;
  term: string;
};

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

// Student
type Student = {
  id: number;
  regno: string;
  fname: string;
  lname: string;
  fullname: string;
  class_arm: string;
};

// Single attendance record
type AttendanceRecord = {
  id: number;
  student_id: number;
  attendance_date: string; // ISO date string "YYYY-MM-DD"
  status: AttendanceStatus;
  remarks: string | null;
  created: string; // "YYYY-MM-DD HH:mm:ss"
};

// Summary stats
type AttendanceSummary = {
  total_days: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendance_rate: number;
};

// Date range
type DateRange = {
  start_date: string;
  end_date: string;
};

// Full response
export type AttendanceResponse = {
  success: true;
  message: string;
  data: {
    student: Student;
    attendances: AttendanceRecord[];
    summary: AttendanceSummary;
    date_range: DateRange;
  };
  meta: {
    timestamp: string;
    version: string;
  };
};

export const TermType = ['First Term', 'Second Term', 'Third Term'];
export type TermSingleType = (typeof TermType)[number];
export type TermTypeKey = keyof typeof TermType;
export type FetchTermResponseType = {
  success: true;
  message: 'Terms fetched successfully';
  data: typeof TermType;
};
export type FetchSessionResponseType = {
  success: boolean;
  message: string;
  data: string[];
};
export type FetchTestSummaryType = {
  token?: string;
  regnum: string;
  status: 'completed' | 'pending' | 'elapsed';
};
export type SummaryType = {
  testid: string;
  assesment: string;
  date1: string;
  date2: string;
  subjectName: string;
  regnum: string;
  studentName: string;
};
export type FetchTestSummaryResponseType = {
  success: boolean;
  message: string;
  session: string;
  data: SummaryType[];
};

export type CAType = {
  subjectid: string;
  subjectName: string;
  classes: string;
  sessions: string;
  terms: string;
  ca1: number;
  ca2: number;
  ca3: number;
  exam: number;
  total: number;
};

export type FetchCAResponseType = {
  success: boolean;
  message: string;
  data: CAType[];
};

export type FetchCAType = {
  session: string;
  classname: string;
  term: string;
  regnum: string;
  token?: string;
};
export type FetchResult = {
  id: string | number;

  token?: string;
  page?: number;
  limit?: number;
};

export type FetchSessionType = {
  token: string;
  regnum: string;
};

export type ResultStudentType = {
  name: string;
  regnum: string;
  image: string;
  class: string;
  arm: string;
  attendance: string;
};
export type SchoolType = {
  name: string;
  address: string;
  logo: string;
  stamp: string;
};

export type TermInfoType = {
  session: string;
  term: TermSingleType;
  reopening: string;
};

export type Score = {
  subjectid: string;
  subjectName: string;
  ca1: number;
  ca2: number;
  ca3: number;
  exam: number;
  total: number;
  classAverage: number;
};

export type TermSummaryType = {
  termTotal: number;
  termAverage: number;
  termGrade: string;
  classTermTotal: number;
  classPopulation: number;
  classSessionAvg: number;
  studentSessionAvg: number;
  sessionGrade: string;
  fees: string;
};
export type CommentsType = {
  formTeacher: string;
  headTeacher: string;
};
export type ResultSheetType = {
  student: ResultStudentType;
  school: SchoolType;
  termInfo: TermInfoType;
  scores: Score[];
  termSummary: TermSummaryType;
  comments: CommentsType;
};
export type FetchResultSheetSuccessType = {
  success: true;
  id: string | number;
};
// Main response type
export interface ChildrenResponse {
  success: boolean;
  message: string;
  data: Child[];
  meta: Meta;
}

// Individual child/student record
export interface Child {
  id: number;
  fname: string;
  lname: string;
  mname: string;
  dob: string; // ISO date string "YYYY-MM-DD"
  joindate: string; // ISO 8601 datetime with timezone
  department_id: number;
  class_arm_id: number;
  olevelresulturl: string;
  jamb: null | number;
  birthcerturl: string | null;
  othercerts: string | null;
  email: string;
  state_id: number;
  country_id: number;
  address: string;
  phone: string;
  fathersname: string;
  mothersname: string;
  fatherphone: string;
  motherphone: string;
  lga_id: number | null;
  community: string;
  passporturl: string | null;
  user_id: number;
  regno: string;
  jamb_notification: string | null;
  jambresult: string | null;
  jamb_admin_letter: string | null;
  status: string; // e.g., "Admitted"
  admissiondate: string; // ISO date string
  gender: 'Male' | 'Female'; // adjust if there are other values
  application_no: string | null;
  level_id: number;
  sparent_id: number;
  religion: string;
  faculty_id: number;
  jambregno: string | null;
  previousschool: string;
  programme_id: number;
  fathersjob: string | null;
  mothersjob: string | null;
  studentstatus: 'active' | 'inactive'; // adjust as needed
  mode_id: number;
  universitymail: string | null;
  category_id: number | null;
  programetype_id: number | null;
  duration_id: number | null;
  landlocation: string | null;
  landsize: string | null;
  landowner: string | null;
  landaccessurl: string | null;
  session_id: number;
  isclaretian: 'Yes' | 'No';
  class_arm: ClassArm;
  department: Department;
}

// Nested class arm
export interface ClassArm {
  id: number;
  department_id: number;
  arm_name: string; // e.g., "A", "B"
  arm_description: string;
  class_teacher_id: number | null;
  status: 'active' | 'inactive';
  created: string; // ISO 8601 datetime
  modified: string; // ISO 8601 datetime
}

// Nested department
export interface Department {
  id: number;
  faculty_id: number;
  name: string; // e.g., "BASIC 1", "BASIC 4"
  deptcode: string;
  iscdl: 'Yes' | 'No';
  maxunit: number;
}

// Meta information
export interface Meta {
  timestamp: string; // e.g., "2025-11-28 15:54:05"
  version: string; // e.g., "v1"
}

type StudentData = {
  id: number;
  regno: string; // e.g. "TSS/2024/001"
  fname: string;
  lname: string;
  mname: string;
  fullname: string;
  department: string; // e.g. "Science"
  class_arm: string; // e.g. "JSS 1A"
};

type Subject = {
  id: number;
  name: string; // e.g. "Mathematics"
  code: string; // e.g. "MTH"
};

type Semester = {
  id: number;
  name: string; // e.g. "First Term"
};

type Session = {
  id: number;
  name: string; // e.g. "2024/2025"
};

export type ResultItem = {
  id: number;
  student_id: number;
  subject_id: number;
  ca: number; // Continuous Assessment
  first_exam: number;
  second_exam: number;
  third_exam: number;
  total: number;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'; // extend as needed
  remark: string; // e.g. "Excellent", "Good", etc.
  approvalstatus: 'approved' | 'pending' | 'rejected';
  uploaddate: string; // format: "YYYY-MM-DD HH:MM:SS"
  subject: Subject;
  semester: Semester;
  session: Session;
};

type ResultSummary = {
  total_subjects: number;
  average_score: number; // can be float
  highest_score: number;
  lowest_score: number;
  position: number; // e.g. 5th position
  class_size: number;
};

export type Pagination = {
  page: number;
  limit: number;
  count: number;
  total: number;
  total_pages: number;
};

export type StudentResponseData = {
  student: StudentData;
  results: ResultItem[];
  summary: ResultSummary;
  pagination: Pagination;
};

// Full API response type
export type ResultApiResponse = {
  success: boolean;
  message: string;
  data: StudentResponseData;
  meta: {
    timestamp: string; // e.g. "2025-11-27 17:44:51"
    version: string; // e.g. "v1"
  };
};

export type assignmentStatus = 'in_progress' | 'completed' | 'available';

export type SingleAssignmentParams = {
  id: string;
  studentId: string;
  token?: string;
};

export type ResponseAssignmentType = {
  details: string;
  answers: {
    [questionId: string]: number | string;
  };
};
