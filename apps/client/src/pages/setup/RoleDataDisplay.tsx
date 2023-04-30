interface Role {
  id: string;
  roleType: string;
  roleCode: string;
}

interface Props {
  roles: Role[];
}

const RoleDataDisplay = ({ roles }: Props) => {
  return (
    <div>
      <h2>Role Table</h2>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Role Code</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role: Role) => (
            <tr key={role.id}>
              <td>{role.roleType}</td>
              <td>{role.roleCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleDataDisplay;
