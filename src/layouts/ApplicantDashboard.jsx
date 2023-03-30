import ApplicantHome from "@/pages/Applicant/Applicant";
import { useContext } from "react";
import { NavbarCtx } from "@/App";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import routes from "@/routes";
import { Sidenav } from "@/widgets/layout";
import { roles } from "./dashboard";

const ApplicantDashboard = () => {
  const { navbar } = useContext(NavbarCtx);

  return (
    <div className="min-h-screen overflow-y-auto bg-[#E8E9EB]">
      <Sidenav routes={routes} role={roles["applicant"]} lay={"applicant"} />
      <div
        className={`bg-[#E8E9EB] p-8 pr-0 ${
          (navbar.isMobile && navbar.mobileExpand && !navbar.overlap) ||
          (!navbar.isMobile && !navbar.desktopExpand && !navbar.overlap) ||
          (!navbar.isMobile && navbar.desktopExpand && navbar.overlap) ||
          (!navbar.isMobile && !navbar.desktopExpand && navbar.overlap)
            ? "ml-[100px]"
            : (!navbar.isMobile && navbar.desktopExpand && !navbar.overlap) ||
              (!navbar.isMobile && navbar.desktopExpand && navbar.overlap)
            ? "ml-[350px]"
            : "ml-0"
        }`}
      >
        <Routes>
          <Route path="/" element={<ApplicantHome />} />
          {routes.map(
            ({ layout, pages }) =>
              layout === "applicant" &&
              pages
                .filter(({ id }) => roles["applicant"].includes(id))
                .map(({ path, element }) => (
                  <Route path={path} element={element} />
                ))
          )}
        </Routes>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
