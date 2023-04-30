import { useState, useEffect } from "react";
import axios from "axios";
import SessionTypesDataDisplay from "./SessionTypesDataDisplay";

interface SessionTypeData {
  id: string;
  sessionType: string;
}

const SessionTypes = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    sessionType: "",
  });
  const [sessionData, setSessionData] = useState<SessionTypeData[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    console.log(formData);
  };

  const handleCreateSessionType = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/sessions",
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
        const response = await axios.get("http://localhost:8000/api/sessions");
        setSessionData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [showModal]);

  return (
    <div className="role-container">
      <button className="role-button" onClick={() => setShowModal(true)}>
        Create New Session Type
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Create New Session Type</h2>
            <form onSubmit={handleCreateSessionType}>
              <input
                type="text"
                placeholder="Session Type eg: 55min period"
                name="sessionType"
                value={formData.sessionType}
                onChange={handleInputChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      <SessionTypesDataDisplay sessionType={sessionData} />
    </div>
  );
};

export default SessionTypes;
