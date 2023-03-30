import { Routes, Route } from "react-router-dom";
import Applications from "./Applications";
import AddNewApplication from "./AddNewApplication";
export function ApplicationModule() {
  return (
    <Routes>
      <Route path="/*" element={<Applications />} />
      <Route path="/createApplicant" element={<AddNewApplication />} />
    </Routes>
  );
}

export default ApplicationModule;
