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

  // post a subset of teacherData to the providers table schema
  // filter through formData and extra only the ones that are tagged as a Provider.
  // teachers with the role of SP or provider need to get send to the providers table
  //  teacherId, Role, Class

  // get teacher data to display

  // filter teacher state data.

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
