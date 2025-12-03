export type AssignmentType = {
  testid: string;
  regnum: string;
  subjectName: string;
  assessment: string;
  session: string;
  totalQuestions: number;
  currentQuestion: number;
  questions: QuestionType[];
};
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

type StudentType = {
  id: number;
  regno: string;
  fullname: string;
};

type AssignmentItemType = {
  student: StudentType;
  assignment: AssignmentType2;
  setassignment: SetAssignment;
  status: 'completed' | 'available';
};

export type AssignmentsResponse = {
  success: true;
  message: string;
  data: AssignmentItemType[];
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
};

export type Meta = {
  timestamp: string;
  version: string;
};
