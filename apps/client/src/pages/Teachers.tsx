import { useEffect, useState } from "react";
import axios from "axios";
import { Role } from "./setup/Roles";
import { YearGroupData } from "./setup/YearGroups";
import { ClassroomData } from "./setup/Classes";

interface TeacherData {
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

interface FormData {
  id: string;
  teacherFirstName: string;
  teacherLastName: string;
  FTE: string | null;
  roleId: string | null;
  yearId: string | null;
  classroomId: string | null;
}

const Teachers = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    teacherFirstName: "",
    teacherLastName: "",
    FTE: "",
    roleId: "",
    yearId: "",
    classroomId: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [years, setYears] = useState<YearGroupData[]>([]);
  const [classrooms, setClassrooms] = useState<ClassroomData[]>([]);
  const [teachers, setTeachers] = useState<TeacherData[]>([
    {
      id: "",
      teacherFirstName: "",
      teacherLastName: "",
      FTE: "",
      roleId: "",
      role: { roleCode: "" },
      yearId: "",
      year: { yearGroup: "" },
      classroomId: "",
      class: { className: "" },
    },
  ]);

  // get role data and setRoles state
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // get year data and setYear state
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/yeargroups"
        );
        console.log(response);
        setYears(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // get class data and setClasses state
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/classes");
        console.log(response);
        setClassrooms(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleCreateTeacher = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/teachers",
        formData
      );
      setShowModal(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData);
    setFormData({
      ...formData,
      [event?.currentTarget.name]: event?.currentTarget.value,
    });
  };

  const handleSelectRoleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRole = roles.find(
      (role) => role.id === event.currentTarget.value
    );

    setFormData({
      ...formData,
      roleId: selectedRole?.id ?? "",
    });
  };

  const handleSelectYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedYear = years.find(
      (year) => year.id === event.currentTarget.value
    );

    setFormData({
      ...formData,
      yearId: selectedYear?.id ?? "",
    });
  };

  const handleSelectClassroomChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedClassroom = classrooms.find(
      (classroom) => classroom.id === event.currentTarget.value
    );

    setFormData({
      ...formData,
      classroomId: selectedClassroom?.id ?? "",
    });
  };

  // get teacher data to display
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teachers");
        setTeachers(response.data);
        console.log(teachers);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [showModal]);

  return (
    <div className="role-container">
      <button className="role-button" onClick={() => setShowModal(true)}>
        + Teacher
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Create New Teacher</h2>
            <form onSubmit={handleCreateTeacher}>
              <input
                type="text"
                placeholder="First Name"
                name="teacherFirstName"
                value={formData.teacherFirstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="teacherLastName"
                value={formData.teacherLastName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="FTE"
                name="FTE"
                value={formData.FTE ?? ""}
                onChange={handleInputChange}
              />
              {/* select drop down for ROLE */}
              <select
                name="roleId"
                value={formData.roleId ?? ""}
                onChange={handleSelectRoleChange}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleType}
                  </option>
                ))}
              </select>
              {/* select drop down for YEAR */}
              <select
                name="yearId"
                value={formData.yearId ?? ""}
                onChange={handleSelectYearChange}
              >
                <option value="">Select a year</option>
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.yearGroup}
                  </option>
                ))}
              </select>
              {/* select drop down for CLASSROOM */}
              <select
                name="classroomId"
                value={formData.classroomId ?? ""}
                onChange={handleSelectClassroomChange}
              >
                <option value="">Select a classroom</option>
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.className}
                  </option>
                ))}
              </select>
              {/* submit */}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      <div>
        <h2>Teacher Data</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>FTE</th>
              <th>Role</th>
              <th>Year</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.teacherFirstName}</td>
                <td>{teacher.teacherLastName}</td>
                <td>{teacher.FTE}</td>
                <td>{teacher.role?.roleCode}</td>
                <td>{teacher.year?.yearGroup}</td>
                <td>{teacher.class?.className}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
