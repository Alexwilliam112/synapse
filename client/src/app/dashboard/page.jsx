"use client";
// import React from "react";
// import Navbar from "../components/Navbar"
// import Graph from "../components/Graph"
// import RadialGraph from "../components/RadialGraph"
import LineGraph from "../../components/temppresent/LineGraph";
import AreaChart from "../../components/temppresent/AreaChart";
import DonutGraph from "../../components/temppresent/DonutGraph";
import BarChart from "../../components/BarChart";
import RadarChart from "@/components/RadarChart";

import { Clock2, TriangleAlert, LayoutList } from "lucide-react";
import { useQuery } from "@apollo/client";
import { getChartsData, getFilter } from "@/queries";
import { useState } from "react";

const Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [process, setProcess] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("");
  const [person, setPerson] = useState("");

  const { loading, error, data } = useQuery(getFilter);
  const {
    loading: loadingCharts,
    error: errorCharts,
    data: dataCharts,
  } = useQuery(getChartsData, {
    variables: {
      input: {
        startDate,
        process,
        person,
        endDate,
        department,
      },
    },
    fetchPolicy: "no-cache",
  });

  const resultPerson = data?.GetFilters?.data?.persons;
  const resultProcesses = data?.GetFilters?.data?.processes;
  const resultDepartments = data?.GetFilters?.data?.departments;

  const chartsData = dataCharts?.GetDashboardCharts?.data || {};

  const averageConformanceByProcess_lineChart =
    chartsData?.averageConformanceByProcess_lineChart;
  const averageConformance_areaChart = chartsData?.averageConformance_areaChart;
  const overallConformance_pieChart = chartsData?.overallConformance_pieChart;
  const topTenTable = chartsData?.topTenTable || [];

  console.log(overallConformance_pieChart, "<<<<,");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission if necessary
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      {/* Navbar */}
      {/* <Navbar /> */}
      <div className="flex min-h-screen w-full flex-col bg-[#F7F7F7]">
        {/* <p>{JSON.stringify(data?.GetFilters?.data)}</p> */}

        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h2 className="text-2xl font-light mb-6">Filter</h2>
                <form className="lg:flex gap-5 items-center">
                  <div>
                    <label
                      htmlFor="department"
                      className="form-control w-auto max-w-xs lg:w-48"
                    >
                      <div className="label">
                        <span className="label-text">Department</span>
                      </div>
                      <select
                        id="department"
                        name="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="select select-bordered"
                      >
                        <option value="" disabled selected>
                          Select option
                        </option>
                        {resultDepartments.map((el, idx) => (
                          <option key={idx} value="">
                            {el}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="person"
                      className="form-control w-auto max-w-xs lg:w-48"
                    >

                      <div className="label">
                        <span className="label-text">Person</span>
                      </div>
                      <select
                        id="person"
                        name="person"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        className="select select-bordered"
                      >
                        <option value="" disabled selected>
                          Select option
                        </option>
                        {resultPerson.map((el, idx) => (
                          <option key={idx} value="">
                            {el}
                          </option>
                        ))}
                        {/* Add options here */}
                      </select>
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="process"
                      className="form-control w-auto max-w-xs lg:w-48"
                    >

                      <div className="label">
                        <span className="label-text">Process</span>
                      </div>
                      <select
                        id="process"
                        name="process"
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                        className="select select-bordered"
                      >
                        <option value="" disabled selected>
                          Select option
                        </option>
                        {resultProcesses.map((el, idx) => (
                          <option key={idx} value="">
                            {el}
                          </option>
                        ))}
                        {/* Add options here */}
                      </select>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="startDate"
                      className="form-control w-full max-w-xs"
                    >
                      <div className="label">
                        <span className="label-text">Start Date</span>
                      </div>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="form-control w-full max-w-xs"
                    >
                      <div className="label">
                        <span className="label-text">End Date</span>
                      </div>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                  </div>


                </form>
                <div className="flex justify-end px-5 mt-5">
                  <button
                    type="submit"
                    className="btn btn-[#6E8672] "
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="sm:col-span-2 p-6 bg-[#F1F2F2] border-2 border-[#6E8672] rounded-lg shadow">
                  <div className="pb-6 flex justify-between">
                    <div>
                      <h2 className="font-">Nganu Technology & Consultant</h2>
                      <p className="text-sm font-light">
                        Good Morning, Rayhan Wijaya.
                      </p>
                      <p className="text-sm font-light">
                        Lets take a look at you company performance!
                      </p>
                    </div>
                    <div>
                      <button className="btn bg-[#6E8672] text-white hover:text-[#6E8672]">
                        Diagram
                      </button>
                    </div>
                  </div>
                  <div className="w-auto flex items-center h-auto space-x-8">
                    <div className="w-48 sm:w-32 h-auto">
                      <DonutGraph data={overallConformance_pieChart} />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-light text-sm flex items-center">
                          <Clock2 className="w-4 h-4 text-[#6E8672] font-light mr-1" />{" "}
                          Ontime Process
                        </p>
                        <p className="text-5xl">
                          {overallConformance_pieChart?.ontime}%
                        </p>
                      </div>
                      <div>
                        <p className="font-light text-sm flex items-center">
                          <TriangleAlert className="w-4 h-4 text-[#8DB093] font-light mr-1" />
                          Non-Conformance
                        </p>
                        <p className="text-5xl">
                          {overallConformance_pieChart?.nonConform}%
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <button className="bg-[#6E8672] text-white px-4 py-2 rounded-lg">Create New Order</button>
                  </div> */}
                </div>
                <div className="p-6 bg-white rounded-lg shadow sm:col-span-2">
                  <div className="pb-2">
                    <p className="text-sm text-gray-600">
                      Average Conformance Rate
                    </p>
                    {/* <h2 className="text-4xl">$1,329</h2> */}
                  </div>
                  <AreaChart data={averageConformance_areaChart} />
                </div>
              </div>
              <div>
                {/* <div className="flex items-center">
                  <div className="ml-auto flex items-center gap-2">
                    <button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </button>
                    <button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                      <span className="sr-only sm:not-sr-only">Export</span>
                    </button>
                  </div>
                </div> */}
                <div className="p-6 bg-white rounded-lg shadow">
                  <div className="px-7">
                    <h2 className="font-semibold">
                      Average Conformance per Process
                    </h2>
                    <p className="text-sm text-gray-600">
                      Recapitulate every process on this graph.
                    </p>
                  </div>
                  <div className="w-full flex h-72">
                    <div className="h-auto w-full">
                      <LineGraph data={averageConformanceByProcess_lineChart} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-hidden p-6 bg-white rounded-lg shadow">
                {/*<div className="flex flex-row items-start p-4">
                   <div className="grid gap-0.5">
                    <div className="group flex items-center gap-2 text-lg font-light">
                      Average Conformance Rate
                    </div>
                    <div className="text-sm text-gray-600">Timespan: YTD</div>
                  </div> 
                   <div className="ml-auto flex items-center gap-1">
                    <button size="sm" variant="outline" className="h-8 gap-1">
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Track Order</span>
                    </button>
                    <button size="icon" variant="outline" className="h-8 w-8">
                      <span className="sr-only">More</span>
                    </button>
                  </div> 
                </div>*/}
                {/* <div className="p-6 text-sm">
                  // {/* <AreaChart /> 
                </div> */}
                {/* <div className="flex flex-row items-center border-t bg-[#6E8672] text-white rounded-md px-6 py-3">
                  <div className="text-xs ">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                </div> */}
                <BarChart />
                <RadarChart />
                <div className="">
                  <h1 className="flex items-center">
                    <LayoutList className="w-4 h-4 font-light mr-2" /> Top 10
                    Non Conform
                  </h1>
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr className="">
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Avg. Overdue</th>
                          <th>Conformance Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topTenTable.map((row, index) => (
                          <tr key={index} className="hover">
                            <th>{row.rank}</th>
                            <td>{row.name}</td>
                            <td>{row.avgOverdue}</td>
                            <td>{row.avgConformance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
