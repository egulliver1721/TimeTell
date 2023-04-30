interface YearData {
  id: string;
  yearGroup: string;
}

interface Props {
  yearGroup: YearData[];
}

const YearGroupDataDisplay = ({ yearGroup }: Props) => {
  return (
    <div>
      <h2>Year Group Table</h2>
      <table>
        <thead>
          <tr>
            <th>Year Group</th>
          </tr>
        </thead>
        <tbody>
          {yearGroup.map((year: YearData) => (
            <tr key={year.id}>
              <td>{year.yearGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YearGroupDataDisplay;
