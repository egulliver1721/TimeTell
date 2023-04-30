interface ClassData {
  id: string;
  className: string;
}

interface Props {
  classData: ClassData[];
}

const ClassDataDisplay = ({ classData }: Props) => {
  return (
    <div>
      <h2>Classes Table</h2>
      <table>
        <thead>
          <tr>
            <th>Classes</th>
          </tr>
        </thead>
        <tbody>
          {classData.map((data: ClassData) => (
            <tr key={data.id}>
              <td>{data.className}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassDataDisplay;
