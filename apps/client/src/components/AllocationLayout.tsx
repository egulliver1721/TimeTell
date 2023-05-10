import { NavLink, Outlet } from "react-router-dom";
import AllocationCommonData from "../pages/allocation/AllocationCommonData";

const AllocationLayout = () => {
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
          Allocation
        </NavLink>
        <NavLink
          to="distribution"
          style={({
            isActive,
          }: {
            isActive: boolean;
          }): React.CSSProperties | undefined =>
            isActive ? activeStyle : undefined
          }
          className="setup-link"
        >
          Distribution
        </NavLink>
      </nav>

      <div className="setup-content">
        <div className="allocation-container">
          <Outlet />
          <AllocationCommonData />
        </div>
      </div>
    </div>
  );
};

export default AllocationLayout;
