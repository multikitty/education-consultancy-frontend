import React from "react";
import { Button } from "@material-tailwind/react/components/Button";
import applicationCardData from "@/data/application-data";
import tableCardData from "@/data/table-data copy";
import nametableCardData from "@/data/nametable-data";
import { statisticsCardsData } from "@/data";
import { StatisticsCard } from "@/widgets/cards";
import { listProgramms, allListLeads,  filterProgramms, listUniversities, listApplications, listSales } from "@/redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function Home() {
  const [state, setState] = React.useState(1);
  const navigate = useNavigate();
  const disptach = useDispatch();

  const programmsData = useSelector(
    (state) => state?.universitiesReducer?.programms
  );

  const applicationsData = useSelector(
    (state) => state?.universitiesReducer?.applications
  );

  const universitiesData = useSelector(
    (state) => state?.universitiesReducer?.universities
  );

  const leadsData = useSelector((state) => state?.universitiesReducer?.allLeads);

  const { sales } = useSelector((state) => state?.universitiesReducer);



  if (localStorage.access === "leads") navigate('/applicant');

  React.useState(() => {
    disptach(listApplications("limit=1000"));
    disptach(listProgramms("limit=1000"));
    disptach(allListLeads("limit=1000"));
    disptach(listUniversities("limit=1000"));
    disptach(listSales("limit=5"));

    if (localStorage.access === "leads") navigate('/applicant');
    switch (localStorage.access) {
      case 'superAdmin': setState(1); break;
      case 'admin': setState(2); break;
      case 'counselor': setState(3); break;
      case 'accountant': setState(4); break;
      case 'adminBranch': setState(5); break;
      case 'counselorBranch': setState(6); break;
      case 'accountantBranch': setState(7); break;
    }
  }, []);

  return (
    <div className="mt-12 w-full font-display">
      <div className="my-10 grid grid-cols-1">
        <p className=" text-4xl font-semibold text-[#280559] mb-2">Dashboard</p>
        <p className=" font text-sm  text-[#9898A3] xl:text-base">
          View all status from the dashboard
        </p>
      </div>
      {statisticsCardsData.map((item, id) =>
        item.state === state &&
        (
          <div key={id} className={`mb-12 mr-10 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-${item.data.length} xl:grid-cols-${item.data.length} 2xl:grid-cols-${item.data.length}`} >
            {item.data.map(items => <StatisticsCard key={items.title} value={items.value} title={items.title} />)}
          </div>
        )
      )}

      {statisticsCardsData.map((item, id) =>
        item.state === state &&
        <div key={id} className={`mb-5 mr-10 grid grid-cols-1 gap-y-12 gap-x-6 lg:items-center xl:grid-cols-${item.charts.length}`}>
          {item.charts.data}
        </div>
      )}
      <div className={` mb-5 mr-10 grid grid-cols-1 gap-y-12 gap-x-6 2xl:grid-cols-3 laptop:grid-cols-3`}>
        {
          statisticsCardsData.map((item, id) =>
            item.state === state &&
            <React.Fragment key={id}>
              {
                item.revenue
              }
            </React.Fragment>
          )
        }

        {nametableCardData.map((part) => (
          part.state === state &&
          part.data.map(items =>
            <div key={items.subject} className="rounded-xl bg-white p-8">
              <div className=" flex flex-row items-center justify-between mb-3">
                <p className="w-1/2 px-3 text-base font-medium text-black antialiased xl:text-xl">
                  {items.subject}
                </p>
                <Button
                  variant="outlined"
                  className="h-[46px] w-[115px] justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                  fullWidth
                  onClick={() => {
                    items.subject === "University" && navigate('/dashboard/university_module')
                    items.subject === "Leads" && navigate('/dashboard/Leadsmodule')
                    items.subject === "Programs" && navigate('/dashboard/ApplicationModule')
                  }
                  }
                >
                  <p className="px-3 text-center text-base font-medium normal-case">
                    View All
                  </p>
                </Button>
              </div>
              <div className="flex flex-col w-full overflow-x-auto">
                <table className="w-full border-none">
                  <thead>
                    <tr>
                      <td className=" w-full px-3 text-sm font-medium  text-[#92929D] xl:text-base py-3">
                        {items.name}
                      </td>

                      <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                        Action
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {(items.subject === "Programs" && programmsData) &&
                      programmsData?.data?.faqs?.map((item, id) => (
                        id < 5 &&
                        <tr key={id}>
                          <td className="w-[320px] px-3 text-sm font-medium text-black xl:text-lg my-3">
                            {item.name}
                          </td>

                          <td className="px-3">
                            <Button
                              variant="outlined"
                              className="h-[28px] w-[78px] px-3 ml-auto my-3 items-center justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                              fullWidth
                            >
                              <p className="text-center text-xs font-medium normal-case">
                                View
                              </p>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    {(items.subject === "Leads" && leadsData) &&
                      leadsData?.data?.faqs?.map((item, id) => (
                        id < 5 &&
                        <tr key={id}>
                          <td className="w-[320px] px-3 text-sm font-medium text-black xl:text-lg my-3">
                            {item.name}
                          </td>

                          <td className="px-3">
                            <Button
                              variant="outlined"
                              className="h-[28px] w-[78px] px-3 ml-auto my-3 items-center justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                              fullWidth
                            >
                              <p className="text-center text-xs font-medium normal-case">
                                View
                              </p>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    {(items.subject === "University" && universitiesData) &&
                      universitiesData?.data?.faqs?.map((item, id) => (
                        id < 5 &&
                        <tr key={id}>
                          <td className="w-[320px] px-3 text-sm font-medium text-black xl:text-lg my-3">
                            {item.name}
                          </td>

                          <td className="px-3">
                            <Button
                              variant="outlined"
                              className="h-[28px] w-[78px] px-3 ml-auto my-3 items-center justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                              fullWidth
                            >
                              <p className="text-center text-xs font-medium normal-case">
                                View
                              </p>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>


              <div className="hidden my-5 flex-row items-center justify-between gap-4">
                <p className=" w-[320px] text-sm font-medium text-[#92929D] xl:text-base">
                  {items.name}
                </p>
                <p className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base">
                  Action
                </p>
              </div>
            </div>
          )
        ))}

        {
          state !== 5 &&
          <div className="rounded-xl bg-white p-8">
            <div className=" flex flex-row items-center justify-between mb-3">
              <p className="w-1/2 px-3 text-base font-medium text-black antialiased xl:text-xl">
                Application
              </p>
              <Button
                variant="outlined"
                className="px-3 h-[46px] w-[115px] justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                fullWidth
                onClick={() => {
                  navigate('/dashboard/ApplicationModule')
                }
                }
              >
                <p className="text-center text-base font-medium normal-case">
                  View All
                </p>
              </Button>
            </div>
            <div className="flex flex-col w-full overflow-x-auto sm:overflow-hidden laptop:overflow-x-auto">
              <table className="w-full border-none">
                <thead>
                  <tr>
                    <td className="whitespace-nowrap w-full md:w-[250px] 2xl:w-[150px] laptop:w-[250px] px-3 text-sm font-medium  text-[#92929D] xl:text-base py-3">
                      University Name
                    </td>

                    <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                      Status
                    </td>

                    <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {applicationsData?.data?.faqs?.map((item, id) => (
                    id < 10 &&
                    <tr key={id}>
                      <td className="block whitespace-nowrap overflow-hidden w-full md:w-[250px] 2xl:w-[150px] laptop:w-[250px] px-3 text-sm font-medium text-black xl:text-lg my-3 text-ellipsis">
                        {item.fullName}
                      </td>
                      <td className="px-3">
                        <p
                          className="mx-auto w-fit rounded-[100px] px-5 py-2 text-center text-xs font-medium normal-case"
                          style={{
                            color: `${item.color}`,
                            backgroundColor: `${item.color}10`,
                          }}
                        >
                          {item.status}
                        </p>
                      </td>
                      <td className="px-3">
                        <Button
                          variant="outlined"
                          className="h-[28px] mx-auto w-[78px] px-3 ml-auto my-3 items-center justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                          fullWidth
                        >
                          <p className="text-center text-xs font-medium normal-case">
                            View
                          </p>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>


      {tableCardData.map((item, id) => (
        item.state === state &&
        <div className={`mb-5 mr-10 grid grid-cols-1 gap-y-12 gap-x-6 laptop:grid-cols-${item.data.length} xl:grid-cols-${item.data.length}`} key={id}>
          {item.data.map(data =>
            <div key={data.subject} className="rounded-xl bg-white p-8">
              <div className=" flex flex-row items-center justify-between mb-3">
                <p className="w-1/2 px-3 text-base font-medium text-black antialiased xl:text-xl">
                  {data.subject}
                </p>
                <Button
                  variant="outlined"
                  className=" h-[46px] w-[115px] rounded-[15px] border border-[#280559] p-0 text-[#280559] hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                  fullWidth
                  onClick={() => {
                    data.subject === "Commission Invoice" && navigate('/dashboard/InvoiceManagement')
                    data.subject === "General Invoice" && navigate('/dashboard/InvoiceManagement')
                    data.subject === "Accounting" && navigate('/dashboard/Accounting')
                  }
                  }
                >
                  <p className=" text-center text-base font-medium normal-case">
                    View All
                  </p>
                </Button>
              </div>

              <div className="flex flex-col w-full overflow-x-auto">
                <table className="w-full border-none">
                  <thead>
                    <tr>
                      <td className=" w-[200px] px-3 text-sm font-medium  text-[#92929D] xl:text-base py-3">
                        Recipient
                      </td>
                      <td className="w-[85px] px-3 text-left text-sm normal-case text-[#92929D] xl:text-base py-3">
                        Amount
                      </td>
                      <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                        Action
                      </td>
                      <td className="w-[78px] px-3 text-center text-sm normal-case text-[#92929D] xl:text-base py-3">
                        Action
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tablelist.map((item) => (
                      <tr key={item.name}>
                        <td className="whitespace-nowrap w-[200px] px-3 text-sm font-medium text-black xl:text-lg my-3">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap w-[200px] px-3 text-sm font-medium text-black xl:text-lg my-3">
                          {item.amount}
                        </td>
                        <td className="px-3">
                          <p
                            className="mx-auto w-fit rounded-[100px] px-5 py-2 text-center text-xs font-medium normal-case"
                            style={{
                              color: `${item.color}`,
                              backgroundColor: `${item.color}10`,
                            }}
                          >
                            {item.status}
                          </p>
                        </td>
                        <td className="px-3">
                          <Button
                            variant="outlined"
                            className="h-[28px] mx-auto w-[78px] px-3 ml-auto my-3 items-center justify-center rounded-[15px] border border-[#280559] text-[#280559] p-0 hover:bg-[#280559] hover:text-white hover:opacity-100 ease-in"
                            fullWidth
                          >
                            <p className="text-center text-xs font-medium normal-case">
                              View
                            </p>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
