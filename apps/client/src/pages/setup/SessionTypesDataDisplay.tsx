interface SessionType {
  id: string;
  sessionType: string;
}

interface Props {
  sessionType: SessionType[];
}

const SessionTypesDataDisplay = ({ sessionType }: Props) => {
  return (
    <div>
      <h2>Session Type Table</h2>
      <table>
        <thead>
          <tr>
            <th>Sessions</th>
          </tr>
        </thead>
        <tbody>
          {sessionType.map((data: SessionType) => (
            <tr key={data.id}>
              <td>{data.sessionType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionTypesDataDisplay;
