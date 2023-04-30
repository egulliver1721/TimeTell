import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Link className="sidebar-link" to="dashboard">
        Dashboard
      </Link>
      <Link className="sidebar-link" to="setup">
        Setup
      </Link>
      <Link className="sidebar-link" to="teachers">
        Teachers
      </Link>
      <Link className="sidebar-link" to="provision">
        Provision
      </Link>
      <Link className="sidebar-link" to="allocation">
        Allocation
      </Link>
      <Link className="sidebar-link" to="scheduling">
        Scheduling
      </Link>
      <Link className="sidebar-link" to="print">
        Printing
      </Link>
    </div>
  );
};

export default Sidebar;
