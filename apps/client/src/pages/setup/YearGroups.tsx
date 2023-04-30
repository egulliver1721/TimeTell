import { useState, useEffect } from "react";
import axios from "axios";
import YearGroupDataDisplay from "./YearGroupDataDisplay";

interface YearGroupData {
  id: string;
  yearGroup: string;
}

const YearGroups = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    YearGroup: "",
  });
  const [yearGroup, setYearGroup] = useState<YearGroupData[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleCreateYearGroup = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/yeargroups",
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
        const response = await axios.get(
          "http://localhost:8000/api/yeargroups"
        );
        console.log(response);
        setYearGroup(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [showModal]);

  return (
    <div className="role-container">
      <button className="role-button" onClick={() => setShowModal(true)}>
        Create New Year Group
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Create New Year Group</h2>
            <form onSubmit={handleCreateYearGroup}>
              <input
                type="text"
                placeholder="Year Group"
                name="yearGroup"
                onChange={handleInputChange}
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      <YearGroupDataDisplay yearGroup={yearGroup} />
    </div>
  );
};

export default YearGroups;
