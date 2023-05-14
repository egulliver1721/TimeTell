import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import axios from "axios";
import { ValueGetterParams } from "ag-grid-community";

interface ColDef {
  field: string;
  width?: number;
  editable?: boolean;
  valueGetter?: (params: ValueGetterParams) => any;
}

const Allocation = () => {
  const [providers, setProviders] = useState([]);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState<ColDef[] | undefined>();

  const [defaultColumnDefs] = useState([
    { field: "firstName", width: 150 },
    { field: "lastName", width: 150 },
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
  ]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teachers");
        const allTeachers = response.data;
        const onlyTeachers = allTeachers.filter(
          (teacher) => teacher.role?.roleCode !== "P"
        );

        const providerTeachers = allTeachers.filter(
          (teacher) => teacher.role?.roleCode === "P"
        );

        providerTeachers.forEach((teacher) =>
          console.log(teacher.class?.className ?? 0)
        );

        const providerColDefs = providerTeachers.map((provider) => ({
          field: provider.class?.className ? provider.class.className : "0",
          editable: true,
        }));
        setProviders(providerTeachers);
        setRowData(onlyTeachers);
        setColumnDefs([...defaultColumnDefs, ...providerColDefs]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // need to create a new table in schema with join table for providers?
  // teachers are allocated to a provider to get their "allocated time"
  // providers can do 35min or 55min sessions.
  //  Now set is saved for Providers, I think I need to post that to DB for provider table?
  // Create a join table. With teacherId, sessionId, numAllocatedSessions
  // How do I manage the different types of sessions?

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
