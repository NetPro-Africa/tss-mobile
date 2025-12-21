export type FetchAssignmentSuccessResponseType = {
  success: boolean;
  message: string;
  data: AssignmentType;
};
export type QuestionType = {
  numberz: number;
  question: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  answer: string;
};

export type FetchAssignmentResponseType = {
  token?: string;
  regnum: string;
  testid: string;
};
export type Answer = {
  numberz: number;
  yourAnswer: string;
};

export type SubmitAssignmentsType = {
  token?: string;
  regnum: string;
  testid: string;
  answers: Answer[];
};
export type SubmitAssignmentType = {
  studentName: string;
  classname: string;
  subject: string;
  session: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  scoreSummary: string;
};
export type SubmitAssignmentResponseType = {
  success: boolean;
  message: string;
  data: SubmitAssignmentType;
};

type Department = {
  id: number;
  name: string;
};

type SubjectType = {
  id: number;
  name: string;
  department_id: number;
  department: Department;
};

type SetAssignment = {
  id: number;
  title: string;
  description: string;
  opendate: string; // ISO datetime string
  closedate: string; // ISO datetime string
  teacher_id: number;
  subject_id: number;
  session_id: number;
  semester_id: number;
  status: 'active' | string; // you can expand if there are more statuses
  datecreated: string; // ISO datetime string
  subject: SubjectType;
};

export type AssignmentType2 = {
  id: number;
  student_id: number;
  setassignment_id: number;
  subject_id: number;
  details: string;
  status: 'submitted' | 'graded' | string;
  score: number | null;
  remarks: string | null;
  datecreated: string; // ISO datetime string
};

export type AssignmentItemType = {
  student: StudentType;
  assignment: AssignmentType2;
  setassignment: SetAssignment;
  status: 'completed' | 'available';
};
type AssignmentData = {
  assignments: AssignmentItemType[];
  pagination: Pagination;
};

export type AssignmentsResponse = {
  success: true;
  message: string;
  data: AssignmentData;
  meta: {
    timestamp: string; // ISO datetime string
    version: string;
  };
};

export type AssignmentItem = {
  student: Student;
  assignment: Assignment;
  submission: Submission | null;
};

export type Student = {
  id: number;
  regno: string; // e.g. "TSS/2024/001"
  fullname: string;
  class_arm: string; // e.g. "JSS 1A"
};

export type Assignment = {
  id: number;
  title: string;
  description: string;
  opendate: string; // "YYYY-MM-DD HH:mm:ss"
  closedate: string; // "YYYY-MM-DD HH:mm:ss"
  subject: Subject;
  teacher: Teacher;
};

export type Subject = {
  id: number;
  name: string;
};

export type Teacher = {
  id: number;
  fullname: string;
};

export type Submission = {
  id: number;
  status: 'submitted' | 'graded' | 'late' | 'missing' | string;
  score: number | null;
  datecreated: string; // "YYYY-MM-DD HH:mm:ss"
};

export type Pagination = {
  page: number;
  limit: number;
  count: number;
  total_pages: number;
  total: number;
};

export type Meta = {
  timestamp: string;
  version: string;
};

export type AssignmentResponse = {
  success: boolean;
  message: string;
  data: AssignmentDataType;
  meta: Meta;
};

export type SemesterType = {
  success: boolean;
  message: string;
  data: {
    semesters: Semester[];
  };
  meta: Meta;
};

export type Semester = {
  id: number;
  name: string;
};

export type AssignmentDataType = {
  student: Student;
  setassignment: SetAssignment;
  questions: QuestionDataType[];
  assignment_status: string;
  assignment: AssignmentType;
  start_time: string;
  total_questions: number;
  time_limit: number | null;
};

export type StudentType = {
  id: number;
  regno: string;
  fullname: string;
};

export type SetAssignmentType = {
  id: number;
  title: string;
  subject_id: number;
  details: string;
  test_type: string;
  total_questions: number;
  time_limit: number | null;
  passing_score: number;
  teacher_id: number;
  semester_id: number;
  status: string;
  closedate: string;
  opendate: string;
  datecreated: string;
  teacher: Teacher;
  subject: SubjectDataType;
};

export type TeacherType = {
  id: number;
  user_id: number;
  gender: string;
  address: string;
  country_id: number;
  state_id: number;
  phone: string;
  profile: string;
  cv: string;
  qualification: string;
  date_created: string;
  passport: string;
  firstname: string;
  lastname: string;
  middlename: string;
  department_id: number;
  staffgrade_id: number;
  staffdepartment_id: number;
};

export type SubjectDataType = {
  id: number;
  name: string;
  subjectcode: string;
  department_id: number;
  creditload: number;
  user_id: number;
  created_date: string;
  status: number;
  semester_id: number;
  level_id: number;
};

export type QuestionDataType = {
  id: number;
  setassignment_id: number;
  question_text: string;
  question_type: 'multiple_choice' | 'theory' | string; // extend with additional types as needed
  points: number;
  order_number: number;
  difficulty_level: string;
  created: string;
  modified: string;
  question_options: QuestionOptionType[];
};

export type QuestionOptionType = {
  id: number;
  question_id: number;
  option_text: string;
  order_number: number;
  created: string;
  modified: string;
};

export type TakeTestType = {
  success: boolean;
  message: string;
  data: {
    assignment: AssignmentType;
    answers_saved: number;
  };
  meta: {
    timestamp: string;
    version: string;
  };
};

export type AssignmentType = {
  datecreated: string;
  details: string;
  end_time: string | null;
  graded_at: string | null;
  id: number;
  session_id: number;
  setassignment_id: number;
  start_time: string;
  status: string;
  student_id: number;
  subject_id: number;
  score: number | null;
  remarks: string | null;
  teacher_comment: string;
  total_score: number | null;
};
