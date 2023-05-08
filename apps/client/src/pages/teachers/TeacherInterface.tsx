export interface TeacherData {
  id: string;
  firstName: string;
  lastName: string;
  FTE: string | null;
  mandatedTime: string | null;
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
  monday: boolean | null;
  tuesday: boolean | null;
  wednesday: boolean | null;
  thursday: boolean | null;
  friday: boolean | null;
}

export interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  FTE: string | null;
  mandatedTime: string | null;
  roleId: string | null;
  yearId: string | null;
  classroomId: string | null;
  monday: boolean | null;
  tuesday: boolean | null;
  wednesday: boolean | null;
  thursday: boolean | null;
  friday: boolean | null;
}
