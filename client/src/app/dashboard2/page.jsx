"use client";

import { Table2 } from "lucide-react";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { getChartsData, getFilter } from "@/queries";
import {
  setStartDate,
  setProcess,
  setEndDate,
  setDepartment,
  setPerson,
  selectStartDate,
  selectProcess,
  selectEndDate,
  selectDepartment,
  selectPerson,
} from "@/Redux/filterSlice";

const formatNumberToTwoDecimals = (num) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const startDate = useSelector(selectStartDate);
  const process = useSelector(selectProcess);
  const endDate = useSelector(selectEndDate);
  const department = useSelector(selectDepartment);
  const person = useSelector(selectPerson);

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
  const dashboardTable = chartsData?.dashboardTable || [];

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-[#F7F7F7]">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 mt-8 md:gap-8 lg:col-span-2">
              <h1 className="flex items-center text-4xl font-extralight">
                <Table2 className="w-8 h-8 font-light mr-2" /> Performance Table
                Data
              </h1>
              <div className="border-2 border-[#6e8672] rounded-xl p-8">
                <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
                  <table className="table w-full">
                    <thead className="sticky top-0 bg-[#6e8672] text-white">
                      <tr>
                        <th>Event Name</th>
                        <th>Benchmark Time</th>
                        <th>Average Actual</th>
                        <th>Process ID</th>
                        <th>Conformance Rate</th>
                        <th>Total Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardTable.length > 0 ? (
                        dashboardTable.map((row, index) => (
                          <tr key={index} className="hover">
                            <td>{row.eventName}</td>
                            <td>{row.benchmarkTime}</td>
                            <td>
                              {formatNumberToTwoDecimals(row.average_actual)}
                            </td>
                            <td>{row.ProcessId}</td>
                            <td>
                              {formatNumberToTwoDecimals(row.conformance_rate)}%
                            </td>
                            <td>{row.total_case}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-hidden p-6 bg-white rounded-lg shadow">
                <div className="items-center gap-5">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Person</span>
                    </div>
                    <select
                      className="select select-bordered"
                      value={person}
                      onChange={(e) => dispatch(setPerson(e.target.value))}
                      defaultValue={"Pick one"}
                    >
                      <option value="" disabled>
                        Select option
                      </option>
                      {resultPerson.map((el, idx) => (
                        <option key={idx} value={el}>
                          {el}
                        </option>
                      ))}
                      {/* Map through your options here */}
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Process</span>
                    </div>
                    <select
                      className="select select-bordered"
                      value={process}
                      onChange={(e) => dispatch(setProcess(e.target.value))}
                      defaultValue={"Pick one"}
                    >
                      <option value="" disabled>
                        Select option
                      </option>
                      {resultProcesses.map((el, idx) => (
                        <option key={idx} value={el}>
                          {el}
                        </option>
                      ))}
                      {/* Map through your options here */}
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Department</span>
                    </div>
                    <select
                      className="select select-bordered"
                      value={department}
                      onChange={(e) => dispatch(setDepartment(e.target.value))}
                      defaultValue={"Pick one"}
                    >
                      <option value="" disabled>
                        Select option
                      </option>
                      {resultDepartments.map((el, idx) => (
                        <option key={idx} value={el}>
                          {el}
                        </option>
                      ))}
                      {/* Map through your options here */}
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Start Date</span>
                    </div>
                    <input
                      type="date"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      value={startDate}
                      onChange={(e) => dispatch(setStartDate(e.target.value))}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">End Date</span>
                    </div>
                    <input
                      type="date"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      value={endDate}
                      onChange={(e) => dispatch(setEndDate(e.target.value))}
                    />
                  </label>
                </div>
                <div className="flex w-full mt-4">
                  <p className="text-xs font-light text-gray-500">
                    Filter on what you desire
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
