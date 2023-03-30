// import {
//   BanknotesIcon,
//   UserPlusIcon,
//   UserIcon,
//   ChartBarIcon,
// } from "@heroicons/react/24/solid";

import Horizontal from "@/widgets/charts/Horizontal-chart";
import ApexChart from "@/widgets/charts/stackedbar-chart";
import Pie01 from "@/widgets/charts/pie-chart01";
import Pie02 from "@/widgets/charts/pie-chart02";
import Canvas from "@/widgets/charts/Canvas";
import ApexChartBar from "@/widgets/charts/bar-chart";

export const statisticsCardsData = [
  {
    state: 1,
    data: [
      {
        value: "653",
        title: "Total Leads"
      },
      {
        value: "201",
        title: "Total Applications"
      },
      {
        value: "34",
        title: "Number of Universities"
      },
      // {
      //   value: "3,024",
      //   title: "Overall Invoices"
      // },
      {
        value: "$19,216",
        title: "Annual revenue"
      }
    ],
    charts: {
      length: 4,
      data:(
      <>
        <Pie01 />
        <ApexChartBar />
        <Pie02 />
        <Canvas />
      </>
    )},
    revenue: (
      <>
        <Horizontal />
        <ApexChart />
      </>
    )
  },
  {
    state: 2,
    data: [{
      value: "653",
      title: "Total Leads"
    },
    {
      value: "201",
      title: "Total Applications"
    },
    {
      value: "34",
      title: "Number of Universities"
    },
    // {
    //   value: "3,024",
    //   title: "Overall Invoices"
    // },
    {
      value: "$19,216",
      title: "Annual revenue"
    }],  
    charts: {
      length: 4,
      data:(
      <>
        <Pie01 />
        <ApexChartBar />
        <Pie02 />
        <Canvas />
      </>
    )},
    revenue: (
      <>
        <Horizontal />
        <ApexChart />
      </>
    )
  },
  {
    state: 3,
    data: [{
      value: "653",
      title: "Total Leads"
    },
    {
      value: "201",
      title: "Total Applications"
    },
    {
      value: "34",
      title: "Number of Universities"
    },
    ],
    charts: {
      length: 3,
      data:(
      <>
        <Pie01 />
        <Pie02 />
        <Canvas />
      </>
    )},
    revenue: (
      <>
        
      </>
    )
  },
  {
    state: 4,
    data: [
      {
        value: "201",
        title: "Total Applications"
      },
      {
        value: "3,024",
        title: "Overall Invoices"
      },
      {
        value: "$19,216",
        title: "Annual revenue"
      }],
      charts: {
        length: 3,
        data:(
        <>
          <ApexChartBar />
          <Pie02 />
          <Canvas />
        </>
      )},
      revenue: (
        <>
          <Horizontal />
          <Horizontal />
        </>
      )
  },
  {
    state: 5,
    data: [{
      value: "653",
      title: "Total Leads"
    },
    {
      value: "201",
      title: "Total Applications"
    },
    {
      value: "34",
      title: "Number of Universities"
    },
    {
      value: "$19,216",
      title: "Annual revenue"
    }],
    charts: {
      length: 4,
      data:(
      <>
        <Pie01 />
        <ApexChartBar />
        <Pie02 />
        <Canvas />
      </>
    )},
    revenue: (
      <>
        <Horizontal />
        <Horizontal />
      </>
    )
  },
  {
    state: 6,
    data: [{
      value: "653",
      title: "Total Leads"
    },
    {
      value: "201",
      title: "Total Applications"
    },
    {
      value: "34",
      title: "Number of Universities"
    },
    ],
    charts: {
      length: 3,
      data:(
      <>
        <Pie01 />
        <Pie02 />
        <Canvas />
      </>
    )},
    revenue: (
      <>
      </>
    )
  },
  {
    state: 7,
    data: [
      {
        value: "201",
        title: "Total Applications"
      },
      {
        value: "3,024",
        title: "Overall Invoices"
      },
      {
        value: "$19,216",
        title: "Annual revenue"
      }],
      charts: {
        length: 2,
        data:(
        <>
          <Pie02 />
          <Canvas />
        </>
      )},
      revenue: (
        <>
          <Horizontal />
          <Horizontal />
        </>
      )
  }

];

export default statisticsCardsData