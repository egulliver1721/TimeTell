import { useEffect, useState } from "react";
import axios from "axios";
import { Role } from "./setup/Roles";

interface TeacherData {
  id: string;
  teacherFirstName: string;
  teacherLastName: string;
  FTE: string | null;
  roleId: string | null;
  role: {
    roleCode: string | null;
  } | null;
  // roleType: string;
}

interface FormData {
  id: string;
  teacherFirstName: string;
  teacherLastName: string;
  FTE: string | null;
  roleId: string | null;
}

const Teachers = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    teacherFirstName: "",
    teacherLastName: "",
    FTE: "",
    roleId: "",
    // roleCode: "",
    // roleType: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [teachers, setTeachers] = useState<TeacherData[]>([
    {
      id: "",
      teacherFirstName: "",
      teacherLastName: "",
      FTE: "",
      roleId: "",
      role: { roleCode: "" },
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/roles");
        console.log(response);
        setRoles(response.data);
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = roles.find(
      (role) => role.id === event.currentTarget.value
    );

    setFormData({
      ...formData,
      roleId: selectedRole?.id ?? "",
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
              {/* select drop down for role */}
              <select
                name="roleId"
                value={formData.roleId ?? ""}
                onChange={handleSelectChange}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleType}
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
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.teacherFirstName}</td>
                <td>{teacher.teacherLastName}</td>
                <td>{teacher.FTE}</td>
                <td>{teacher.role?.roleCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
