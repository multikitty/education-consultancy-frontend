import { useDispatch, useSelector } from "react-redux";
import { ENV } from "@/config";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
const Paginate = ({ pagination, method }) => {
  // console.log("pagination", pagination);
  const dispatch = useDispatch();
  const onPageClick = (pageNo) => {
    // console.log("onPaginate", pagination);
    const { limit } = pagination;
    let qs = ENV.objectToQueryString({
      page: +pageNo,
      limit: limit,
    });
    // console.log("qqqqqqqqqqqs", qs);
    dispatch(method(qs));
  };
  const onPaginate = (action) => {
    // console.log("onPaginate", pagination);
    const { page, limit } = pagination;
    let qs = ENV.objectToQueryString({
      page: action == "inc" ? page + 1 : page - 1,
      limit: limit,
    });
    // console.log("qqqqqqqqqqqs", qs);
    dispatch(method(qs));
  };
  // console.log("paginationnnnnnnn", pagination);
  // Anasite -Edit Fixing Pagination
  let NoOfPages = [];
  NoOfPages.length = pagination
    ? Math.ceil(pagination?.total / pagination?.limit)
    : 0;
  NoOfPages.fill(0);
  // console.log("HEYYY", NoOfPages);
  return (
    <>
      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[20px] bg-[#F8F9FB] py-4 px-6 md:flex-row md:gap-0">
        <p className="px-5 text-base text-[#92929D]">
          <span className="text-[#280559]">{`${
            pagination?.limit * pagination?.page - pagination?.limit + 1
          }`}</span>
          {`- ${
            pagination?.limit * pagination?.page < pagination?.total
              ? pagination?.limit * pagination?.page
              : pagination?.total
          } of ${pagination?.total}`}
        </p>
        <div className="flex flex-row items-center justify-center">
          <p className="mr-3 text-base text-[#92929D]">The page you’re on</p>
          <div className=" mr-2 w-[77px]">
            <Menu>
              <MenuHandler>
                <button className="flex h-[40px] w-[77px] flex-row items-center justify-center rounded-2xl border-[1px] border-[#cbd2dc]/50 bg-white shadow-md">
                  <p className="mx-3 font-medium text-[#280559]">{`${pagination?.page}`}</p>
                  {/* <img src={dropdown}/> */}
                </button>
              </MenuHandler>
              {/* Anasite - Edits To Be Done  */}
              <MenuList>
                {NoOfPages?.map((page, i) => (
                  <MenuItem
                    key={page + i + Math.pow(page + i, 2)}
                    onClick={() => onPageClick(i + 1)}
                    style={
                      i + 1 === pagination?.page
                        ? {
                            backgroundColor: "rgb(40 5 89 / 0.8)",
                            color: "white",
                            pointerEvents: "none",
                          }
                        : {}
                    }
                  >
                    {i + 1}
                  </MenuItem>
                ))}

                {/* <MenuItem onClick={() => onPageClick(2)}>2</MenuItem> */}
                {/* <MenuItem>3</MenuItem>
                <MenuItem>4</MenuItem>
                <MenuItem>5</MenuItem> */}
              </MenuList>
            </Menu>
          </div>
          <button
            disabled={pagination?.page <= 1 ? true : false}
            className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-[#cbd2dc]/50 shadow-md"
            onClick={() => onPaginate("dec")}
          >
            <svg
              width={24}
              height={24}
              stroke="#280559"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </button>
          <button
            disabled={pagination?.page > pagination?.pages}
            onClick={() => onPaginate("inc")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-[1px] border-[#cbd2dc]/50 shadow-md"
          >
            <svg
              width={24}
              height={24}
              stroke="#280559"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Paginate;
