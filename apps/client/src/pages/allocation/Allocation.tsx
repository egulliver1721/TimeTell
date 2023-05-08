import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface TeacherSessions {
  teacherId: string;
  sessionId: string;
}

import axios from "axios";

const Allocation = () => {
  const [rowData, setRowData] = useState();
  const [teacherSessionId, setTeacherSessionId] = useState<TeacherSessions[]>(
    []
  );

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

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/sessions");
        const sessions = response.data;
        const newFields = sessions.map((session) => ({
          field: session.sessionType,
          width: 150,
          editable: true,
          sessionId: session.id,
        }));
        setColumnDefs([...columnDefs, ...newFields]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // make a request to get teacherSession table data and populate it in the column for the appropriate session

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/teachers/sessions"
        );
        const teacherSessions = response.data;
        console.log(teacherSessions);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // THIS WORKS - UPDATES THE techers data with the additional time for the associated teacher and teacherSession

  function onCellValueChanged(event) {
    const updatedData = event.data;
    const columnData = event.colDef;
    const sessionId = event.colDef.sessionId;
    const teacherId = event.data.id;
    const colDefField = event.colDef.field;
    const numSessions = updatedData[colDefField];
    console.log(sessionId, teacherId, colDefField, numSessions);
    console.log(event);

    setTeacherSessionId((prevState) => [
      ...prevState,
      { teacherId, sessionId },
    ]);

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

  return (
    <div>
      <div className="table-container">
        <div className="ag-theme-alpine" style={{ height: 400, width: 1150 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onCellValueChanged={onCellValueChanged}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default Allocation;
