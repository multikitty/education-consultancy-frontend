import { Routes, Route } from "react-router-dom";
import Leads from "./Leads";
import CreateLead from "./CreateLead";
export function Leadsmodule() {
    return (
        <Routes>
            <Route  exact path="/*" element={<Leads />} />
            <Route  path="/createLead" element={<CreateLead />} />
        </Routes>
    )
}

export default Leadsmodule; 