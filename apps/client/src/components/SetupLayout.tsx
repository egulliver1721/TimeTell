import { NavLink, Outlet } from "react-router-dom";

const SetupLayout = () => {
  const activeStyle: React.CSSProperties = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#161616",
  };

  return (
    <div className="setup-container">
      <nav>
        <NavLink
          end
          to="."
          style={({
            isActive,
          }: {
            isActive: boolean;
          }): React.CSSProperties | undefined =>
            isActive ? activeStyle : undefined
          }
          className="setup-link"
        >
          Roles
        </NavLink>
        <NavLink
          to="yeargroups"
          style={({
            isActive,
          }: {
            isActive: boolean;
          }): React.CSSProperties | undefined =>
            isActive ? activeStyle : undefined
          }
          className="setup-link"
        >
          Year Groups
        </NavLink>
        <NavLink
          to="classes"
          style={({
            isActive,
          }: {
            isActive: boolean;
          }): React.CSSProperties | undefined =>
            isActive ? activeStyle : undefined
          }
          className="setup-link"
        >
          Classes
        </NavLink>
        <NavLink
          to="sessiontypes"
          style={({
            isActive,
          }: {
            isActive: boolean;
          }): React.CSSProperties | undefined =>
            isActive ? activeStyle : undefined
          }
          className="setup-link"
        >
          Session Types
        </NavLink>
      </nav>

      <div className="setup-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SetupLayout;
