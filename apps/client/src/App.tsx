import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Teachers from "./pages/teachers/Teachers";
import Provision from "./pages/Provision";
import AllocationLayout from "./components/AllocationLayout";
import Allocation from "./pages/allocation/Allocation";
import Distribution from "./pages/allocation/Distribution";
import Scheduling from "./pages/Scheduling";
import Print from "./pages/Print";
import SetupLayout from "./components/SetupLayout";
import Roles from "./pages/setup/Roles";
import YearGroups from "./pages/setup/YearGroups";
import Classes from "./pages/setup/Classes";
import SessionTypes from "./pages/setup/SessionTypes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="setup" element={<SetupLayout />}>
            <Route index element={<Roles />} />
            <Route path="yeargroups" element={<YearGroups />} />
            <Route path="classes" element={<Classes />} />
            <Route path="sessiontypes" element={<SessionTypes />} />
          </Route>

          <Route path="teachers" element={<Teachers />} />
          {/* <Route path="provision" element={<Provision />} /> */}
          <Route path="allocation" element={<AllocationLayout />}>
            <Route index element={<Allocation />} />
            <Route path="distribution" element={<Distribution />} />
          </Route>
          <Route path="scheduling" element={<Scheduling />} />
          <Route path="print" element={<Print />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
