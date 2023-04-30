import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="layout-container">
        <div className="outlet-container">
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
