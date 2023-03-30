import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import menuIcon from "../../../public/img/menuIcon.svg";
import { Typography } from "@material-tailwind/react/components/Typography";
import { useNavigate } from "react-router-dom";
import userpt from "../../../public/img/sidebar/userpt.png";
import logout from "../../../public/img/sidebar/logout.svg";
import menu from "../../../public/img/burger-2.png";
import { NavbarCtx } from "@/App";
import { ENV } from "@/config";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from '../../redux/actions/actions';
import bubble from '../../../public/img/bubble.png'
import LeadData from "@/data/lead-table-props";
export function Sidenav({ brandImg, brandName, routes, role, lay }) {
  const { navbar, setNavbar } = useContext(NavbarCtx);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const Navigate = useNavigate();
  const leadsData = useSelector((state) => state?.universitiesReducer?.allLeads);
  const current_user = useSelector(state => state?.universitiesReducer?.current_users?.data?.dataValues);

  useEffect(() => {
    let count1 = 0;
    leadsData?.data?.faqs?.map((item, id) => {
      if(item.createdAt === item.updatedAt) {
        count1++;
      } 
    })
    setCount(count1);
  }, [leadsData]);

  return (
    <>
      {navbar.isMobile ? (
        <div
          onClick={() =>
            setNavbar((prev) => ({ ...prev, mobileExpand: !prev.mobileExpand }))
          }
          className="block p-4"
        >
          <img src={menu} />
        </div>
      ) : null}
      {!navbar.isMobile || (navbar.isMobile && navbar.mobileExpand) ? (
        <aside
          className={`fixed inset-0 z-50 flex h-screen flex-col ${
            (!navbar.isMobile && navbar.desktopExpand) ||
            (navbar.isMobile && navbar.mobileExpand)
              ? "w-[350px]"
              : "w-[100px]"
          } rounded-r-xl bg-[#280559] transition-transform duration-300`}
        >
          <div className="mb-4 flex">
            <button
              className="ml-7 mr-2 pt-4"
              onClick={() =>
                navbar.isMobile
                  ? setNavbar((prev) => ({
                      ...prev,
                      mobileExpand: !prev.mobileExpand,
                    }))
                  : setNavbar((prev) => ({
                      ...prev,
                      desktopExpand: !prev.desktopExpand,
                    }))
              }
            >
              <img src={menuIcon} className="mx-5 ml-0 h-[18px] w-[27px]" />
            </button>
            <div className="flex items-center justify-center pt-4">
              <img
                src={brandImg}
                className={`h-[45px] w-[192px] ${
                  (!navbar.isMobile && navbar.desktopExpand) ||
                  (navbar.isMobile && navbar.mobileExpand)
                    ? "block"
                    : "hidden"
                }`}
              />
            </div>
          </div>

          <div className="mx-0 mb-6 flex-1 overflow-hidden py-5">
            <p
              className={`pl-6 pb-4 font-semibold text-white ${
                (!navbar.isMobile && navbar.desktopExpand) ||
                (navbar.isMobile && navbar.mobileExpand)
                  ? "block"
                  : "hidden"
              }`}
            >
              {brandName}
            </p>
            <div className="box-content flex h-full w-full flex-col justify-between gap-6 overflow-y-scroll pr-[17px]">
              {routes.map(
                ({ layout, title, pages }, key) =>
                  layout === lay && (
                    <ul
                      key={key}
                      className="relative mb-4 flex flex-col items-center gap-1"
                    >
                      {title && (
                        <li className="mx-3.5 mt-4 mb-2">
                          <Typography
                            variant="small"
                            className="font-black uppercase opacity-75"
                          >
                            {title}
                          </Typography>
                        </li>
                      )}
                      {pages
                        .filter(({ id }) => role?.includes(id))
                        .map(({ id, icon1, icon2, name, path }) => (
                          <li className="relative w-full px-6" key={name}>
                            <NavLink to={`/${layout}${path}`}>
                              {({ isActive }) => (
                                <div className="flex items-center">
                                  <div
                                    className={`${
                                      isActive ? "" : "hidden"
                                    } absolute left-0 h-8 w-[3px] rounded-sm bg-white`}
                                  />
                                  <div
                                    className={`bg-${
                                      isActive ? "[#E6EFF3]" : ""
                                    } flex w-full items-center ${
                                      (!navbar.isMobile &&
                                        navbar.desktopExpand) ||
                                      (navbar.isMobile && navbar.mobileExpand)
                                        ? "justify-start"
                                        : "justify-center"
                                    } rounded-2xl py-5 px-7 capitalize `}
                                    style={{
                                      backgroundColor: isActive
                                        ? "#E6EFF3"
                                        : "",
                                    }}
                                  >
                                    {isActive ? icon2 : icon1}
                                    <div
                                      className={`mx-4 text-base capitalize ${
                                        (!navbar.isMobile &&
                                          navbar.desktopExpand) ||
                                        (navbar.isMobile && navbar.mobileExpand)
                                          ? "flex"
                                          : "hidden"
                                      } font-bold`}
                                      style={{
                                        color: isActive ? "#280559" : "#E6EFF3",
                                      }}
                                    >
                                      {name}
                                    </div>
                                  </div>
                                </div>
                          )}
                        </NavLink>
                        {id === "leads" && !navbar.isMobile && !navbar.desktopExpand ? (<img width={12} className="absolute bottom-4 right-7" src={bubble} />) : id === "leads" ? (
                          <span className="font-500 absolute right-10 -translate-y-1/2 top-1/2 h-[28px] w-[40px] rounded-[20px] bg-[#DB0D4B] p-1 text-center text-[14px] text-white">
                            {
                              count
                            }
                          </span>
                        ) : <></>}
                      </li>
                    ))}
                </ul>
              ))}
              <div className="flex justify-around py-5">
                <div className="flex flex-row">
                  <img src={
                    (current_user?.image &&
                      `${ENV.imageUrl}${current_user?.image}`) ||
                      userpt} onClick={() => Navigate('/dashboard/profile')} style={{ cursor: "pointer", width: 55, height: 55, borderRadius: "50%" }} />
                  <div className={`left-5 mx-5 break-words w-[145px] ${(!navbar.isMobile && navbar.desktopExpand) || (navbar.isMobile && navbar.mobileExpand) ? 'block' : 'hidden'}`}>
                    <p className={` text-white ${(!navbar.isMobile && navbar.desktopExpand) || (navbar.isMobile && navbar.mobileExpand) ? 'block' : 'hidden'}`}>{
                      current_user && current_user?.email
                    }</p>
                    <p className={`text-[#AAABAF] ${(!navbar.isMobile && navbar.desktopExpand) || (navbar.isMobile && navbar.mobileExpand) ? 'block' : 'hidden'}`}>
                      {current_user && current_user?.name}
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="center flex items-center"
                    onClick={() =>
                      dispatch(
                        signOut({
                          name: localStorage.name,
                          role: localStorage.access,
                        })
                      )
                    }
                  >
                    <img
                      className={`ml-6  ${
                        (!navbar.isMobile && navbar.desktopExpand) ||
                        (navbar.isMobile && navbar.mobileExpand)
                          ? "block"
                          : "hidden"
                      }`}
                      src={logout}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo.svg",
  brandName: "MENU",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
