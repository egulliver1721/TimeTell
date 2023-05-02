import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const TeacherTableComponent = (props) => {
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: "First Name" },
    { field: "Last Name" },
    { field: "Role" },
    { field: "Year" },
    { field: "Class" },
    { field: "FTE" },
    { field: "Monday" },
    { field: "Tuesday" },
    { field: "Wednesday" },
    { field: "Thursday" },
    { field: "Friday" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teachers");
        setRowData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }),
    [];

  // display setRowData in ag-grid function to map to the set fields.

  return (
    <div className="table-container">
      <table className="teacher-data-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>FTE</th>
            <th>Role</th>
            <th>Year</th>
            <th>Class</th>
            <th>Working Days</th>
          </tr>
        </thead>
        <tbody>
          {props.teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.teacherFirstName}</td>
              <td>{teacher.teacherLastName}</td>
              <td>{teacher.FTE}</td>
              <td>{teacher.role?.roleCode}</td>
              <td>{teacher.year?.yearGroup}</td>
              <td>{teacher.class?.className}</td>
              {/* <td>{teacher.days}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
};

export default TeacherTableComponent;
