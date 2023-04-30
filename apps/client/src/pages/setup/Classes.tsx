import { useState, useEffect } from "react";
import axios from "axios";
import ClassDataDisplay from "./ClassDataDisplay";

interface ClassroomData {
  id: string;
  className: string;
}

const ClassData = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
  });
  const [classData, setClassData] = useState<ClassroomData[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleCreateClass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/classes",
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
        const response = await axios.get("http://localhost:8000/api/classes");
        setClassData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [showModal]);

  return (
    <div className="role-container">
      <button className="role-button" onClick={() => setShowModal(true)}>
        Create New Class
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Create New Class</h2>
            <form onSubmit={handleCreateClass}>
              <input
                type="text"
                placeholder="Class Name"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      <ClassDataDisplay classData={classData} />
    </div>
  );
};

export default ClassData;
