import { Routes, Route } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "./pages/auth";
import { useNavigate } from "react-router-dom";
import ApplicantHome from "./pages/Applicant/ApplicantHome";
import { createContext, useState, useEffect } from "react";
import useWindowSize from "./hooks/useWindowSize";
import { useDispatch } from "react-redux";
import { GetCurrentUser, allListLeads } from "@/redux/actions/actions";
import ApplicantDashboard from "./layouts/ApplicantDashboard";
import SettingsManagement from "./pages/settings/SettingsManagement";
import 'react-toastify/dist/ReactToastify.css';


export const NavbarCtx = createContext();

const initialStatusColor = {
  hot: "#56ba6c",
  cold: "#0263FF",
  warm: "#DB0D4B",
  qualified: "#8E30FF",
};

function App() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [navbar, setNavbar] = useState({
    isMobile: false,
    mobileExpand: false,
    desktopExpand: false,
    overlap: false,
  });
  const windowSize = useWindowSize();
  // Anasite - Edit (statusColor)
  const [statusColor, setStatusColor] = useState(initialStatusColor);

  useEffect(() => {
    if (windowSize === "xl" || windowSize === "2xl") {
      setNavbar({
        isMobile: false,
        mobileExpand: false,
        desktopExpand: true,
        overlap: false,
      });
    } else if (windowSize === "md" || windowSize === "lg") {
      setNavbar({
        isMobile: false,
        mobileExpand: false,
        desktopExpand: false,
        overlap: windowSize === "md",
      });
    } else if (windowSize === "xs" || windowSize === "sm") {
      setNavbar({
        isMobile: true,
        mobileExpand: false,
        desktopExpand: false,
        overlap: true,
      });
    }
    if(!localStorage?.access) navigate("/");
  }, [windowSize]);

  useEffect(() => {
    dispatch(GetCurrentUser({
      name: localStorage.name, 
      role: localStorage.access,
      state: 0
    }));
    dispatch(allListLeads("limit=1000"));

  }, []);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/applicant/*"
        element={
          <NavbarCtx.Provider value={{ navbar, setNavbar, statusColor }}>
            {" "}
            <ApplicantDashboard />{" "}
          </NavbarCtx.Provider>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <NavbarCtx.Provider value={{ navbar, setNavbar, statusColor }}>
            {" "}
            <Dashboard />{" "}
          </NavbarCtx.Provider>
        }
      />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
}

export default App;
