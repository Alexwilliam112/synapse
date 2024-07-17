"use client";
import React, { useEffect, useState } from "react";
import LineGraph from "../../components/temppresent/LineGraph";
import AreaChart from "../../components/temppresent/AreaChart";
import DonutGraph from "../../components/temppresent/DonutGraph";
import BarChart from "../../components/BarChart";
import RadarChart from "@/components/RadarChart";

import { Clock2, TriangleAlert, LayoutList } from "lucide-react";
import { useQuery } from "@apollo/client";
import { getChartsData, getFilter } from "@/queries";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setProcess,
  setEndDate,
  setDepartment,
  setPerson,
} from "@/Redux/filterSlice";
import Link from "next/link";

const formatNumberToTwoDecimals = (num) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { startDate, process, endDate, department, person } = useSelector(
    (state) => state.filters
  );

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

  const resultPerson = data?.GetFilters?.data?.persons || [];
  const resultProcesses = data?.GetFilters?.data?.processes || [];
  const resultDepartments = data?.GetFilters?.data?.departments || [];

  const chartsData = dataCharts?.GetDashboardCharts?.data || {};

  const averageConformanceByProcess_lineChart =
    chartsData?.averageConformanceByProcess_lineChart || [];
  const averageConformance_areaChart =
    chartsData?.averageConformance_areaChart || [];
  const overallConformance_pieChart =
    chartsData?.overallConformance_pieChart || { ontime: 0, nonConform: 0 };
  const topTenTable = chartsData?.topTenTable || [];
  const caseByProcess = chartsData?.caseByProcess || [];
  const conformanceByTask = chartsData?.conformanceByTask || [];

  const [formState, setFormState] = useState({
    startDate,
    process,
    endDate,
    department,
    person,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setStartDate(formState.startDate));
    dispatch(setProcess(formState.process));
    dispatch(setEndDate(formState.endDate));
    dispatch(setDepartment(formState.department));
    dispatch(setPerson(formState.person));
  };

  if (loading || loadingCharts)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex gap-2 items-center">
          <span className="loading loading-ball loading-lg"></span>
          <p className="font-mono">Building Data..</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>
          <img
            src="/catconfuse.gif"
            alt="errorcatnyan"
            className="h-24 object-cover"
          />
          <p className="font-mono">
            Error fetching filters: {error.message}
          </p>
        </div>
      </div>
    );

  if (errorCharts)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>
          <img
            src="/catconfuse.gif"
            alt="errorcatnyan"
            className="h-24 object-cover"
          />
          <p className="font-mono">
            Error fetching charts: {errorCharts.message}
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F7F7F7]">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md w-auto">
              <h2 className="text-2xl font-light mb-6">Filter</h2>
              <form className="gap-5 items-center" onSubmit={handleSubmit}>
                <div className="flex gap-5 items-center">
                  <div>
                    <label
                      htmlFor="department"
                      className="form-control w-auto max-w-xs md:w-auto lg:w-40"
                    >
                      <div className="label">
                        <span className="label-text">Department</span>
                      </div>
                      <select
                        id="department"
                        name="department"
                        value={formState.department}
                        onChange={handleChange}
                        className="select select-bordered"
                      >
                        <option value="" >
                          Select All
                        </option>
                        {resultDepartments.map((el, idx) => (
                          <option key={idx} value={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="person"
                      className="form-control w-auto max-w-xs lg:w-40"
                    >
                      <div className="label">
                        <span className="label-text">Person</span>
                      </div>
                      <select
                        id="person"
                        name="person"
                        value={formState.person}
                        onChange={handleChange}
                        className="select select-bordered"
                      >
                        <option value="">
                          Select All
                        </option>
                        {resultPerson.map((el, idx) => (
                          <option key={idx} value={el}>
                            {el}
                          </option>
                        ))}
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
                        value={formState.process}
                        onChange={handleChange}
                        className="select select-bordered"
                      >
                        <option value="">
                          Select All
                        </option>
                        {resultProcesses.map((el, idx) => (
                          <option key={idx} value={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="startDate"
                      className="form-control w-full max-w-xs lg:w-40"
                    >
                      <div className="label">
                        <span className="label-text">Start Date</span>
                      </div>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formState.startDate}
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="form-control w-full max-w-xs lg:w-40"
                    >
                      <div className="label">
                        <span className="label-text">End Date</span>
                      </div>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formState.endDate}
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full flex justify-end pt-4">
                  <button type="submit" className="btn bg-[#6E8672] text-white hover:bg-[#47594A] px-20">
                    Apply
                  </button>
                </div>
              </form>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div className="sm:col-span-2 p-6 bg-[#FFFFFF] rounded-lg shadow-md">
                <div className="pb-2">
                  <p className="text-sm text-gray-600">Conformance by Process</p>
                </div>
                <BarChart data={caseByProcess} />
              </div>
              <div className="p-6 bg-white rounded-lg shadow sm:col-span-2">
                <div className="pb-2">
                  <p className="text-sm text-gray-600">Average Conformance Rate</p>
                </div>
                <AreaChart data={averageConformance_areaChart} />
              </div>
            </div>
            <div>
              <div className="p-6 bg-white rounded-lg shadow">
                <div className="px-7">
                  <h2 className="font-semibold">Average Conformance per Process</h2>
                  <p className="text-sm text-gray-600">Recapitulate every process on this graph.</p>
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
            <div className="sm:col-span-2 p-6 bg-[#F1F2F2] border-2 border-[#6E8672] rounded-lg shadow lg:mb-7">
              <div className="pb-6 flex justify-between">
                <div>
                  <h2 className="font-">Nganu Technology & Consultant</h2>
                  <p className="text-sm font-light">Good Day, Rayhan Wijaya.</p>
                  <p className="text-sm font-light">Lets take a look at your company performance!</p>
                </div>
                <div>
                  <Link href={"/diagram"}>
                    <button className="btn bg-[#6E8672] text-white hover:bg-[#47594A]">
                      Diagram
                    </button>
                  </Link>
                </div>
              </div>
              <div className="w-auto flex items-center h-auto space-x-8">
                <div className="w-48 sm:w-32 h-auto">
                  <DonutGraph data={overallConformance_pieChart} />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-light text-sm flex items-center">
                      <Clock2 className="w-4 h-4 text-[#6E8672] font-light mr-1" /> Ontime Process
                    </p>
                    <p className="text-5xl">{formatNumberToTwoDecimals(overallConformance_pieChart?.ontime)}%</p>
                  </div>
                  <div>
                    <p className="font-light text-sm flex items-center">
                      <TriangleAlert className="w-4 h-4 text-[#8DB093] font-light mr-1" />
                      Non-Conformance
                    </p>
                    <p className="text-5xl">{formatNumberToTwoDecimals(overallConformance_pieChart?.nonConform)}%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden p-6 bg-white rounded-lg shadow">
              <div className="pb-2">
                <p className="text-sm text-gray-600">Conformance by Task</p>
              </div>
              <RadarChart data={conformanceByTask} />
              <div className="">
                <h1 className="flex items-center">
                  <LayoutList className="w-4 h-4 font-light mr-2" /> Top 10 Non Conform
                </h1>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
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
                          <td>{formatNumberToTwoDecimals(row.avgOverdue)}</td>
                          <td>{formatNumberToTwoDecimals(row.avgConformance)}</td>
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
  );
};

export default Dashboard;
