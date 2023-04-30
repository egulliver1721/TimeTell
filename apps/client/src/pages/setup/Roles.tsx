import { useState, useEffect } from "react";
import axios from "axios";
import RoleDataDisplay from "./RoleDataDisplay";

export interface Role {
  id: string;
  roleType: string;
  roleCode: string;
}

const Roles = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    roleType: "",
    roleCode: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleCreateRole = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/roles",
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
        const response = await axios.get("http://localhost:8000/api/roles");
        console.log(response);
        setRoles(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [showModal]);

  return (
    <div className="role-container">
      <button className="role-button" onClick={() => setShowModal(true)}>
        Create New Role
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Create New Role</h2>
            <form onSubmit={handleCreateRole}>
              <input
                type="text"
                placeholder="Role Type"
                name="roleType"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Role Code"
                name="roleCode"
                onChange={handleInputChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {<RoleDataDisplay roles={roles} />}
    </div>
  );
};

export default Roles;
