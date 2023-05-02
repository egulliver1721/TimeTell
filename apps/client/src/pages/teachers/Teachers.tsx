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
  const [days, setDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });
  const [formData, setFormData] = useState<FormData>({
    id: "",
    teacherFirstName: "",
    teacherLastName: "",
    FTE: "",
    roleId: "",
    yearId: "",
    classroomId: "",
    days: { ...days },
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

  // save to formData next
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setDays((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setFormData((prevState) => ({
      ...prevState,
      days: {
        ...prevState.days,
        [name]: checked,
      },
    }));
    console.log(formData);
  };

  // get teacher data to display

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
        days={days}
      />
      <div>
        <h2>Teacher Data</h2>
        <TeacherTableComponent teachers={teachers} />
      </div>
    </div>
  );
};

export default Teachers;
