interface SessionType {
  id: string;
  sessionType: string;
}

interface Props {
  sessionType: SessionType[];
}

const SessionTypesDataDisplay = (props) => {
  return (
    <div>
      <h2>Session Type Table</h2>
      <table>
        <thead>
          <tr>
            <th>Session Type</th>
            <th>Session Length</th>
          </tr>
        </thead>
        <tbody>
          {props.sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.sessionType}</td>
              <td>{session.sessionLength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionTypesDataDisplay;
