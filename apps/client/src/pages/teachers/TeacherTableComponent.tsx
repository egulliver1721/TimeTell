import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import axios from "axios";

const TeacherTableComponent = (props) => {
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: "firstName", width: 120 },
    { field: "lastName", width: 102 },
    {
      field: "role",
      valueGetter: (params) => params.data.role?.roleCode,
      width: 80,
    },
    {
      field: "year",
      valueGetter: (params) => params.data.year?.yearGroup,
      width: 70,
    },
    {
      field: "Class",
      valueGetter: (params) => params.data.class?.className,
      width: 100,
    },
    { field: "FTE", width: 60 },
    { field: "mandatedTime", width: 140 },
    { field: "monday", width: 100 },
    { field: "tuesday", width: 100 },
    { field: "wednesday", width: 109 },
    { field: "thursday", width: 105 },
    { field: "friday", width: 105 },
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
  }, [props.formData]);

  // // function onCellValueChanged(event) {
  // //   const updatedData = event.data;
  // //   console.log("Data after change is", event.data);
  // //   axios
  // //     .put(`http://localhost:8000/api/teachers/${updatedData.id}`, updatedData)
  // //     .then((response) => {
  // //       console.log("Updated data sent to server:", response.data);
  // //     })
  // //     .catch((error) => {
  // //       console.error("Error sending updated data to server:", error);
  // //     });
  // }

  return (
    <div className="table-container">
      <div className="ag-theme-alpine" style={{ height: 400, width: 1194 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          // onCellValueChanged={onCellValueChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default TeacherTableComponent;
