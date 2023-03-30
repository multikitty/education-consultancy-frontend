import Accounting1 from "../public/img/sidebar/Accounting1.svg";
import Accounting2 from "../public/img/sidebar/Accounting2.svg";
import application1 from "../public/img/sidebar/application1.svg";
import application2 from "../public/img/sidebar/application2.svg";
import currency1 from "../public/img/sidebar/currency1.svg";
import currency2 from "../public/img/sidebar/currency2.svg";
import dashboard1 from "../public/img/sidebar/dashboard_1.png";
import dashboard2 from "../public/img/sidebar/dashboard_2.png";
import invoice1 from "../public/img/sidebar/invoice1.svg";
import invoice2 from "../public/img/sidebar/invoice2.svg";
import Leads1 from "../public/img/sidebar/Leads1.svg";
import Leads2 from "../public/img/sidebar/Leads2.svg";
import system_report1 from "../public/img/sidebar/system_report1.svg";
import system_report2 from "../public/img/sidebar/system_report2.svg";
import report1 from "../public/img/sidebar/report1.svg";
import report2 from "../public/img/sidebar/report2.svg";
import setting1 from "../public/img/sidebar/setting1.svg";
import setting2 from "../public/img/sidebar/setting2.svg";
import system1 from "../public/img/sidebar/system1.svg";
import system2 from "../public/img/sidebar/system2.svg";
import University1 from "../public/img/sidebar/University1.svg";
import University2 from "../public/img/sidebar/University2.svg";
import { Home } from "@/pages/dashboard";
import Universitymodule from "./pages/universitymodule/Universitymodule";
import Leadsmodule from "./pages/leads/Leadsmodule";
import ApplicationModule from "./pages/application/ApplicationModule";
import InvoiceManagement from "./pages/InvoiceManagement/InvoiceManagement";
import AccountingSystem from "./pages/Accounting/AccountingSystem";
import ReportsManagement from "./pages/reports/reportsManagement";
import SettingsManagement from "./pages/settings/SettingsManagement";
import CurrencyManagement from "./pages/currency/CurrencyManagement";
import SystemReports from "./pages/SystemReports/SystemReports";
import System from "./pages/systembackup/system";
import ApplicantHome from "./pages/Applicant/ApplicantHome";
import AddProperty from "./pages/settings/AddProperty";
import Properties from "./pages/settings/properties";

const icon = {
  className: "w-5 h-5 xl:w-5 xl:h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        id: "dashboard",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={dashboard1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={dashboard2} />
        ),
        name: "Dashboard",
        path: "/dashboard",
        element: <Home />,
      },
      {
        id: "university",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={University1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={University2} />
        ),
        name: "University module",
        path: "/university_module/",
        element: <Universitymodule />,
      },
      {
        id: "leads",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={Leads1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={Leads2} />
        ),
        name: "Leads Modules",
        path: "/Leadsmodule/*",
        element: <Leadsmodule />,
      },
      {
        id: "application",
        icon1: (
          <img
            style={{ maxWidth: "20px", height: "20px" }}
            src={application1}
          />
        ),
        icon2: (
          <img
            style={{ maxWidth: "20px", height: "20px" }}
            src={application2}
          />
        ),
        name: "Application Management",
        path: "/ApplicationModule/*",
        element: <ApplicationModule />,
      },
      {
        id: "invoice",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={invoice1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={invoice2} />
        ),
        name: "Invoice Management",
        path: "/InvoiceManagement/*",
        element: <InvoiceManagement />,
      },
      {
        id: "accounting",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={Accounting1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={Accounting2} />
        ),
        name: "Accounting System",
        path: "/Accounting/*",
        element: <AccountingSystem />,
      },
      {
        id: "system-reports",
        icon1: (
          <img
            style={{ maxWidth: "20px", height: "20px" }}
            src={system_report1}
          />
        ),
        icon2: (
          <img
            style={{ maxWidth: "20px", height: "20px" }}
            src={system_report2}
          />
        ),
        name: "System Reports",
        path: "/systemReports/*",
        element: <SystemReports />,
      },
      {
        id: "reports",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={report1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={report2} />
        ),
        name: "Reports",
        path: "/reportsManagement/*",
        element: <ReportsManagement />,
      },
      // {
      //   id: "settings",
      //   icon1: (
      //     <img style={{ maxWidth: "20px", height: "20px" }} src={setting1} />
      //   ),
      //   icon2: (
      //     <img style={{ maxWidth: "20px", height: "20px" }} src={setting2} />
      //   ),
      //   name: "Settings",
      //   path: "/settingsManagement/property/:action/:id",
      //   element: <AddProperty />,
      // },
      {
        id: "settings",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={setting1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={setting2} />
        ),
        name: "Settings",
        path: "/settingsManagement/*",
        element: <SettingsManagement />,
      },
      {
        id: "settings1",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={setting1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={setting2} />
        ),
        name: "Settings",
        path: "/settingsManagement/:id",
        element: <SettingsManagement />,
      },
      {
        id: "currency",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={currency1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={currency2} />
        ),
        name: "Currency",
        path: "/CurrencyManagement/*",
        element: <CurrencyManagement />,
      },
      {
        id: "system",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={system1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={system2} />
        ),
        name: "System Backup",
        path: "/system/*",
        element: <System />,
      },
    ],
  },
  {
    layout: "applicant",
    pages: [
      {
        id: "dashboard",
        icon1: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={dashboard1} />
        ),
        icon2: (
          <img style={{ maxWidth: "20px", height: "20px" }} src={dashboard2} />
        ),
        name: "Dashboard",
        path: "/dashboard",
        element: <ApplicantHome />,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ArrowRightOnRectangleIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <UserPlusIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

// export const applicantRoutes = 
// [
// {
//   layout: "applicant",
//   pages: [
//     {
//       id: "dashboard",
//       icon1: (
//         <img style={{ maxWidth: "20px", height: "20px" }} src={dashboard1} />
//       ),
//       icon2: (
//         <img style={{ maxWidth: "20px", height: "20px" }} src={dashboard2} />
//       ),
//       name: "Dashboard",
//       path: "/applicant/dashboard",
//       element: <ApplicantDashboard />,
//     }
//   ]
// }
// ]

export default routes;
