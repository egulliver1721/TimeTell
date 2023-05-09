import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import axios from "axios";

interface SessionColumns {
  id: String;
  sessionType: String;
  sessionLength: String;
}

interface Fields {
  field: String;
  width: Number;
  editable: boolean;
  sessionId: String;
  length: String;
  valueGetter: Function;
}

const Allocation = () => {
  const [rowData, setRowData] = useState();
  const [sessionColumns, setSessionColumns] = useState<SessionColumns[]>([]);
  const [fields, setFields] = useState<Fields[]>([]);

  console.log(sessionColumns);
  console.log(fields);

  const [columnDefs, setColumnDefs] = useState([
    { field: "firstName", width: 150 },
    { field: "lastName", width: 150 },
    {
      field: "mandatedTime",
      width: 170,
      editable: true,
      hide: true,
    },
    {
      field: "additionalTime",
      width: 160,
      editable: true,
    },
    {
      field: "totalTime",
      valueGetter: (params) => {
        const mandatedTime = Number(params.data.mandatedTime) || 0;
        const additionalTime = Number(params.data.additionalTime) || 0;
        return mandatedTime + additionalTime;
      },
      width: 160,
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

  // This fetches session and updates colDefs - WORKS
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/sessions");
        const sessions = response.data;
        const teacherSessionResponse = await axios.get(
          "http://localhost:8000/api/teachers/sessions"
        );

        setSessionColumns(sessions);

        const allocatedTeacherSessions = teacherSessionResponse.data;
        const newFields = sessions.map((session) => ({
          field: session.sessionType,
          width: 150,
          editable: true,
          sessionId: session.id,
          length: parseInt(session.sessionLength),
          valueGetter: (params) => {
            const teacherId = params.data.id;
            const sessionId = params.colDef.sessionId;
            const matchingSessions = allocatedTeacherSessions.find(
              (session) =>
                session.teacherId === teacherId &&
                session.sessionId === sessionId
            );
            return matchingSessions ? matchingSessions.numSessions : null;
          },
        }));

        // const sumValueGetter = (params) => {
        //   let sum = 0;
        //   for (let i = 0; i < newFields.length; i++) {
        //     const value = params.getValue(newFields[i].field);
        //     if (value) {
        //       sum += parseInt(value);
        //     }
        //   }
        //   return sum;
        // };

        const sumValueGetter = (params) => {
          let sum = 0;
          for (let i = 0; i < newFields.length; i++) {
            const sessionType = newFields[i].field;
            const value = params.getValue(sessionType);
            if (value) {
              const session = sessions.find(
                (s) => s.sessionType === sessionType
              );
              const sessionLength = parseInt(session.sessionLength);
              sum += value * sessionLength;
            }
          }
          return sum;
        };

        const sumColumn = {
          field: "sum",
          valueGetter: sumValueGetter,
        };

        setFields([...newFields, sumColumn]);

        setColumnDefs([...columnDefs, ...newFields, sumColumn]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(rowData);

  function onCellValueChanged(event) {
    const updatedData = event.data;
    const columnData = event.colDef;
    const sessionId = event.colDef.sessionId;
    const teacherId = event.data.id;
    const colDefField = event.colDef.field;
    const numSessions = updatedData[colDefField];

    axios
      .put(`http://localhost:8000/api/teachers/${updatedData.id}`, updatedData)
      .then((response) => {
        console.log("Updated data sent to server:", response.data);
      })
      .catch((error) => {
        console.error("Error sending updated data to server:", error);
      });

    axios
      .post(
        `http://localhost:8000/api/teachers/${teacherId}/sessions/${sessionId}`,
        { columnData: columnData, updatedData: updatedData }
      )
      .then((response) => {
        console.log(
          `${numSessions}sent to teachersession table`,
          response.data
        );
      })
      .catch((error) => {
        console.log("error sending numsessions to server", error);
      });
  }

  var gridOptions = {
    rowData: rowData,
    columnDefs: columnDefs,
    onCellValueChanged: onCellValueChanged,
    defaultColDef: {
      sortable: true,
      filter: "agTextColumnFilter",
      resizable: true,
    },
  };

  return (
    <div>
      <div className="table-container">
        <div className="ag-theme-alpine" style={{ height: 400, width: 1150 }}>
          <AgGridReact
            rowData={gridOptions.rowData}
            columnDefs={gridOptions.columnDefs}
            onCellValueChanged={gridOptions.onCellValueChanged}
            defaultColDef={gridOptions.defaultColDef}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default Allocation;
