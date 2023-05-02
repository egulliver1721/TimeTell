export interface TeacherData {
  id: string;
  teacherFirstName: string;
  teacherLastName: string;
  FTE: string | null;
  roleId: string | null;
  role: {
    roleCode: string | null;
  } | null;
  yearId: string | null;
  year: {
    yearGroup: string | null;
  } | null;
  classroomId: string | null;
  class: {
    className: string | null;
  } | null;
}

export interface FormData {
  id: string;
  teacherFirstName: string;
  teacherLastName: string;
  FTE: string | null;
  roleId: string | null;
  yearId: string | null;
  classroomId: string | null;
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
}
