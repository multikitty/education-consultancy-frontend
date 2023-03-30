import React, { useEffect } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import { Sidenav } from "@/widgets/layout";
import routes from "@/routes";
import CreateAcademic from "@/pages/universitymodule/CreateAcademic";
import CreateUniversity from "@/pages/universitymodule/CreateUniversity";
import CreateInvoice from "@/pages/InvoiceManagement/CreateInvoice";
import CreateMailing from "@/pages/InvoiceManagement/CreateMailing";
import CreateLead from "@/pages/leads/CreateLead";
import { Home } from "@/pages/dashboard";
import { useContext } from "react";
import { NavbarCtx } from "@/App";
import University from "@/pages/universitymodule/University";
import Leads from "@/pages/leads/Leads";
import Academic from "@/pages/universitymodule/Academic";
import AddNewApplication from "@/pages/application/AddNewApplication";
import Applications from "@/pages/application/Applications";
import Currency from "@/pages/currency/currency";
import Profile from "@/pages/settings/profiles";
import Branch from "@/pages/settings/branch";
import System from "@/pages/systembackup/system";
import User from "@/pages/settings/user";
import AddProperty from "@/pages/settings/AddProperty";
import Properties from "@/pages/settings/properties";
import SettingsManagement from "@/pages/settings/SettingsManagement";
// importi
// import Acad
// import Academi
// import Academic from "@pages/"
// import Aca

export const roles = {
  superAdmin: [
    "dashboard",
    "university",
    "leads",
    "application",
    "invoice",
    "accounting",
    "system-reports",
    "reports",
    "settings",
    "currency",
    "system",
  ],
  admin: [
    "dashboard",
    "university",
    "leads",
    "application",
    "invoice",
    "accounting",
    "system-reports",
    "reports",
    "settings",
    "currency",
    "system",
  ],
  counselor: ["dashboard", "university", "leads", "application", "currency"],
  accountant: [
    "dashboard",
    "application",
    "invoice",
    "accounting",
    "reports",
    "currency",
  ],
  adminBranch: [
    "dashboard",
    "university",
    "leads",
    "application",
    "invoice",
    "accounting",
    "reports",
    "currency",
  ],
  counselorBranch: [
    "dashboard",
    "university",
    "leads",
    "application",
    "currency",
  ],
  accountantBranch: [
    "dashboard",
    "application",
    "invoice",
    "accounting",
    "reports",
    "currency",
  ],
  applicant: ["dashboard"],
};

export function Dashboard() {
  const { navbar } = useContext(NavbarCtx);
  // const [name, setName] = React.useState('4');
  const [defaultRoleType, setDefaultRoleType] = React.useState("counselor");
  useEffect(() => {
    let newRole = `${
      localStorage.access !== "user" ? localStorage.access : "counselor"
    }`;
    newRole = newRole.split("");
    // console.log("new Role", newRole);
    newRole[0] = newRole[0].toLowerCase();
    newRole = newRole.join("");
    setDefaultRoleType(newRole);
  }, []);

  return (
    <div className="min-h-screen overflow-y-auto bg-[#E8E9EB]">
      <Sidenav
        routes={routes}
        role={roles[defaultRoleType]}
        lay={"dashboard"}
      />

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
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages
                .filter(({ id }) => {
                  // console.log(
                  //   "Id from dashboard: ",
                  //   id,
                  //   " >> ",
                  //   defaultRoleType,
                  //   " >>> ",
                  //   roles[defaultRoleType]
                  // );
                  return roles[defaultRoleType]?.includes(id);
                })
                .map(({ path, element }) => (
                  <Route path={path} element={element} />
                ))
          )}
          <Route
            path="/university_module/createUniversity"
            element={<CreateUniversity />}
          />
          <Route
            path="/university_module/*/createUniversity"
            element={<CreateUniversity />}
          />
          <Route
            path="/university_module/:action/:id"
            element={<CreateUniversity />}
          />
          <Route path="/Leadsmodule/*/createLead" element={<CreateLead />} />
          <Route path="/Leadsmodule/createLead" element={<CreateLead />} />
          <Route path="/university_module/:id" element={<University />} />
          <Route path="/Leadsmodule/:action/:id" element={<CreateLead />} />
          <Route
            path="/settingsManagement/property/:action/:id/:title"
            element={<AddProperty />}
          />
          ,
          {/* <Route path="/Leadsmodule/:action/:id" element={<CreateLead />} /> */}
          <Route path="/Leadsmodule/:id" element={<Leads />} />
          <Route path="/system/:file" element={<System />} />
          {/* System */}
          <Route
            path="/CurrencyManagement/:action/:id"
            element={<Currency />}
          />
          <Route
            path="/settingsManagement/branch/:action/:id"
            element={<Branch />}
          />
          <Route
            path="/settingsManagement/:id"
            element={<SettingsManagement />}
          />
          {/* <Route path="/settingsManagement/branch" element={<Branch />} /> */}
          <Route
            path="/settingsManagement/user/:action/:id"
            element={<User />}
          />
          <Route path="/settingsManagement/property" element={<Properties />} />
          {/* CreateLead */}
          <Route
            path="/university_module/createAcademic"
            element={<CreateAcademic />}
          />
          <Route
            path="/university_module/*/createAcademic"
            element={<CreateAcademic />}
          />
          <Route
            path="/university_module/*/createAcademic"
            element={<CreateAcademic />}
          />
          <Route
            path="/university_module/a/:action/:id"
            element={<CreateAcademic />}
          />
          <Route path="/university_module/a/:id" element={<Academic />} />
          {/* // */}
          <Route
            path="/ApplicationModule/*/createApplicant"
            element={<AddNewApplication />}
          />
          <Route
            path="/ApplicationModule/createApplicant"
            element={<AddNewApplication />}
          />
          <Route
            path="/ApplicationModule/:action/:id"
            element={<AddNewApplication />}
          />
          <Route path="/ApplicationModule/:id" element={<Applications />} />
          {/* Invoice */}
          <Route
            path="/InvoiceManagement/:action/:id"
            element={<CreateInvoice />}
          />
          <Route
            path="/InvoiceManagement/createInvoice"
            element={<CreateInvoice />}
          />
          <Route
            path="/InvoiceManagement/*/createInvoice"
            element={<CreateInvoice />}
          />
          <Route
            path="/InvoiceManagement/createInvoice/type/:type"
            element={<CreateInvoice />}
          />
          <Route
            path="/InvoiceManagement/type/:type/:action/:id"
            element={<CreateInvoice />}
          />
          <Route
            path="/InvoiceManagement/*/createInvoice/type/:type"
            element={<CreateInvoice />}
          />
          <Route
            path="/InvoiceManagement/*/CreateMailing"
            element={<CreateMailing />}
          />
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
