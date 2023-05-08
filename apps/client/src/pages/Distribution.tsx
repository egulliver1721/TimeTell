import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import axios from "axios";

const Allocation = () => {
  const [rowData, setRowData] = useState();

  const [columnDefs] = useState([
    { field: "firstName", width: 150 },
    { field: "lastName", width: 150 },
    {
      field: "role",
      valueGetter: (params) => params.data.role?.roleCode,
      width: 100,
    },
    {
      field: "year",
      valueGetter: (params) => params.data.year?.yearGroup,
      width: 100,
    },
    {
      field: "Class",
      valueGetter: (params) => params.data.class?.className,
      width: 100,
    },

    {
      field: "FTE",
      width: 100,
    },
    {
      field: "mandatedTime",
      width: 180,
      editable: true,
    },
    {
      field: "additionalTime",
      width: 180,
      editable: true,
    },
    {
      field: "totalTime",
      valueGetter: (params) => {
        const mandatedTime = Number(params.data.mandatedTime) || 0;
        const additionalTime = Number(params.data.additionalTime) || 0;
        return mandatedTime + additionalTime;
      },
    },
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
  }, []);

  function onCellValueChanged(event) {
    const updatedData = event.data;
    console.log("Data after change is", event.data);
    axios
      .put(`http://localhost:8000/api/teachers/${updatedData.id}`, updatedData)
      .then((response) => {
        console.log("Updated data sent to server:", response.data);
      })
      .catch((error) => {
        console.error("Error sending updated data to server:", error);
      });
  }

  return (
    <div className="table-container">
      <div className="ag-theme-alpine" style={{ height: 400, width: 1150 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellValueChanged={onCellValueChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Allocation;
