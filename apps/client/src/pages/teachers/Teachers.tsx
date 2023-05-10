import { useEffect, useState } from "react";
import axios from "axios";
import { Role } from "../setup/Roles";
import { YearGroupData } from "../setup/YearGroups";
import { ClassroomData } from "../setup/Classes";
import { TeacherData, FormData } from "./TeacherInterface";
import TeacherDataModal from "./TeacherDataModal";
import TeacherTableComponent from "./TeacherTableComponent";

const Teachers = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    firstName: "",
    lastName: "",
    FTE: "",
    mandatedTime: "",
    roleId: "",
    yearId: "",
    classroomId: "",
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
  });
  const [providers, setProviders] = useState<TeacherData[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [years, setYears] = useState<YearGroupData[]>([]);
  const [classrooms, setClassrooms] = useState<ClassroomData[]>([]);
  const [teachers, setTeachers] = useState<TeacherData[]>([
    {
      id: "",
      firstName: "",
      lastName: "",
      FTE: "",
      mandatedTime: "",
      roleId: "",
      role: { roleCode: "" },
      yearId: "",
      year: { yearGroup: "" },
      classroomId: "",
      class: { className: "" },
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
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
        setClassrooms(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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

  // save workdays checkbox to formData
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
    console.log(formData);
  };

  // post teacher data
  const handleCreateTeacher = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

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

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [showModal]);
  // refresh on update?

  return (
    <div className="role-container">
      <button className="role-button" onClick={() => setShowModal(true)}>
        + Teacher
      </button>
      <TeacherDataModal
        handleCheckboxChange={handleCheckboxChange}
        handleInputChange={handleInputChange}
        handleSelectRoleChange={handleSelectRoleChange}
        handleSelectYearChange={handleSelectYearChange}
        handleSelectClassroomChange={handleSelectClassroomChange}
        handleCreateTeacher={handleCreateTeacher}
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        roles={roles}
        years={years}
        classrooms={classrooms}
      />
      <div>
        <h2>Teacher Data</h2>
        <TeacherTableComponent teachers={teachers} formData={formData} />
      </div>
    </div>
  );
};

export default Teachers;
