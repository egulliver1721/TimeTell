const TeacherDataModal = (props) => {
  return (
    <div>
      {props.showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => props.setShowModal(false)}>
              &times;
            </span>
            <h2>Create New Teacher</h2>
            <form onSubmit={props.handleCreateTeacher}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={props.formData.firstName}
                onChange={props.handleInputChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={props.formData.lastName}
                onChange={props.handleInputChange}
              />
              <input
                type="text"
                placeholder="FTE"
                name="FTE"
                value={props.formData.FTE ?? ""}
                onChange={props.handleInputChange}
              />
              <input
                type="text"
                placeholder="Mandated Time"
                name="mandatedTime"
                value={props.formData.mandatedTime ?? ""}
                onChange={props.handleInputChange}
              />
              {/* select drop down for ROLE */}
              <select
                name="roleId"
                value={props.formData.roleId ?? ""}
                onChange={props.handleSelectRoleChange}
              >
                <option value="">Select a role</option>
                {props.roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleType}
                  </option>
                ))}
              </select>
              {/* select drop down for YEAR */}
              <select
                name="yearId"
                value={props.formData.yearId ?? ""}
                onChange={props.handleSelectYearChange}
              >
                <option value="">Select a year</option>
                {props.years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.yearGroup}
                  </option>
                ))}
              </select>
              {/* select drop down for CLASSROOM */}
              <select
                name="classroomId"
                value={props.formData.classroomId ?? ""}
                onChange={props.handleSelectClassroomChange}
              >
                <option value="">Select a classroom</option>
                {props.classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.className}
                  </option>
                ))}
              </select>
              <label>
                Monday
                <input
                  type="checkbox"
                  name="monday"
                  checked={props.formData.monday || false}
                  onChange={props.handleCheckboxChange}
                />
              </label>
              <label>
                Tuesday
                <input
                  type="checkbox"
                  name="tuesday"
                  checked={props.formData.tuesday || false}
                  onChange={props.handleCheckboxChange}
                />
              </label>
              <label>
                Wednesday
                <input
                  type="checkbox"
                  name="wednesday"
                  checked={props.formData.wednesday || false}
                  onChange={props.handleCheckboxChange}
                />
              </label>
              <label>
                Thursday
                <input
                  type="checkbox"
                  name="thursday"
                  checked={props.formData.thursday || false}
                  onChange={props.handleCheckboxChange}
                />
              </label>
              <label>
                Friday
                <input
                  type="checkbox"
                  name="friday"
                  checked={props.formData.friday || false}
                  onChange={props.handleCheckboxChange}
                />
              </label>
              {/* submit */}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDataModal;
