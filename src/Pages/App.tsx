import { Routes, Route, Outlet, Link } from "react-router-dom";
import Shopping from "./Shopping";
import Employees from "./Employees";

function App() {

  return <>
    <Routes>
      <Route path="/" element={<Shopping />} />
      <Route path="/employee" element={<Employees/>}/>
    </Routes>
  </>
}

export default App;
